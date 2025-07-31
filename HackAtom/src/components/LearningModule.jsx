import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Star,
  Award,
  BookOpen,
  Brain,
  FlaskConical,
  Target,
  Zap,
  Heart,
  Shield,
  Lightbulb,
  Users,
  Building2,
  Stethoscope,
  Calculator,
  FileText,
  TrendingUp,
  BarChart3,
  Activity,
  Globe,
  Bookmark,
  Download,
  Share2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Keyboard,
  MousePointer
} from 'lucide-react';

const LearningModule = ({ section, onBack, language }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [isQuizCorrect, setIsQuizCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState(false);
  const [stepProgress, setStepProgress] = useState(new Set());
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);

  const text = {
    EN: {
      back: "Back to Home",
      next: "Next",
      previous: "Previous",
      complete: "Complete Module",
      step: "Step",
      of: "of",
      progress: "Progress",
      quiz: "Take Quiz",
      quizTitle: "Module Quiz",
      nextQuestion: "Next Question",
      finishQuiz: "Finish Quiz",
      yourScore: "Your Score",
      tryAgain: "Try Again",
      backToModule: "Back to Module",
      correct: "Correct!",
      incorrect: "Incorrect!",
      explanation: "Explanation",
      continue: "Continue",
      moduleComplete: "Module Complete!",
      badgeEarned: "Badge Earned!",
      downloadCertificate: "Download Certificate",
      shareProgress: "Share Progress",
      accessibility: "Accessibility",
      highContrast: "High Contrast",
      keyboardMode: "Keyboard Mode",
      audioToggle: "Toggle Audio",
      fullscreen: "Fullscreen",
      closeModal: "Close modal",
      stepCompleted: "Step completed!",
      greatJob: "Great job!",
      tryAgain: "Try again.",
      stepMilestone: "Step milestone reached!",
      perfectScore: "Perfect score!",
      moduleBadge: "Module Badge",
      certificateReady: "Certificate ready for download",
      shareSuccess: "Progress shared successfully"
    },
    RU: {
      back: "Вернуться домой",
      next: "Далее",
      previous: "Назад",
      complete: "Завершить модуль",
      step: "Шаг",
      of: "из",
      progress: "Прогресс",
      quiz: "Пройти тест",
      quizTitle: "Тест модуля",
      nextQuestion: "Следующий вопрос",
      finishQuiz: "Завершить тест",
      yourScore: "Ваш результат",
      tryAgain: "Попробовать снова",
      backToModule: "Вернуться к модулю",
      correct: "Правильно!",
      incorrect: "Неправильно!",
      explanation: "Объяснение",
      continue: "Продолжить",
      moduleComplete: "Модуль завершен!",
      badgeEarned: "Значок получен!",
      downloadCertificate: "Скачать сертификат",
      shareProgress: "Поделиться прогрессом",
      accessibility: "Доступность",
      highContrast: "Высокий контраст",
      keyboardMode: "Режим клавиатуры",
      audioToggle: "Переключить аудио",
      fullscreen: "Полноэкранный режим",
      closeModal: "Закрыть модальное окно",
      stepCompleted: "Шаг завершен!",
      greatJob: "Отличная работа!",
      tryAgain: "Попробуйте снова.",
      stepMilestone: "Достигнута веха шага!",
      perfectScore: "Идеальный результат!",
      moduleBadge: "Значок модуля",
      certificateReady: "Сертификат готов к скачиванию",
      shareSuccess: "Прогресс успешно поделен"
    }
  };

  // Enhanced content with step-by-step learning
  const moduleContent = {
    general: {
      title: "Nuclear Energy Basics",
      subtitle: "Little Scientists Adventure",
      icon: "🧠",
      color: "#FF8F00",
      steps: [
        {
          id: 1,
          title: "Introduction to Atoms",
          subtitle: "What are atoms made of?",
          emoji: "🔬",
          content: "Atoms are the building blocks of everything around us. They're incredibly small - you'd need millions of them to see one with your eyes!",
          animation: "fadeIn",
          quiz: {
            question: "What are atoms made of?",
            options: ["Protons, neutrons, and electrons", "Only protons", "Only electrons", "Only neutrons"],
            correct: 0,
            explanation: "Atoms are made of three main particles: protons (positive), neutrons (neutral), and electrons (negative)."
          }
        },
        {
          id: 2,
          title: "Understanding Nuclear Energy",
          subtitle: "How does nuclear power work?",
          emoji: "⚛️",
          content: "Nuclear energy comes from splitting atoms in a process called fission. This releases a huge amount of energy that we can use to make electricity!",
          animation: "slideIn",
          quiz: {
            question: "What process creates nuclear energy?",
            options: ["Fusion", "Fission", "Combustion", "Evaporation"],
            correct: 1,
            explanation: "Nuclear fission is the process of splitting atoms to release energy. This is how nuclear power plants work."
          }
        },
        {
          id: 3,
          title: "Nuclear Safety",
          subtitle: "How do we stay safe?",
          emoji: "💡",
          content: "Nuclear power plants have many safety systems to protect people and the environment. They're designed to be very safe!",
          animation: "bounceIn",
          quiz: {
            question: "What protects people from radiation in nuclear plants?",
            options: ["Thick concrete walls", "Nothing", "Only air", "Only water"],
            correct: 0,
            explanation: "Nuclear power plants use thick concrete walls and other barriers to protect people from radiation."
          }
        },
        {
          id: 4,
          title: "Nuclear Energy Benefits",
          subtitle: "Why is nuclear energy important?",
          emoji: "🧠",
          content: "Nuclear energy is clean, reliable, and produces no greenhouse gases. It helps fight climate change and provides electricity for millions of people!",
          animation: "zoomIn",
          quiz: {
            question: "What is a major benefit of nuclear energy?",
            options: ["Produces greenhouse gases", "No greenhouse gases", "Uses lots of water", "Creates pollution"],
            correct: 1,
            explanation: "Nuclear energy produces no greenhouse gases, making it a clean energy source that helps fight climate change."
          }
        }
      ]
    },
    medical: {
      title: "Nuclear Medicine",
      subtitle: "Healthcare Applications",
      icon: "🏥",
      color: "#43A047",
      steps: [
        {
          id: 1,
          title: "Medical Imaging",
          subtitle: "How do we see inside the body?",
          emoji: "📷",
          content: "Nuclear medicine uses radioactive materials to create images of the inside of your body. This helps doctors diagnose diseases!",
          animation: "fadeIn",
          quiz: {
            question: "What does nuclear medicine help doctors do?",
            options: ["Cook food", "Diagnose diseases", "Build houses", "Drive cars"],
            correct: 1,
            explanation: "Nuclear medicine helps doctors diagnose diseases by creating images of the inside of the body."
          }
        },
        {
          id: 2,
          title: "Cancer Treatment",
          subtitle: "Fighting cancer with radiation",
          emoji: "💉",
          content: "Radiation therapy uses high-energy radiation to kill cancer cells. It's a very important treatment for many types of cancer.",
          animation: "slideIn",
          quiz: {
            question: "What does radiation therapy treat?",
            options: ["Colds", "Cancer", "Broken bones", "Headaches"],
            correct: 1,
            explanation: "Radiation therapy is used to treat cancer by killing cancer cells with high-energy radiation."
          }
        },
        {
          id: 3,
          title: "Nuclear Safety in Medicine",
          subtitle: "Keeping patients safe",
          emoji: "🛡️",
          content: "Medical professionals follow strict safety protocols to protect patients and themselves from radiation exposure.",
          animation: "bounceIn",
          quiz: {
            question: "How do medical professionals stay safe with radiation?",
            options: ["They don't", "Follow safety protocols", "Ignore safety rules", "Use no protection"],
            correct: 1,
            explanation: "Medical professionals follow strict safety protocols to protect themselves and patients from radiation exposure."
          }
        },
        {
          id: 4,
          title: "Future of Nuclear Medicine",
          subtitle: "New treatments and technologies",
          emoji: "🔬",
          content: "Scientists are developing new nuclear medicine treatments that are more precise and have fewer side effects.",
          animation: "zoomIn",
          quiz: {
            question: "What are scientists developing in nuclear medicine?",
            options: ["New treatments", "Better cars", "New foods", "New clothes"],
            correct: 0,
            explanation: "Scientists are developing new nuclear medicine treatments that are more precise and have fewer side effects."
          }
        }
      ]
    },
    engineering: {
      title: "Nuclear Engineering",
      subtitle: "Advanced Nuclear Technology",
      icon: "⚙️",
      color: "#1976D2",
      steps: [
        {
          id: 1,
          title: "Reactor Design",
          subtitle: "How nuclear reactors work",
          emoji: "🏗️",
          content: "Nuclear reactors are carefully designed machines that control nuclear reactions to produce electricity safely and efficiently.",
          animation: "fadeIn",
          quiz: {
            question: "What do nuclear reactors produce?",
            options: ["Food", "Electricity", "Cars", "Clothes"],
            correct: 1,
            explanation: "Nuclear reactors produce electricity by controlling nuclear reactions to generate heat, which turns turbines."
          }
        },
        {
          id: 2,
          title: "Safety Systems",
          subtitle: "Multiple layers of protection",
          emoji: "🛡️",
          content: "Nuclear power plants have multiple safety systems that work together to prevent accidents and protect the environment.",
          animation: "slideIn",
          quiz: {
            question: "How many safety systems do nuclear plants have?",
            options: ["None", "One", "Multiple", "Infinite"],
            correct: 2,
            explanation: "Nuclear power plants have multiple safety systems that work together to prevent accidents."
          }
        },
        {
          id: 3,
          title: "Nuclear Waste Management",
          subtitle: "Handling radioactive waste",
          emoji: "🗑️",
          content: "Nuclear engineers develop safe ways to store and dispose of radioactive waste to protect people and the environment.",
          animation: "bounceIn",
          quiz: {
            question: "What do nuclear engineers do with radioactive waste?",
            options: ["Throw it away", "Store it safely", "Eat it", "Ignore it"],
            correct: 1,
            explanation: "Nuclear engineers develop safe ways to store and dispose of radioactive waste to protect people and the environment."
          }
        },
        {
          id: 4,
          title: "Future Reactors",
          subtitle: "Next-generation nuclear technology",
          emoji: "🚀",
          content: "Engineers are designing new types of nuclear reactors that are even safer, more efficient, and produce less waste.",
          animation: "zoomIn",
          quiz: {
            question: "What are engineers designing for the future?",
            options: ["New reactors", "New cars", "New phones", "New clothes"],
            correct: 0,
            explanation: "Engineers are designing new types of nuclear reactors that are safer, more efficient, and produce less waste."
          }
        }
      ]
    }
  };

  const currentModule = moduleContent[section];
  const currentStepData = currentModule?.steps[currentStep];

  useEffect(() => {
    // Load quiz questions for the current step
    if (currentStepData?.quiz) {
      setQuizQuestions([currentStepData.quiz]);
    }
  }, [currentStep, currentStepData]);

  useEffect(() => {
    // Check for step completion milestones
    if (stepProgress.size > 0 && stepProgress.size % 2 === 0) {
      // Milestone reached - show celebration
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [stepProgress]);

  const handleStepComplete = () => {
    setStepProgress(prev => new Set([...prev, currentStep]));
    
    // Check if module is complete
    if (currentStep === currentModule.steps.length - 1) {
      setModuleCompleted(true);
      setBadgeEarned(true);
    }
  };

  const handleNextStep = () => {
    if (currentStep < currentModule.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuizAnswer = (selectedOption) => {
    setSelectedQuizAnswer(selectedOption);
    const currentQ = quizQuestions[currentQuizQuestion];
    const isAnswerCorrect = selectedOption === currentQ.correct;
    setIsQuizCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setQuizScore(quizScore + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuizQuestion = () => {
    setSelectedQuizAnswer(null);
    setIsQuizCorrect(null);
    setShowExplanation(false);
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setShowQuizResults(true);
      if (quizScore + (selectedQuizAnswer === quizQuestions[currentQuizQuestion].correct ? 1 : 0) === quizQuestions.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setSelectedQuizAnswer(null);
    setIsQuizCorrect(null);
    setShowQuizResults(false);
    setShowExplanation(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleKeyboardMode = () => {
    setKeyboardMode(!keyboardMode);
  };

  const downloadCertificate = () => {
    // Placeholder for certificate download
    alert(text[language].certificateReady);
  };

  const shareProgress = () => {
    // Placeholder for sharing functionality
    alert(text[language].shareSuccess);
  };

  const progressPercentage = (stepProgress.size / currentModule.steps.length) * 100;

  // Confetti Component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 6)]
          }`}></div>
        </div>
      ))}
    </div>
  );

  if (showQuiz) {
    return (
      <div className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
        {showConfetti && <Confetti />}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-[currentModule.color]">
            {!showQuizResults ? (
              <>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🧪</div>
                  <h1 className="text-4xl font-bold text-[#333333] mb-4">{text[language].quizTitle}</h1>
                  <div className="text-xl text-gray-600 mb-4">
                    Question {currentQuizQuestion + 1} of {quizQuestions.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div 
                      className="bg-gradient-to-r from-[#1976D2] to-[#43A047] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#333333] mb-6">
                    {quizQuestions[currentQuizQuestion]?.question}
                  </h2>
                  
                  <div className="space-y-4">
                    {quizQuestions[currentQuizQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={selectedQuizAnswer !== null}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1976D2] ${
                          selectedQuizAnswer === index
                            ? isQuizCorrect
                              ? 'border-[#43A047] bg-green-50 text-green-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-white hover:border-[#1976D2] hover:bg-blue-50'
                        }`}
                        aria-label={`Option ${index + 1}: ${option}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                            selectedQuizAnswer === index
                              ? isQuizCorrect
                                ? 'border-[#43A047] bg-[#43A047]'
                                : 'border-red-500 bg-red-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedQuizAnswer === index && (
                              isQuizCorrect ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                              ) : (
                                <XCircle className="w-4 h-4 text-white" />
                              )
                            )}
                          </div>
                          <span className="text-lg font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showExplanation && (
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                        isQuizCorrect ? 'bg-[#43A047]' : 'bg-red-500'
                      }`}>
                        {isQuizCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#333333]">
                        {isQuizCorrect ? text[language].correct : text[language].incorrect}
                      </h3>
                    </div>
                    <p className="text-gray-700 ml-9">
                      {quizQuestions[currentQuizQuestion]?.explanation}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-8 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-2xl hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-red-300"
                    aria-label={text[language].backToModule}
                  >
                    🏠 {text[language].backToModule}
                  </button>
                  {showExplanation && (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-8 py-3 bg-gradient-to-r from-[#43A047] to-[#388E3C] text-white rounded-2xl hover:from-[#388E3C] hover:to-[#2E7D32] transform hover:scale-105 transition-all duration-300 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#43A047]"
                      aria-label={currentQuizQuestion === quizQuestions.length - 1 ? text[language].finishQuiz : text[language].nextQuestion}
                    >
                      {currentQuizQuestion === quizQuestions.length - 1 ? '🏁 ' + text[language].finishQuiz : '➡️ ' + text[language].nextQuestion}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-5xl font-bold text-[#333333] mb-4">{text[language].yourScore}</h2>
                <div className="text-6xl font-bold text-[#43A047] mb-6">
                  {quizScore} / {quizQuestions.length}
                </div>
                <div className="text-2xl mb-8">
                  {quizScore === quizQuestions.length ? '🎉 Perfect! You are a nuclear energy expert!' :
                   quizScore >= Math.ceil(quizQuestions.length / 2) ? '🌟 Great job! You know a lot about nuclear energy!' :
                   '😊 Good try! Keep learning about nuclear energy!'}
                </div>
                <div className="space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-4 bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white rounded-2xl hover:from-[#1565C0] hover:to-[#0D47A1] transform hover:scale-105 transition-all duration-300 font-bold text-xl focus:outline-none focus:ring-4 focus:ring-[#1976D2]"
                    aria-label={text[language].tryAgain}
                  >
                    🔄 {text[language].tryAgain}
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-8 py-4 bg-gradient-to-r from-[#FF8F00] to-[#F57C00] text-white rounded-2xl hover:from-[#F57C00] hover:to-[#EF6C00] transform hover:scale-105 transition-all duration-300 font-bold text-xl focus:outline-none focus:ring-4 focus:ring-[#FF8F00]"
                    aria-label={text[language].backToModule}
                  >
                    🏠 {text[language].backToModule}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-[#333333] mb-4">Module not found</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#1976D2] text-white rounded-lg hover:bg-[#1565C0] transition-colors focus:outline-none focus:ring-4 focus:ring-[#1976D2]"
          >
            {text[language].back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''} ${highContrast ? 'contrast-200' : ''}`}>
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[currentModule.color] to-[currentModule.color] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].back}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {text[language].back}
              </button>
              <div>
                <h1 className="text-3xl font-bold">{currentModule.title}</h1>
                <p className="text-lg opacity-90">{currentModule.subtitle}</p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAudio}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].audioToggle}
              >
                {isAudioPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].fullscreen}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleHighContrast}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].highContrast}
              >
                {highContrast ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleKeyboardMode}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].keyboardMode}
              >
                {keyboardMode ? <MousePointer className="w-5 h-5" /> : <Keyboard className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#333333]">
              {text[language].step} {currentStep + 1} {text[language].of} {currentModule.steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#1976D2] to-[#43A047] h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            {currentModule.steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-[currentModule.color] text-white'
                    : stepProgress.has(index)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-500'
                }`}
              >
                <div className="text-lg">{step.emoji}</div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs opacity-75">{step.subtitle}</div>
                </div>
                {stepProgress.has(index) && (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Animation Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{currentStepData.emoji}</div>
                <h3 className="text-2xl font-bold text-[#333333] mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 mb-4">{currentStepData.subtitle}</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[currentModule.color] to-[currentModule.color] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <div className="text-4xl">{currentStepData.emoji}</div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {currentStepData.content}
                </p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">{currentStepData.emoji}</div>
              <h2 className="text-2xl font-bold text-[#333333]">
                {currentStepData.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Key Points:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#43A047] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Learn about {currentStepData.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#43A047] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Understand the basic concepts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#43A047] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete the step quiz</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-[#333333] mb-2">💡 Did you know?</h4>
                <p className="text-gray-700 text-sm">
                  {currentStepData.content}
                </p>
              </div>

              {/* Step Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
                  aria-label={text[language].previous}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {text[language].previous}
                </button>

                <div className="flex items-center space-x-2">
                  {stepProgress.has(currentStep) && (
                    <div className="flex items-center text-[#43A047]">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">{text[language].stepCompleted}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={currentStep === currentModule.steps.length - 1 ? () => setShowQuiz(true) : handleNextStep}
                  className="flex items-center px-6 py-2 bg-[currentModule.color] text-white rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-4 focus:ring-[currentModule.color] focus:ring-opacity-50"
                  aria-label={currentStep === currentModule.steps.length - 1 ? text[language].quiz : text[language].next}
                >
                  {currentStep === currentModule.steps.length - 1 ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      {text[language].quiz}
                    </>
                  ) : (
                    <>
                      {text[language].next}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Module Completion */}
        {moduleCompleted && (
          <div className="mt-8 bg-gradient-to-r from-[#43A047] to-[#388E3C] rounded-3xl p-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">{text[language].moduleComplete}</h2>
            <p className="text-xl mb-6 opacity-90">Congratulations! You've completed the {currentModule.title} module.</p>
            
            {badgeEarned && (
              <div className="mb-6">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-bold mb-2">{text[language].badgeEarned}</h3>
                <p className="opacity-90">{currentModule.title} Expert Badge</p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={downloadCertificate}
                className="flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].downloadCertificate}
              >
                <Download className="w-4 h-4 mr-2" />
                {text[language].downloadCertificate}
              </button>
              <button
                onClick={shareProgress}
                className="flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label={text[language].shareProgress}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {text[language].shareProgress}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModule; 