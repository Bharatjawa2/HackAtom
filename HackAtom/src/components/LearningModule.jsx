import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Heart, 
  Shield, 
  Lightbulb,
  Atom,
  FlaskConical,
  Target,
  Brain,
  BookOpen,
  Users,
  Settings,
  AlertTriangle
} from 'lucide-react';

const LearningModule = ({ section, onBack }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const content = {
    general: {
      EN: {
        title: "Nuclear Energy for Everyone",
        subtitle: "Understanding the basics of nuclear energy in simple terms",
        steps: [
          {
            title: "What is Nuclear Energy?",
            content: "Nuclear energy is the energy released during nuclear reactions, either through fission (splitting atoms) or fusion (combining atoms).",
            animation: "atom-split",
            icon: Atom
          },
          {
            title: "How Nuclear Power Works",
            content: "Nuclear power plants use controlled nuclear fission to heat water, creating steam that spins turbines to generate electricity.",
            animation: "reactor-core",
            icon: Zap
          },
          {
            title: "Safety and Radiation",
            content: "Nuclear power plants have multiple safety systems and radiation is naturally present in our environment. Nuclear energy produces no greenhouse gases.",
            animation: "safety-shield",
            icon: Shield
          },
          {
            title: "Everyday Applications",
            content: "Nuclear technology is used in medicine (X-rays, cancer treatment), food preservation, and space exploration.",
            animation: "medical-app",
            icon: Heart
          }
        ]
      },
      RU: {
        title: "Ядерная энергия для всех",
        subtitle: "Понимание основ ядерной энергии простыми словами",
        steps: [
          {
            title: "Что такое ядерная энергия?",
            content: "Ядерная энергия - это энергия, выделяемая во время ядерных реакций, либо через деление (расщепление атомов), либо через синтез (объединение атомов).",
            animation: "atom-split",
            icon: Atom
          },
          {
            title: "Как работает ядерная энергия",
            content: "Атомные электростанции используют контролируемое ядерное деление для нагрева воды, создавая пар, который вращает турбины для выработки электроэнергии.",
            animation: "reactor-core",
            icon: Zap
          },
          {
            title: "Безопасность и радиация",
            content: "Атомные электростанции имеют множественные системы безопасности, и радиация естественно присутствует в нашей среде. Ядерная энергия не производит парниковых газов.",
            animation: "safety-shield",
            icon: Shield
          },
          {
            title: "Повседневные применения",
            content: "Ядерные технологии используются в медицине (рентген, лечение рака), консервировании продуктов и космических исследованиях.",
            animation: "medical-app",
            icon: Heart
          }
        ]
      }
    },
    medical: {
      EN: {
        title: "Nuclear Medicine",
        subtitle: "Advanced applications in medical diagnosis and treatment",
        steps: [
          {
            title: "Medical Imaging",
            content: "Nuclear medicine uses radioactive tracers to create detailed images of internal organs and diagnose diseases like cancer and heart conditions.",
            animation: "medical-scan",
            icon: Target
          },
          {
            title: "Radiation Therapy",
            content: "Precise radiation beams target cancer cells while minimizing damage to healthy tissue, using advanced imaging and computer guidance.",
            animation: "radiation-beam",
            icon: Zap
          },
          {
            title: "Nuclear Diagnostics",
            content: "PET scans, bone scans, and other nuclear imaging techniques provide crucial information for accurate diagnosis and treatment planning.",
            animation: "diagnostic-scan",
            icon: Brain
          },
          {
            title: "Future of Nuclear Medicine",
            content: "Emerging technologies include targeted alpha therapy, theranostics, and advanced imaging for personalized medicine approaches.",
            animation: "future-med",
            icon: Lightbulb
          }
        ]
      },
      RU: {
        title: "Ядерная медицина",
        subtitle: "Передовые применения в медицинской диагностике и лечении",
        steps: [
          {
            title: "Медицинская визуализация",
            content: "Ядерная медицина использует радиоактивные индикаторы для создания детальных изображений внутренних органов и диагностики заболеваний, таких как рак и болезни сердца.",
            animation: "medical-scan",
            icon: Target
          },
          {
            title: "Радиационная терапия",
            content: "Точные радиационные лучи нацелены на раковые клетки, сводя к минимуму повреждение здоровой ткани, используя передовую визуализацию и компьютерное руководство.",
            animation: "radiation-beam",
            icon: Zap
          },
          {
            title: "Ядерная диагностика",
            content: "ПЭТ-сканирование, сканирование костей и другие ядерные методы визуализации предоставляют важную информацию для точной диагностики и планирования лечения.",
            animation: "diagnostic-scan",
            icon: Brain
          },
          {
            title: "Будущее ядерной медицины",
            content: "Новые технологии включают таргетную альфа-терапию, тераностику и передовую визуализацию для персонализированных медицинских подходов.",
            animation: "future-med",
            icon: Lightbulb
          }
        ]
      }
    },
    engineering: {
      EN: {
        title: "Nuclear Engineering",
        subtitle: "Advanced concepts in reactor design and nuclear physics",
        steps: [
          {
            title: "Reactor Design Principles",
            content: "Nuclear reactors are designed with multiple safety systems, including control rods, coolant systems, and containment structures.",
            animation: "reactor-design",
            icon: Settings
          },
          {
            title: "Nuclear Physics",
            content: "Understanding neutron interactions, fission cross-sections, and nuclear binding energy is crucial for reactor operation and safety.",
            animation: "physics-model",
            icon: Atom
          },
          {
            title: "Advanced Reactor Types",
            content: "Next-generation reactors include molten salt reactors, fast breeder reactors, and fusion reactors for improved efficiency and safety.",
            animation: "advanced-reactor",
            icon: FlaskConical
          },
          {
            title: "Nuclear Safety Engineering",
            content: "Safety systems include passive cooling, multiple barriers, and advanced monitoring systems to prevent and mitigate accidents.",
            animation: "safety-systems",
            icon: Shield
          }
        ]
      },
      RU: {
        title: "Ядерная инженерия",
        subtitle: "Передовые концепции в проектировании реакторов и ядерной физике",
        steps: [
          {
            title: "Принципы проектирования реакторов",
            content: "Ядерные реакторы проектируются с множественными системами безопасности, включая управляющие стержни, системы охлаждения и защитные конструкции.",
            animation: "reactor-design",
            icon: Settings
          },
          {
            title: "Ядерная физика",
            content: "Понимание нейтронных взаимодействий, сечений деления и ядерной энергии связи имеет решающее значение для работы и безопасности реактора.",
            animation: "physics-model",
            icon: Atom
          },
          {
            title: "Передовые типы реакторов",
            content: "Реакторы следующего поколения включают реакторы с расплавленной солью, быстрые бридерные реакторы и термоядерные реакторы для улучшенной эффективности и безопасности.",
            animation: "advanced-reactor",
            icon: FlaskConical
          },
          {
            title: "Инженерия ядерной безопасности",
            content: "Системы безопасности включают пассивное охлаждение, множественные барьеры и передовые системы мониторинга для предотвращения и смягчения аварий.",
            animation: "safety-systems",
            icon: Shield
          }
        ]
      }
    }
  };

  const currentContent = content[section][language];

  const AnimationComponent = ({ type }) => {
    switch (type) {
      case 'atom-split':
        return (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full"></div>
            <div className="absolute inset-8 bg-red-500 rounded-full animate-ping"></div>
          </div>
        );
      case 'reactor-core':
        return (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-yellow-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-8 bg-red-500 rounded-full"></div>
          </div>
        );
      case 'safety-shield':
        return (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-blue-500 rounded-full"></div>
            <div className="absolute inset-8 bg-white rounded-full animate-ping"></div>
          </div>
        );
      default:
        return (
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        );
    }
  };

  const handleNext = () => {
    if (currentStep < currentContent.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    setShowAnimation(!showAnimation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{currentContent.title}</h1>
            <p className="text-gray-600">{currentContent.subtitle}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {currentContent.steps.length}</span>
            <span>{Math.round(((currentStep + 1) / currentContent.steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / currentContent.steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Animation Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <div className="flex justify-center mb-4">
                <AnimationComponent type={currentContent.steps[currentStep].animation} />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={toggleAnimation}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => setShowAnimation(false)}
                  className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              {React.createElement(currentContent.steps[currentStep].icon, {
                className: "w-8 h-8 text-blue-600 mr-3"
              })}
              <h2 className="text-2xl font-bold text-gray-800">
                {currentContent.steps[currentStep].title}
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {currentContent.steps[currentStep].content}
            </p>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === currentContent.steps.length - 1}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Elements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Neutron', 'Proton', 'Electron', 'Nucleus'].map((particle, index) => (
              <div
                key={particle}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => alert(`Learn more about ${particle}`)}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">{particle[0]}</div>
                  <div className="text-sm">{particle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule; 