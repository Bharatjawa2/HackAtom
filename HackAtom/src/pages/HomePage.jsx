import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LearningModule from '../components/LearningModule';
import InteractiveAtom3D from '../components/InteractiveAtom3D';
import quizData from '../data/quizQuestions.json';
import { 
  Atom, 
  Heart, 
  Zap, 
  BookOpen, 
  Brain, 
  FlaskConical, 
  Target,
  Play,
  Trophy,
  Users,
  Shield,
  Lightbulb,
  User,
  LogIn,
  Star,
  Sparkles,
  Music,
  Volume2,
  VolumeX,
  Smile,
  Rocket,
  Sun,
  Moon,
  Cloud,
  Rainbow,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  XCircle,
  Radiation,
  TestTube,
  Microscope,
  Cog,
  Gauge,
  AlertTriangle,
  Award,
  BookMarked,
  GraduationCap,
  BarChart3,
  Activity,
  TrendingUp,
  Building2,
  Stethoscope,
  Calculator,
  FileText,
  Download,
  Bookmark,
  Mail,
  MessageCircle,
  Youtube,
  Linkedin,
  Users2,
  Globe,
  Target as TargetIcon,
  Zap as ZapIcon,
  Heart as HeartIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { language, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [floatingStars, setFloatingStars] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [cardAnimations, setCardAnimations] = useState({
    card1: false,
    card2: false,
    card3: false
  });
  const [theme, setTheme] = useState('light');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userProgress, setUserProgress] = useState({
    modulesCompleted: 2,
    totalModules: 6,
    badgesEarned: 3,
    totalBadges: 8,
    quizScores: [85, 92, 78]
  });

  // Load quiz questions from JSON file
  useEffect(() => {
    const loadQuizQuestions = () => {
      try {
        // Randomly select 5 questions from the imported data
        const shuffled = quizData.questions.sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, 5));
      } catch (error) {
        console.error('Error loading quiz questions:', error);
        // Fallback to default questions
        setQuizQuestions([
          {
            id: 1,
            [language]: {
              question: "What is the main component of nuclear fuel?",
              options: ["Uranium-235", "Carbon", "Iron", "Oxygen"],
              correct: 0,
              explanation: "Uranium-235 is the primary fissile isotope used in nuclear reactors."
            }
          }
        ]);
      }
    };
    loadQuizQuestions();
  }, [language]);

  // Create floating stars effect
  useEffect(() => {
    const stars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1
    }));
    setFloatingStars(stars);
  }, []);

  // Trigger card animations on mount
  useEffect(() => {
    const timer1 = setTimeout(() => setCardAnimations(prev => ({ ...prev, card1: true })), 200);
    const timer2 = setTimeout(() => setCardAnimations(prev => ({ ...prev, card2: true })), 400);
    const timer3 = setTimeout(() => setCardAnimations(prev => ({ ...prev, card3: true })), 600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const text = {
    EN: {
      // Site branding
      siteName: "Isotope Nexus",
      tagline: "Exploring Nuclear Science Together",
      
      // Role-based sections
      generalPublicTitle: "Explore Nuclear Wonders",
      generalPublicSubtitle: "Discover the fascinating world of nuclear science",
      generalPublicDescription: "Learn about isotopes in daily life, radiation safety, and nuclear energy basics through interactive modules and quizzes.",
      
      medicalProfessionalsTitle: "Isotopes in Healthcare",
      medicalProfessionalsSubtitle: "Advanced medical applications of nuclear technology",
      medicalProfessionalsDescription: "Explore treatment protocols, cost-benefit analysis, and case studies in nuclear medicine and radiation therapy.",
      
      nuclearEngineersTitle: "Advanced Nuclear Toolkit",
      nuclearEngineersSubtitle: "Professional tools and resources for nuclear engineering",
      nuclearEngineersDescription: "Access economic simulators, feasibility matrices, regulatory guides, and advanced nuclear engineering resources.",
      
      // Interactive elements
      exploreModule: "Explore Module",
      takeQuiz: "Take Quiz",
      viewProgress: "View Progress",
      downloadCertificate: "Download Certificate",
      myBadges: "My Badges",
      bookmarks: "Bookmarks",
      
      // SDG Dashboard
      sdgTitle: "Sustainable Development Goals",
      sdgHealth: "SDG 3: Good Health & Well-being",
      sdgInnovation: "SDG 9: Industry, Innovation & Infrastructure",
      sdgHealthDesc: "Nuclear medicine contributes to better healthcare outcomes",
      sdgInnovationDesc: "Nuclear energy supports sustainable infrastructure development",
      
      // Accessibility
      themeToggle: "Toggle theme",
      languageToggle: "Toggle language",
      skipToContent: "Skip to main content",
      closeModal: "Close modal",
      
      // Progress tracking
      progressTitle: "Your Progress",
      modulesCompleted: "Modules Completed",
      badgesEarned: "Badges Earned",
      averageScore: "Average Score",
      
      // Quiz
      quizTitle: "Nuclear Science Quiz",
      nextQuestion: "Next Question",
      finishQuiz: "Finish Quiz",
      yourScore: "Your Score",
      tryAgain: "Try Again",
      backToHome: "Back to Home",
      correct: "Correct!",
      incorrect: "Incorrect!",
      explanation: "Explanation",
      continue: "Continue",
      
      // Footer
      newsletter: "Stay updated with nuclear science news",
      newsletterPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      aboutNuclearSafety: "About Nuclear Safety",
      contactUs: "Contact Us",
      followUs: "Follow Us",
      feedback: "Send Feedback"
    },
    RU: {
      // Site branding
      siteName: "Изотопный Нексус",
      tagline: "Изучаем ядерную науку вместе",
      
      // Role-based sections
      generalPublicTitle: "Исследуйте ядерные чудеса",
      generalPublicSubtitle: "Откройте увлекательный мир ядерной науки",
      generalPublicDescription: "Изучите изотопы в повседневной жизни, безопасность радиации и основы ядерной энергии через интерактивные модули и тесты.",
      
      medicalProfessionalsTitle: "Изотопы в здравоохранении",
      medicalProfessionalsSubtitle: "Продвинутые медицинские применения ядерных технологий",
      medicalProfessionalsDescription: "Изучите протоколы лечения, анализ затрат и выгод, а также клинические случаи в ядерной медицине и лучевой терапии.",
      
      nuclearEngineersTitle: "Продвинутый ядерный инструментарий",
      nuclearEngineersSubtitle: "Профессиональные инструменты и ресурсы для ядерной инженерии",
      nuclearEngineersDescription: "Получите доступ к экономическим симуляторам, матрицам осуществимости, руководствам по регулированию и продвинутым ресурсам ядерной инженерии.",
      
      // Interactive elements
      exploreModule: "Исследовать модуль",
      takeQuiz: "Пройти тест",
      viewProgress: "Посмотреть прогресс",
      downloadCertificate: "Скачать сертификат",
      myBadges: "Мои значки",
      bookmarks: "Закладки",
      
      // SDG Dashboard
      sdgTitle: "Цели устойчивого развития",
      sdgHealth: "ЦУР 3: Хорошее здоровье и благополучие",
      sdgInnovation: "ЦУР 9: Промышленность, инновации и инфраструктура",
      sdgHealthDesc: "Ядерная медицина способствует улучшению результатов здравоохранения",
      sdgInnovationDesc: "Ядерная энергия поддерживает устойчивое развитие инфраструктуры",
      
      // Accessibility
      themeToggle: "Переключить тему",
      languageToggle: "Переключить язык",
      skipToContent: "Перейти к основному содержанию",
      closeModal: "Закрыть модальное окно",
      
      // Progress tracking
      progressTitle: "Ваш прогресс",
      modulesCompleted: "Завершенные модули",
      badgesEarned: "Полученные значки",
      averageScore: "Средний балл",
      
      // Quiz
      quizTitle: "Тест по ядерной науке",
      nextQuestion: "Следующий вопрос",
      finishQuiz: "Завершить тест",
      yourScore: "Ваш результат",
      tryAgain: "Попробовать снова",
      backToHome: "Вернуться домой",
      correct: "Правильно!",
      incorrect: "Неправильно!",
      explanation: "Объяснение",
      continue: "Продолжить",
      
      // Footer
      newsletter: "Будьте в курсе новостей ядерной науки",
      newsletterPlaceholder: "Введите ваш email",
      subscribe: "Подписаться",
      aboutNuclearSafety: "О ядерной безопасности",
      contactUs: "Связаться с нами",
      followUs: "Следите за нами",
      feedback: "Отправить отзыв"
    },
  };

  const handleQuizAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const currentQ = quizQuestions[currentQuestion];
    const isAnswerCorrect = selectedOption === currentQ[language].correct;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      if (score + (selectedAnswer === quizQuestions[currentQuestion][language].correct ? 1 : 0) === quizQuestions.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResults(false);
    setShowExplanation(false);
    // Reload questions for new random selection
    const shuffled = quizData.questions.sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 5));
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const FloatingStars = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {floatingStars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            animationDuration: `${star.speed}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          <div className="w-full h-full bg-yellow-300 rounded-full opacity-60"></div>
        </div>
      ))}
    </div>
  );

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

  const AtomParticles = () => (
    <div className="relative w-32 h-32">
      {/* Nucleus */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
      
      {/* Electrons */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Neutrons */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
    </div>
  );

  // Enhanced card data with unique capstone project styling
  const cardData = [
    {
      id: 'general',
      icon: BarChart3,
      title: text[language].generalPublicTitle,
      subtitle: text[language].generalPublicSubtitle,
      description: text[language].generalPublicDescription,
      bgColor: 'from-emerald-400 via-teal-500 to-cyan-500',
      borderColor: 'border-emerald-400',
      hoverColor: 'hover:from-emerald-500 hover:via-teal-600 hover:to-cyan-600',
      animation: cardAnimations.card1,
      ariaLabel: `${text[language].generalPublicTitle} - ${text[language].generalPublicDescription}`,
      section: 'general',
      emoji: '🧠',
      features: ['Interactive Learning Modules', 'Radiation Safety Quiz', 'Daily Life Applications'],
      particles: 6,
      accentColor: 'emerald'
    },
    {
      id: 'medical',
      icon: Stethoscope,
      title: text[language].medicalProfessionalsTitle,
      subtitle: text[language].medicalProfessionalsSubtitle,
      description: text[language].medicalProfessionalsDescription,
      bgColor: 'from-blue-400 via-indigo-500 to-purple-500',
      borderColor: 'border-blue-400',
      hoverColor: 'hover:from-blue-500 hover:via-indigo-600 hover:to-purple-600',
      animation: cardAnimations.card2,
      ariaLabel: `${text[language].medicalProfessionalsTitle} - ${text[language].medicalProfessionalsDescription}`,
      section: 'medical',
      emoji: '🏥',
      features: ['Treatment Protocols', 'Cost-Benefit Analysis', 'Clinical Case Studies'],
      particles: 8,
      accentColor: 'blue'
    },
    {
      id: 'engineering',
      icon: Cog,
      title: text[language].nuclearEngineersTitle,
      subtitle: text[language].nuclearEngineersSubtitle,
      description: text[language].nuclearEngineersDescription,
      bgColor: 'from-amber-400 via-orange-500 to-red-500',
      borderColor: 'border-amber-400',
      hoverColor: 'hover:from-amber-500 hover:via-orange-600 hover:to-red-600',
      animation: cardAnimations.card3,
      ariaLabel: `${text[language].nuclearEngineersTitle} - ${text[language].nuclearEngineersDescription}`,
      section: 'engineering',
      emoji: '⚙️',
      features: ['Economic Simulator', 'Regulatory Framework', 'Feasibility Matrix'],
      particles: 10,
      accentColor: 'amber'
    }
  ];

  // SDG Dashboard Component
  const SDGDashboard = () => (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 mb-8">
      <h3 className="text-2xl font-bold text-[#333333] mb-6 flex items-center">
        <Globe className="w-6 h-6 mr-2 text-[#1976D2]" />
        {text[language].sdgTitle}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* SDG 3 - Health */}
        <div className="bg-gradient-to-br from-[#43A047] to-[#388E3C] rounded-2xl p-6 text-white">
          <div className="flex items-center mb-4">
            <HeartIcon className="w-8 h-8 mr-3" />
            <h4 className="text-lg font-bold">{text[language].sdgHealth}</h4>
          </div>
          <div className="mb-4">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm opacity-90 mt-2">{text[language].sdgHealthDesc}</p>
          </div>
        </div>
        
        {/* SDG 9 - Innovation */}
        <div className="bg-gradient-to-br from-[#1976D2] to-[#1565C0] rounded-2xl p-6 text-white">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 mr-3" />
            <h4 className="text-lg font-bold">{text[language].sdgInnovation}</h4>
          </div>
          <div className="mb-4">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm opacity-90 mt-2">{text[language].sdgInnovationDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // User Profile Component
  const UserProfile = () => (
    <div className="relative">
      <button
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center space-x-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 hover:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#1976D2] focus:ring-opacity-50"
        aria-label="User profile menu"
      >
        <div className="w-8 h-8 bg-[#1976D2] text-white rounded-full flex items-center justify-center text-sm font-medium">
          {user ? user.name.charAt(0).toUpperCase() : 'G'}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-[#333333]">
            {user ? user.name : text[language].guest}
          </div>
          <div className="text-xs text-gray-500">
            {userProgress.modulesCompleted}/{userProgress.totalModules} modules
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {showProfileDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 z-50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#1976D2] text-white rounded-full flex items-center justify-center text-lg font-medium mr-4">
              {user ? user.name.charAt(0).toUpperCase() : 'G'}
            </div>
            <div>
              <h3 className="font-bold text-[#333333]">
                {user ? user.name : text[language].guest}
              </h3>
              <p className="text-sm text-gray-500">
                {userProgress.badgesEarned} badges earned
              </p>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#333333]">{text[language].progressTitle}</span>
              <span className="text-sm text-gray-500">
                {Math.round((userProgress.modulesCompleted / userProgress.totalModules) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#1976D2] to-[#43A047] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(userProgress.modulesCompleted / userProgress.totalModules) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center px-4 py-2 text-sm text-[#333333] hover:bg-gray-100 rounded-lg transition-colors">
              <Award className="w-4 h-4 mr-3 text-[#FF8F00]" />
              {text[language].myBadges}
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-[#333333] hover:bg-gray-100 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4 mr-3 text-[#43A047]" />
              {text[language].bookmarks}
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-[#333333] hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-3 text-[#1976D2]" />
              {text[language].downloadCertificate}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (selectedSection) {
    return (
      <LearningModule 
        section={selectedSection} 
        onBack={() => setSelectedSection(null)}
        language={language}
      />
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingStars />
        {showConfetti && <Confetti />}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-[#FF8F00]">
            {!showResults ? (
              <>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🧪</div>
                  <h1 className="text-4xl font-bold text-[#333333] mb-4">{text[language].quizTitle}</h1>
                  <div className="text-xl text-gray-600 mb-4">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div 
                      className="bg-gradient-to-r from-[#1976D2] to-[#43A047] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#333333] mb-6">
                    {quizQuestions[currentQuestion]?.[language]?.question}
                  </h2>
                  
                  <div className="space-y-4">
                    {quizQuestions[currentQuestion]?.[language]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1976D2] ${
                          selectedAnswer === index
                            ? isCorrect
                              ? 'border-[#43A047] bg-green-50 text-green-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-white hover:border-[#1976D2] hover:bg-blue-50'
                        }`}
                        aria-label={`Option ${index + 1}: ${option}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                            selectedAnswer === index
                              ? isCorrect
                                ? 'border-[#43A047] bg-[#43A047]'
                                : 'border-red-500 bg-red-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswer === index && (
                              isCorrect ? (
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
                        isCorrect ? 'bg-[#43A047]' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#333333]">
                        {isCorrect ? text[language].correct : text[language].incorrect}
                      </h3>
                    </div>
                    <p className="text-gray-700 ml-9">
                      {quizQuestions[currentQuestion]?.[language]?.explanation}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-8 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-2xl hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-red-300"
                    aria-label={text[language].backToHome}
                  >
                    🏠 {text[language].backToHome}
                  </button>
                  {showExplanation && (
                    <button
                      onClick={handleNextQuestion}
                      className="px-8 py-3 bg-gradient-to-r from-[#43A047] to-[#388E3C] text-white rounded-2xl hover:from-[#388E3C] hover:to-[#2E7D32] transform hover:scale-105 transition-all duration-300 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#43A047]"
                      aria-label={currentQuestion === quizQuestions.length - 1 ? text[language].finishQuiz : text[language].nextQuestion}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? '🏁 ' + text[language].finishQuiz : '➡️ ' + text[language].nextQuestion}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-5xl font-bold text-[#333333] mb-4">{text[language].yourScore}</h2>
                <div className="text-6xl font-bold text-[#43A047] mb-6">
                  {score} / {quizQuestions.length}
                </div>
                <div className="text-2xl mb-8">
                  {score === quizQuestions.length ? '🎉 Perfect! You are a nuclear energy expert!' :
                   score >= 3 ? '🌟 Great job! You know a lot about nuclear energy!' :
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
                    aria-label={text[language].backToHome}
                  >
                    🏠 {text[language].backToHome}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Navbar/>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1976D2] text-white px-4 py-2 rounded-lg z-50">
        {text[language].skipToContent}
      </a>
      
      {/* Welcome Header */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-yellow-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {text[language].siteName}
                </h1>
                <p className="text-2xl opacity-90 mb-6">{text[language].tagline}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Atom className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Nuclear Science Platform</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Interactive Learning</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 border border-white/20"
                aria-label={text[language].themeToggle}
              >
                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </button>
              <UserProfile />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-16">
        {/* SDG Dashboard */}
        <SDGDashboard />

        {/* Role-based Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cardData.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                className={`relative bg-gradient-to-br ${card.bgColor} ${card.borderColor} ${card.hoverColor} bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-white flex flex-col border transition-all duration-500 transform ${
                  card.animation 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                } hover:scale-105 hover:shadow-3xl group overflow-hidden`}
                role="region"
                aria-label={card.ariaLabel}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: card.particles }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-white/40 rounded-full`}
                      style={{
                        left: `${20 + (i * 60) % 80}%`,
                        top: `${20 + (i * 40) % 80}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${card.accentColor}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                {/* Card Header */}
                <div className="text-center mb-6 relative z-10">
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {card.emoji}
                  </motion.div>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 leading-tight">
                    {card.title}
                  </h2>
                  <p className="text-sm opacity-90 mb-4">
                    {card.subtitle}
                  </p>
                </div>

                {/* Card Content */}
                <div className="flex-1 mb-6 relative z-10">
                  <p className="text-sm opacity-90 mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="space-y-3">
                    {card.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center text-sm opacity-90 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 0.9, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 mr-3 text-white flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Learn More Button */}
                <motion.button 
                  onClick={() => setSelectedSection(card.section)}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 mx-auto border-2 border-white/30 group-hover:border-white/50 relative z-10"
                  aria-label={`Learn more about ${card.title}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center">
                    {text[language].exploreModule}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Learning Section */}
        <div className="text-center mb-16">
          <motion.div 
            className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto border border-purple-200 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <motion.div 
                className="text-8xl mb-6"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🎮
              </motion.div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Interactive Learning Hub
              </h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Dive into the fascinating world of nuclear science through cutting-edge interactive experiences!
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <motion.button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-6 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 font-bold text-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 shadow-lg hover:shadow-2xl border-2 border-white/20"
                  aria-label="Take the nuclear energy quiz"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Play className="w-8 h-8" />
                    <span>{text[language].takeQuiz}</span>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={() => document.getElementById('atom-model').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-bold text-xl focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg hover:shadow-2xl border-2 border-white/20"
                  aria-label="Explore the interactive atom model"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Atom className="w-8 h-8" />
                    <span>Explore Atom</span>
                  </div>
                </motion.button>
              </div>
              
              {/* Additional Features */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-700">Progress Tracking</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-medium text-gray-700">Achievement System</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-700">Personalized Learning</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive 3D Atom Model */}
        <div id="atom-model" className="flex justify-center">
          <motion.div 
            className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-purple-500/30 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  ⚛️
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Interactive Atom Adventure!
                </h3>
                <p className="text-white/80 text-lg">
                  Explore the fundamental building blocks of matter in 3D
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <InteractiveAtom3D />
              </div>
              
              {/* Interactive Controls */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-1">🔄</div>
                  <div className="text-xs text-white/80">Rotate</div>
                </button>
                <button className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-1">🔍</div>
                  <div className="text-xs text-white/80">Zoom</div>
                </button>
                <button className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs text-white/80">Animate</div>
                </button>
                <button className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-xs text-white/80">Info</div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-20 mt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Newsletter */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {text[language].newsletter}
              </h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder={text[language].newsletterPlaceholder}
                  className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-purple-400 text-gray-800 bg-white/90 backdrop-blur-sm"
                  aria-label="Email address for newsletter"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 font-bold shadow-lg hover:shadow-xl transform hover:scale-105">
                  {text[language].subscribe}
                </button>
              </div>
              <p className="text-white/70 text-sm mt-3">
                Stay updated with the latest in nuclear science and technology
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">{text[language].aboutNuclearSafety}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-white/80 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-white/80 hover:text-purple-400 transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Regulations
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-white/80 hover:text-pink-400 transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Best Practices
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">{text[language].followUs}</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg" aria-label="Discord">
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg" aria-label="YouTube">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <a href="mailto:contact@isotopenexus.com" className="flex items-center text-sm text-white/90 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@isotopenexus.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                HackAtom
              </span>
            </div>
            <p className="text-white/70">&copy; 2024 HackAtom - Nuclear Science Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;