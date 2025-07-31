import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Atom, Brain, Stethoscope, Cog, Sparkles, Zap, Target, Rocket } from "lucide-react";

export default function ThreeCircles() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);
  
  const circles = [
    { 
      name: "Personal", 
      color: "#10B981",
      hoverColor: "#059669",
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      description: "Explore nuclear science for personal knowledge and understanding",
      icon: Brain,
      features: ["Interactive Learning", "Safety Guidelines", "Daily Applications"],
      particles: 8
    },
    { 
      name: "Medical", 
      color: "#3B82F6",
      hoverColor: "#2563EB",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      description: "Advanced medical applications and nuclear medicine",
      icon: Stethoscope,
      features: ["Treatment Protocols", "Case Studies", "Cost Analysis"],
      particles: 12
    },
    { 
      name: "Engineer", 
      color: "#F59E0B",
      hoverColor: "#D97706",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      description: "Professional tools for nuclear engineering",
      icon: Cog,
      features: ["Economic Simulator", "Regulatory Guide", "Feasibility Matrix"],
      particles: 16
    },
  ];

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1,
          color: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'][Math.floor(Math.random() * 5)]
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const handleCircleClick = (circleName) => {
    setSelected(circleName);
    // Navigate to appropriate section based on circle
    switch(circleName) {
      case "Personal":
        navigate('/?section=personal');
        break;
      case "Medical":
        navigate('/?section=medical');
        break;
      case "Engineer":
        navigate('/?section=engineering');
        break;
      default:
        navigate('/');
    }
  };

  const handleBackClick = () => {
    setSelected(null);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-20"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen p-8">
        <AnimatePresence>
          {selected === null ? (
            // Show all circles
            <motion.div 
              className="flex flex-col md:flex-row gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              {circles.map((circle, index) => {
                const IconComponent = circle.icon;
                return (
                  <motion.div
                    key={circle.name}
                    onClick={() => handleCircleClick(circle.name)}
                    onMouseEnter={() => setHovered(circle.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { delay: index * 0.2 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Outer Glow */}
                    <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-r ${circle.gradient}`}></div>
                    
                    {/* Main Circle */}
                    <div className={`relative w-64 h-64 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-3xl border-4 border-white/20 backdrop-blur-sm bg-gradient-to-br ${circle.gradient}`}>
                      {/* Floating Icons */}
                      <div className="absolute inset-0">
                        {Array.from({ length: circle.particles }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/60 rounded-full"
                            style={{
                              left: `${20 + (i * 60) % 80}%`,
                              top: `${20 + (i * 40) % 80}%`,
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2 + i * 0.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>

                      {/* Icon */}
                      <motion.div 
                        className="text-6xl mb-4"
                        animate={{ rotate: hovered === circle.name ? 360 : 0 }}
                        transition={{ duration: 1 }}
                      >
                        <IconComponent className="w-16 h-16" />
                      </motion.div>
                      
                      {/* Title */}
                      <div className="text-2xl font-bold mb-3 text-center">
                        {circle.name}
                      </div>
                      
                      {/* Description */}
                      <div className="text-sm text-center opacity-90 px-6 leading-relaxed">
                        {circle.description}
                      </div>

                      {/* Features */}
                      <div className="mt-4 space-y-1">
                        {circle.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center text-xs opacity-80"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 0.8, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                          >
                            <Sparkles className="w-3 h-3 mr-2" />
                            {feature}
                          </motion.div>
                        ))}
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/30"
                        animate={{
                          scale: hovered === circle.name ? 1.1 : 1,
                          opacity: hovered === circle.name ? 0.5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Click Indicator */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium"
                      animate={{ opacity: hovered === circle.name ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Click to explore
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // Show selected circle with enhanced details
            <motion.div
              className="flex flex-col items-center space-y-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {circles
                .filter((c) => c.name === selected)
                .map((circle) => {
                  const IconComponent = circle.icon;
                  return (
                    <motion.div
                      key={circle.name}
                      className="flex flex-col items-center p-12 rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-sm max-w-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${circle.color}, ${circle.hoverColor})`,
                        boxShadow: `0 25px 50px -12px ${circle.color}40`
                      }}
                      initial={{ width: 0, height: 0, opacity: 0 }}
                      animate={{ width: "auto", height: "auto", opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {/* Animated Icon */}
                      <motion.div 
                        className="text-8xl mb-6"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <IconComponent className="w-20 h-20" />
                      </motion.div>
                      
                      <h2 className="text-4xl font-bold text-white mb-6 text-center">
                        {circle.name} Module
                      </h2>
                      
                      <p className="text-white text-lg text-center mb-8 leading-relaxed max-w-lg">
                        {circle.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
                        {circle.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                          >
                            <Target className="w-6 h-6 mx-auto mb-2 text-white" />
                            <div className="text-white text-sm font-medium">{feature}</div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="text-white text-center opacity-90">
                        <Rocket className="w-6 h-6 mx-auto mb-2 animate-bounce" />
                        Ready to explore {circle.name.toLowerCase()} modules and resources
                      </div>
                    </motion.div>
                  );
                })}
              
              <motion.button
                onClick={handleBackClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5 inline mr-2" />
                ← Back to Selection
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
