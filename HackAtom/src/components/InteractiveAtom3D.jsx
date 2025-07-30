import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Info, X, Play, Pause, RotateCcw } from 'lucide-react';

const InteractiveAtom3D = () => {
  const { language } = useLanguage();
  const [isRotating, setIsRotating] = useState(true);
  const [selectedParticle, setSelectedParticle] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const particleInfo = {
    EN: {
      neutron: {
        name: "Neutron",
        charge: "Neutral (0)",
        mass: "1.675 × 10⁻²⁷ kg",
        location: "Nucleus",
        function: "Stabilizes the nucleus and participates in nuclear reactions",
        facts: [
          "No electric charge",
          "Helps prevent protons from repelling each other",
          "Essential for nuclear fission and fusion",
          "Can be used as a probe in neutron scattering experiments"
        ]
      },
      proton: {
        name: "Proton",
        charge: "Positive (+1)",
        mass: "1.673 × 10⁻²⁷ kg",
        location: "Nucleus",
        function: "Determines the element's identity and atomic number",
        facts: [
          "Positively charged particle",
          "Number of protons defines the element",
          "Participates in nuclear reactions",
          "Has a half-life of over 10³⁴ years"
        ]
      },
      electron: {
        name: "Electron",
        charge: "Negative (-1)",
        mass: "9.109 × 10⁻³¹ kg",
        location: "Electron cloud",
        function: "Determines chemical properties and bonding",
        facts: [
          "Negatively charged particle",
          "Orbits the nucleus in energy levels",
          "Participates in chemical reactions",
          "Can be shared between atoms (covalent bonding)"
        ]
      },
      nucleus: {
        name: "Nucleus",
        charge: "Positive (varies)",
        mass: "Most of atom's mass",
        location: "Center of atom",
        function: "Contains protons and neutrons, site of nuclear reactions",
        facts: [
          "Contains 99.9% of atom's mass",
          "Site of nuclear fission and fusion",
          "Held together by strong nuclear force",
          "Can be unstable (radioactive decay)"
        ]
      }
    },
    RU: {
      neutron: {
        name: "Нейтрон",
        charge: "Нейтральный (0)",
        mass: "1,675 × 10⁻²⁷ кг",
        location: "Ядро",
        function: "Стабилизирует ядро и участвует в ядерных реакциях",
        facts: [
          "Не имеет электрического заряда",
          "Помогает предотвратить отталкивание протонов",
          "Необходим для ядерного деления и синтеза",
          "Может использоваться как зонд в экспериментах по рассеянию нейтронов"
        ]
      },
      proton: {
        name: "Протон",
        charge: "Положительный (+1)",
        mass: "1,673 × 10⁻²⁷ кг",
        location: "Ядро",
        function: "Определяет идентичность элемента и атомный номер",
        facts: [
          "Положительно заряженная частица",
          "Количество протонов определяет элемент",
          "Участвует в ядерных реакциях",
          "Имеет период полураспада более 10³⁴ лет"
        ]
      },
      electron: {
        name: "Электрон",
        charge: "Отрицательный (-1)",
        mass: "9,109 × 10⁻³¹ кг",
        location: "Электронное облако",
        function: "Определяет химические свойства и связи",
        facts: [
          "Отрицательно заряженная частица",
          "Вращается вокруг ядра на энергетических уровнях",
          "Участвует в химических реакциях",
          "Может быть разделен между атомами (ковалентная связь)"
        ]
      },
      nucleus: {
        name: "Ядро",
        charge: "Положительный (варьируется)",
        mass: "Большая часть массы атома",
        location: "Центр атома",
        function: "Содержит протоны и нейтроны, место ядерных реакций",
        facts: [
          "Содержит 99,9% массы атома",
          "Место ядерного деления и синтеза",
          "Удерживается вместе сильным ядерным взаимодействием",
          "Может быть нестабильным (радиоактивный распад)"
        ]
      }
    }
  };

  const Particle = ({ type, position, color, onClick, isRotating }) => {
    const rotationClass = isRotating ? 'animate-spin' : '';
    
    return (
      <div
        className={`absolute w-12 h-12 rounded-full ${color} flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-125 hover:shadow-lg ${rotationClass}`}
        style={position}
        onClick={() => onClick(type)}
      >
        <span className="text-white font-bold text-sm">{type === 'nucleus' ? 'N' : type[0].toUpperCase()}</span>
      </div>
    );
  };

  const InfoModal = ({ particle, onClose }) => {
    const info = particleInfo[language][particle];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{info.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-600">Charge:</span>
                <p className="text-gray-800">{info.charge}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Mass:</span>
                <p className="text-gray-800">{info.mass}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Location:</span>
                <p className="text-gray-800">{info.location}</p>
              </div>
            </div>
            
            <div>
              <span className="font-semibold text-gray-600">Function:</span>
              <p className="text-gray-800 mt-1">{info.function}</p>
            </div>
            
            <div>
              <span className="font-semibold text-gray-600">Key Facts:</span>
              <ul className="list-disc list-inside text-gray-800 mt-2 space-y-1">
                {info.facts.map((fact, index) => (
                  <li key={index} className="text-sm">{fact}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const handleParticleClick = (particle) => {
    setSelectedParticle(particle);
    setShowInfo(true);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const resetAtom = () => {
    setIsRotating(true);
    setSelectedParticle(null);
    setShowInfo(false);
  };

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <button
          onClick={toggleRotation}
          className="bg-white bg-opacity-90 p-2 rounded-lg shadow-lg hover:bg-opacity-100 transition-all"
          title={isRotating ? "Pause rotation" : "Start rotation"}
        >
          {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={resetAtom}
          className="bg-white bg-opacity-90 p-2 rounded-lg shadow-lg hover:bg-opacity-100 transition-all"
          title="Reset atom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Atom Model */}
      <div className="relative w-64 h-64 mx-auto">
        {/* Nucleus */}
        <Particle
          type="nucleus"
          position={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          color="bg-red-500"
          onClick={handleParticleClick}
          isRotating={false}
        />
        
        {/* Neutrons */}
        <Particle
          type="neutron"
          position={{ top: '25%', left: '25%' }}
          color="bg-blue-500"
          onClick={handleParticleClick}
          isRotating={isRotating}
        />
        <Particle
          type="neutron"
          position={{ top: '25%', right: '25%' }}
          color="bg-blue-500"
          onClick={handleParticleClick}
          isRotating={isRotating}
        />
        
        {/* Protons */}
        <Particle
          type="proton"
          position={{ bottom: '25%', left: '25%' }}
          color="bg-red-600"
          onClick={handleParticleClick}
          isRotating={isRotating}
        />
        <Particle
          type="proton"
          position={{ bottom: '25%', right: '25%' }}
          color="bg-red-600"
          onClick={handleParticleClick}
          isRotating={isRotating}
        />
        
        {/* Electrons (orbiting) */}
        <div className={`absolute inset-0 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
          <Particle
            type="electron"
            position={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}
            color="bg-green-500"
            onClick={handleParticleClick}
            isRotating={false}
          />
        </div>
        
        <div className={`absolute inset-0 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
          <Particle
            type="electron"
            position={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
            color="bg-green-500"
            onClick={handleParticleClick}
            isRotating={false}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Click on any particle to learn more about it!
        </p>
      </div>

      {/* Info Modal */}
      {showInfo && selectedParticle && (
        <InfoModal
          particle={selectedParticle}
          onClose={() => setShowInfo(false)}
        />
      )}
    </div>
  );
};

export default InteractiveAtom3D; 