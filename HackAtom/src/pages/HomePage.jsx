import React, { useState, Suspense, lazy } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  Heart, Zap, Brain, Play, Trophy, Users
} from 'lucide-react';

// Lazy-load heavy components
const LearningModule = lazy(() => import('../components/LearningModule'));
const InteractiveAtom3D = lazy(() => import('../components/InteractiveAtom3D'));

const HomePage = () => {
  const { language, toggleLanguage } = useLanguage();
  const { user } = useAuth();

  const [selectedSection, setSelectedSection] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Text translations
  const text = {
    EN: {
      welcome: "Welcome to Nuclear Energy Education",
      subtitle: "Explore the fascinating world of nuclear energy through interactive learning",
      generalPublic: "General Public",
      medicalProfessionals: "Medical Professionals",
      nuclearEngineers: "Nuclear Engineers",
      startLearning: "Start Learning",
      takeQuiz: "Take Quiz",
      quizTitle: "Nuclear Energy Quiz",
      nextQuestion: "Next Question",
      finishQuiz: "Finish Quiz",
      yourScore: "Your Score",
      tryAgain: "Try Again",
      backToHome: "Back to Home",
      quizSection: "Quiz Section"
    },
    RU: {
      welcome: "Добро пожаловать в образование по ядерной энергии",
      subtitle: "Изучите увлекательный мир ядерной энергии через интерактивное обучение",
      generalPublic: "Общественность",
      medicalProfessionals: "Медицинские специалисты",
      nuclearEngineers: "Ядерные инженеры",
      startLearning: "Начать обучение",
      takeQuiz: "Пройти тест",
      quizTitle: "Тест по ядерной энергии",
      nextQuestion: "Следующий вопрос",
      finishQuiz: "Завершить тест",
      yourScore: "Ваш результат",
      tryAgain: "Попробовать снова",
      backToHome: "Вернуться на главную",
      quizSection: "Раздел тестов"
    }
  };

  const quizQuestions = {
    EN: [
      { question: "What is the main component of nuclear fuel?", options: ["Uranium-235", "Carbon", "Iron", "Oxygen"], correct: 0 },
      { question: "Which particle has no electric charge?", options: ["Proton", "Neutron", "Electron", "Photon"], correct: 1 },
      { question: "What is nuclear fusion?", options: ["Splitting atoms", "Combining atoms", "Radioactive decay", "Chemical reaction"], correct: 1 },
      { question: "Which element is most commonly used in nuclear power plants?", options: ["Plutonium", "Uranium", "Thorium", "Radium"], correct: 1 },
      { question: "What is the main advantage of nuclear energy?", options: ["Low cost", "No greenhouse gases", "Abundant fuel", "All of the above"], correct: 3 }
    ],
    RU: [
      { question: "Какой основной компонент ядерного топлива?", options: ["Уран-235", "Углерод", "Железо", "Кислород"], correct: 0 },
      { question: "Какая частица не имеет электрического заряда?", options: ["Протон", "Нейтрон", "Электрон", "Фотон"], correct: 1 },
      { question: "Что такое ядерный синтез?", options: ["Деление атомов", "Объединение атомов", "Радиоактивный распад", "Химическая реакция"], correct: 1 },
      { question: "Какой элемент чаще всего используется на АЭС?", options: ["Плутоний", "Уран", "Торий", "Радий"], correct: 1 },
      { question: "Какое главное преимущество ядерной энергии?", options: ["Низкая стоимость", "Нет парниковых газов", "Обилие топлива", "Все вышеперечисленное"], correct: 3 }
    ]
  };

  const handleQuizAnswer = (selectedOption) => {
    const currentQ = quizQuestions[language][currentQuestion];
    if (selectedOption === currentQ.correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions[language].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setShowQuiz(false);
  };

  const LearningCard = ({ title, description, icon: Icon, color, onClick }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-t-4 ${color}`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full">
          <Icon className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  // If a learning module is selected
  if (selectedSection) {
    return (
      <Suspense fallback={<div className="text-center p-20">Loading module...</div>}>
        <LearningModule section={selectedSection} onBack={() => setSelectedSection(null)} />
      </Suspense>
    );
  }

  // Quiz Section
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            {!showResults ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{text[language].quizTitle}</h2>
                  <p className="text-gray-600">Question {currentQuestion + 1} of {quizQuestions[language].length}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">{quizQuestions[language][currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {quizQuestions[language][currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    {text[language].backToHome}
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {currentQuestion === quizQuestions[language].length - 1 ? text[language].finishQuiz : text[language].nextQuestion}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{text[language].yourScore}</h2>
                <p className="text-2xl font-semibold text-indigo-600 mb-6">
                  {score} / {quizQuestions[language].length}
                </p>
                <div className="space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {text[language].tryAgain}
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    {text[language].backToHome}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">{text[language].welcome}</h1>
          <p className="text-xl text-gray-600 mb-8">{text[language].subtitle}</p>

          {/* Interactive 3D Atom Model */}
          <div className="relative flex justify-center items-center mb-8">
            <div className="absolute w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <Suspense fallback={<div className="text-gray-500">Loading 3D model...</div>}>
              <InteractiveAtom3D />
            </Suspense>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <LearningCard
            title={text[language].generalPublic}
            description="Learn about nuclear energy basics, safety, and everyday applications in an easy-to-understand format."
            icon={Users}
            color="border-green-500"
            onClick={() => setSelectedSection('general')}
          />
          <LearningCard
            title={text[language].medicalProfessionals}
            description="Explore nuclear medicine, radiation therapy, and medical imaging applications."
            icon={Heart}
            color="border-blue-500"
            onClick={() => setSelectedSection('medical')}
          />
          <LearningCard
            title={text[language].nuclearEngineers}
            description="Deep dive into reactor design, nuclear physics, and advanced engineering concepts."
            icon={Zap}
            color="border-purple-500"
            onClick={() => setSelectedSection('engineering')}
          />
        </div>

        {/* Quiz Section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{text[language].quizSection}</h3>
            <p className="text-gray-600 mb-6">Test your knowledge about nuclear energy!</p>
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              {text[language].takeQuiz}
            </button>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="text-center">
          <button
            onClick={() => toggleLanguage(language === 'EN' ? 'RU' : 'EN')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {language === 'EN' ? 'Русский' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
