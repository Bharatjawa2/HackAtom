import React, { useState, useEffect, useRef } from 'react';

const AtomicBackground = ({ isVisible = true }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Canvas animation for desktop
  useEffect(() => {
    if (!isLoaded || isMobile || !isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const electrons = [];
    const nucleusParticles = [];

    // Create nucleus particles (protons and neutrons)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 30 + Math.random() * 20;
      nucleusParticles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 8 + Math.random() * 4,
        color: i < 4 ? '#ff4444' : '#888888', // Protons red, neutrons gray
        type: i < 4 ? 'proton' : 'neutron'
      });
    }

    // Create electrons
    const electronShells = [
      { radius: 80, count: 2, speed: 0.02, color: '#4488ff' },
      { radius: 160, count: 8, speed: 0.015, color: '#44aaff' },
      { radius: 240, count: 6, speed: 0.01, color: '#44ccff' },
      { radius: 320, count: 4, speed: 0.008, color: '#44eeff' }
    ];

    electronShells.forEach((shell, shellIndex) => {
      for (let i = 0; i < shell.count; i++) {
        const angle = (i / shell.count) * Math.PI * 2;
        electrons.push({
          x: Math.cos(angle) * shell.radius,
          y: Math.sin(angle) * shell.radius * 0.3,
          angle: angle,
          radius: shell.radius,
          speed: shell.speed,
          color: shell.color,
          size: 4 + shellIndex * 1,
          shellIndex: shellIndex
        });
      }
    });

    // Create background particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(26, 26, 46, 0.8)');
      gradient.addColorStop(0.5, 'rgba(22, 33, 62, 0.6)');
      gradient.addColorStop(1, 'rgba(15, 52, 96, 0.4)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nucleus glow
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const nucleusGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 100
      );
      nucleusGlow.addColorStop(0, 'rgba(255, 68, 68, 0.3)');
      nucleusGlow.addColorStop(1, 'rgba(255, 68, 68, 0)');
      ctx.fillStyle = nucleusGlow;
      ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);
      ctx.restore();

      // Update and draw nucleus particles
      nucleusParticles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off nucleus boundary
        const distance = Math.sqrt(particle.x * particle.x + particle.y * particle.y);
        if (distance > 50) {
          const angle = Math.atan2(particle.y, particle.x);
          particle.x = Math.cos(angle) * 50;
          particle.y = Math.sin(angle) * 50;
          particle.vx *= -0.8;
          particle.vy *= -0.8;
        }

        // Draw particle
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const particleGlow = ctx.createRadialGradient(
          canvas.width / 2 + particle.x, canvas.height / 2 + particle.y, 0,
          canvas.width / 2 + particle.x, canvas.height / 2 + particle.y, particle.size * 2
        );
        particleGlow.addColorStop(0, particle.color + '80');
        particleGlow.addColorStop(1, particle.color + '00');
        ctx.fillStyle = particleGlow;
        ctx.fillRect(
          canvas.width / 2 + particle.x - particle.size * 2,
          canvas.height / 2 + particle.y - particle.size * 2,
          particle.size * 4,
          particle.size * 4
        );
        ctx.restore();

        // Draw particle core
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2 + particle.x,
          canvas.height / 2 + particle.y,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Update and draw electrons
      electrons.forEach(electron => {
        electron.angle += electron.speed;
        electron.x = Math.cos(electron.angle) * electron.radius;
        electron.y = Math.sin(electron.angle) * electron.radius * 0.3;
        electron.z = Math.sin(electron.angle * 2) * 10;

        // Draw electron trail
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = electron.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 50; i++) {
          const trailAngle = electron.angle - (i * 0.1);
          const trailX = Math.cos(trailAngle) * electron.radius;
          const trailY = Math.sin(trailAngle) * electron.radius * 0.3;
          if (i === 0) {
            ctx.moveTo(canvas.width / 2 + trailX, canvas.height / 2 + trailY);
          } else {
            ctx.lineTo(canvas.width / 2 + trailX, canvas.height / 2 + trailY);
          }
        }
        ctx.stroke();
        ctx.restore();

        // Draw electron glow
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const electronGlow = ctx.createRadialGradient(
          canvas.width / 2 + electron.x, canvas.height / 2 + electron.y, 0,
          canvas.width / 2 + electron.x, canvas.height / 2 + electron.y, electron.size * 3
        );
        electronGlow.addColorStop(0, electron.color + '60');
        electronGlow.addColorStop(1, electron.color + '00');
        ctx.fillStyle = electronGlow;
        ctx.fillRect(
          canvas.width / 2 + electron.x - electron.size * 3,
          canvas.height / 2 + electron.y - electron.size * 3,
          electron.size * 6,
          electron.size * 6
        );
        ctx.restore();

        // Draw electron
        ctx.fillStyle = electron.color;
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2 + electron.x,
          canvas.height / 2 + electron.y,
          electron.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Update and draw background particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#4488ff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw orbital rings
      electronShells.forEach((shell, index) => {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = shell.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 100; i++) {
          const angle = (i / 100) * Math.PI * 2;
          const x = Math.cos(angle) * shell.radius;
          const y = Math.sin(angle) * shell.radius * 0.3;
          if (i === 0) {
            ctx.moveTo(canvas.width / 2 + x, canvas.height / 2 + y);
          } else {
            ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 + y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLoaded, isMobile, isVisible]);

  // Mobile fallback
  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          opacity: isVisible ? 0.3 : 0
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Static nucleus */}
            <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse opacity-60"></div>
            
            {/* Static electron orbits */}
            {[1, 2, 3].map((orbit, index) => (
              <div
                key={orbit}
                className="absolute border border-blue-400 border-opacity-30 rounded-full animate-spin"
                style={{
                  width: `${(orbit * 2 + 1) * 2}rem`,
                  height: `${(orbit * 2 + 1) * 1.5}rem`,
                  top: `${-((orbit * 2 + 1) * 0.75)}rem`,
                  left: `${-((orbit * 2 + 1))}rem`,
                  animationDuration: `${3 + index}s`,
                  animationDelay: `${index * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default AtomicBackground; 