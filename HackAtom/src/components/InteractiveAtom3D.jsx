import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Sparkles,
  Star,
  Heart,
  Zap
} from 'lucide-react';

const InteractiveAtom3D = () => {
  const { language } = useLanguage();
  const [isRotating, setIsRotating] = useState(true);
  const [selectedParticle, setSelectedParticle] = useState(null);
  const [showSparkles, setShowSparkles] = useState(false);

  const particleInfo = {
    neutron: {
      EN: {
        name: "Neutron",
        emoji: "🤝",
        color: "from-blue-400 to-blue-600",
        description: "I'm a neutron! I have no electric charge, which makes me very friendly and helps me keep the nucleus stable.",
        funFacts: [
          "I'm like a peacemaker in the atom!",
          "I help prevent protons from fighting each other",
          "I'm found in the nucleus with protons",
          "I'm about the same size as a proton"
        ],
        personality: "I'm very friendly and love helping others!"
      },
      RU: {
        name: "Нейтрон",
        emoji: "🤝",
        color: "from-blue-400 to-blue-600",
        description: "Я нейтрон! У меня нет электрического заряда, что делает меня очень дружелюбным и помогает мне держать ядро стабильным.",
        funFacts: [
          "Я как миротворец в атоме!",
          "Я помогаю предотвратить драки между протонами",
          "Я нахожусь в ядре с протонами",
          "Я примерно такого же размера, как протон"
        ],
        personality: "Я очень дружелюбный и люблю помогать другим!"
      }
    },
    proton: {
      EN: {
        name: "Proton",
        emoji: "👑",
        color: "from-red-400 to-red-600",
        description: "I'm a proton! I have a positive electric charge and I'm like the leader of the atom family.",
        funFacts: [
          "I'm like the king of the nucleus!",
          "I have a positive electric charge",
          "I help determine what element the atom is",
          "I'm found in the nucleus"
        ],
        personality: "I'm confident and love being in charge!"
      },
      RU: {
        name: "Протон",
        emoji: "👑",
        color: "from-red-400 to-red-600",
        description: "Я протон! У меня положительный электрический заряд, и я как лидер атомной семьи.",
        funFacts: [
          "Я как король ядра!",
          "У меня положительный электрический заряд",
          "Я помогаю определить, какой это элемент",
          "Я нахожусь в ядре"
        ],
        personality: "Я уверен в себе и люблю быть главным!"
      }
    },
    electron: {
      EN: {
        name: "Electron",
        emoji: "💃",
        color: "from-green-400 to-green-600",
        description: "I'm an electron! I have a negative electric charge and I dance around the nucleus in special orbits.",
        funFacts: [
          "I'm like a tiny dancer!",
          "I have a negative electric charge",
          "I orbit around the nucleus",
          "I'm much smaller than protons and neutrons"
        ],
        personality: "I'm energetic and love to dance around!"
      },
      RU: {
        name: "Электрон",
        emoji: "💃",
        color: "from-green-400 to-green-600",
        description: "Я электрон! У меня отрицательный электрический заряд, и я танцую вокруг ядра по специальным орбитам.",
        funFacts: [
          "Я как крошечный танцор!",
          "У меня отрицательный электрический заряд",
          "Я вращаюсь вокруг ядра",
          "Я намного меньше протонов и нейтронов"
        ],
        personality: "Я энергичный и люблю танцевать вокруг!"
      }
    },
    nucleus: {
      EN: {
        name: "Nucleus",
        emoji: "❤️",
        color: "from-purple-400 to-purple-600",
        description: "I'm the nucleus! I'm like the heart of the atom where all the protons and neutrons live together.",
        funFacts: [
          "I'm like the heart of the atom!",
          "I contain protons and neutrons",
          "I'm very small but very important",
          "I'm where nuclear reactions happen"
        ],
        personality: "I'm the center of attention and love being important!"
      },
      RU: {
        name: "Ядро",
        emoji: "❤️",
        color: "from-purple-400 to-purple-600",
        description: "Я ядро! Я как сердце атома, где все протоны и нейтроны живут вместе.",
        funFacts: [
          "Я как сердце атома!",
          "Я содержаю протоны и нейтроны",
          "Я очень маленький, но очень важный",
          "Я где происходят ядерные реакции"
        ],
        personality: "Я центр внимания и люблю быть важным!"
      }
    }
  };

  const Particle = ({ type, position, onClick, onMouseEnter, onMouseLeave }) => {
    const info = particleInfo[type][language];
    return (
      <div
        className={`absolute w-16 h-16 bg-gradient-to-br ${info.color} rounded-full cursor-pointer flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-white`}
        style={position}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {info.emoji}
      </div>
    );
  };

  const InfoModal = ({ particle, onClose }) => {
    const info = particleInfo[particle][language];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center text-white text-xl mr-4`}>
                {info.emoji}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{info.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">My Job</h3>
              <p className="text-gray-700 leading-relaxed">{info.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fun Facts About Me</h3>
              <ul className="space-y-2">
                {info.funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center mb-2">
                <Heart className="w-5 h-5 text-pink-500 mr-2" />
                <span className="font-semibold text-gray-800">My Personality</span>
              </div>
              <p className="text-gray-700">{info.personality}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  };

  const handleParticleClick = (particle) => {
    setSelectedParticle(particle);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
  };

  const handleParticleHover = () => {
    setShowSparkles(true);
  };

  const handleParticleLeave = () => {
    setShowSparkles(false);
  };

  return (
    <div className="relative">
      {/* Sparkles effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: Math.random() * 320,
                top: Math.random() * 320,
                animationDelay: `${Math.random() * 1}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Atom Model</h3>
          <p className="text-gray-600">Click on any particle to learn more!</p>
        </div>

        {/* Atom Model */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Nucleus */}
          <Particle
            type="nucleus"
            position={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleParticleClick('nucleus')}
            onMouseEnter={handleParticleHover}
            onMouseLeave={handleParticleLeave}
          />

          {/* Protons */}
          <Particle
            type="proton"
            position={{
              top: '30%',
              left: '30%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleParticleClick('proton')}
            onMouseEnter={handleParticleHover}
            onMouseLeave={handleParticleLeave}
          />
          <Particle
            type="proton"
            position={{
              top: '70%',
              left: '70%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleParticleClick('proton')}
            onMouseEnter={handleParticleHover}
            onMouseLeave={handleParticleLeave}
          />

          {/* Neutrons */}
          <Particle
            type="neutron"
            position={{
              top: '30%',
              left: '70%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleParticleClick('neutron')}
            onMouseEnter={handleParticleHover}
            onMouseLeave={handleParticleLeave}
          />
          <Particle
            type="neutron"
            position={{
              top: '70%',
              left: '30%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleParticleClick('neutron')}
            onMouseEnter={handleParticleHover}
            onMouseLeave={handleParticleLeave}
          />

          {/* Electrons */}
          <div className={`absolute inset-0 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }}>
            <Particle
              type="electron"
              position={{
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleParticleClick('electron')}
              onMouseEnter={handleParticleHover}
              onMouseLeave={handleParticleLeave}
            />
            <Particle
              type="electron"
              position={{
                top: '50%',
                left: '90%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleParticleClick('electron')}
              onMouseEnter={handleParticleHover}
              onMouseLeave={handleParticleLeave}
            />
            <Particle
              type="electron"
              position={{
                top: '90%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleParticleClick('electron')}
              onMouseEnter={handleParticleHover}
              onMouseLeave={handleParticleLeave}
            />
            <Particle
              type="electron"
              position={{
                top: '50%',
                left: '10%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleParticleClick('electron')}
              onMouseEnter={handleParticleHover}
              onMouseLeave={handleParticleLeave}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isRotating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRotating ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => setIsRotating(true)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            💡 Click on any particle to learn about its role in the atom!
          </p>
        </div>
      </div>

      {/* Info Modal */}
      {selectedParticle && (
        <InfoModal
          particle={selectedParticle}
          onClose={() => setSelectedParticle(null)}
        />
      )}
    </div>
  );
};

export default InteractiveAtom3D; 