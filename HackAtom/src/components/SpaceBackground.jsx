import React from 'react';

const SpaceBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Subtle space background overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(26, 26, 46, 0.1) 50%, rgba(15, 52, 96, 0.2) 100%)',
        }}
      />
      
      {/* Floating stars effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: '#4488ff',
              borderRadius: '50%',
              opacity: Math.random() * 0.5 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default SpaceBackground; 