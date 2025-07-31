// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { HelpCircle, User, LogOut, LogIn, ChevronDown, ArrowRight, Atom, Sparkles, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate logo rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoRotation(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const text = {
    EN: {
      home: "Home",
      about: "About",
      services: "Services",
      blog: "Blog",
      signIn: "Sign in",
      getStarted: "Get Started",
      help: "Help",
      login: "Login",
      logout: "Logout",
      welcome: "Welcome",
      guest: "Guest"
    },
    RU: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      blog: "Блог",
      signIn: "Войти",
      getStarted: "Начать",
      help: "Помощь",
      login: "Войти",
      logout: "Выйти",
      welcome: "Добро пожаловать",
      guest: "Гость"
    },
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-200' 
          : 'bg-white/95 backdrop-blur-lg'
      }`}>
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Animated Logo */}
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
              onClick={handleHomeClick}
            >
              <div className="relative">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110"
                  style={{ transform: `rotate(${logoRotation}deg)` }}
                >
                  <Atom className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-bounce"></div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HackAtom
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={handleHomeClick}
                className="text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105 relative group"
              >
                {text[language].home}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </button>
              <a href="#" className="text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                {text[language].about}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#" className="text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                {text[language].services}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#" className="text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105 relative group">
                {text[language].blog}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>
          </div>

          {/* Right Section - Language, Help, and User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <button
              onClick={() => toggleLanguage(language === 'EN' ? 'RU' : 'EN')}
              className="hidden sm:flex items-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold border border-gray-200 hover:border-gray-300"
            >
              {language === 'EN' ? 'EN' : 'RU'}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {/* Help - Desktop */}
            <button className="hidden sm:flex items-center text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105">
              <HelpCircle size={18} className="mr-2" />
              {text[language].help}
            </button>

            {/* User Section - Desktop */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block">
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 cursor-pointer transition-all duration-300 hover:scale-110"
                  title={text[language].logout}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                {/* Sign In Button */}
                <button 
                  onClick={handleLogin}
                  className="flex items-center text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 hover:scale-105"
                >
                  {text[language].signIn}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                
                {/* Get Started Button */}
                <button 
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 border border-purple-500/20"
                >
                  {text[language].getStarted}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <button 
                  onClick={handleHomeClick}
                  className="w-full text-left text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 py-2 border-b border-gray-100"
                >
                  {text[language].home}
                </button>
                <a href="#" className="block text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 py-2 border-b border-gray-100">
                  {text[language].about}
                </a>
                <a href="#" className="block text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 py-2 border-b border-gray-100">
                  {text[language].services}
                </a>
                <a href="#" className="block text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 py-2 border-b border-gray-100">
                  {text[language].blog}
                </a>
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-4">
                <button
                  onClick={() => toggleLanguage(language === 'EN' ? 'RU' : 'EN')}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold border border-gray-200"
                >
                  <span>Language</span>
                  <div className="flex items-center">
                    <span>{language === 'EN' ? 'EN' : 'RU'}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </div>
                </button>
              </div>

              {/* Mobile Help */}
              <div className="pt-2">
                <button className="w-full flex items-center text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 py-3">
                  <HelpCircle size={18} className="mr-3" />
                  {text[language].help}
                </button>
              </div>

              {/* Mobile User Section */}
              {user ? (
                <div className="pt-4 space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-600">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center text-gray-700 hover:text-red-600 cursor-pointer transition-all duration-300 py-3"
                  >
                    <LogOut size={18} className="mr-3" />
                    {text[language].logout}
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center text-gray-800 hover:text-purple-600 font-semibold transition-all duration-300 py-3"
                  >
                    {text[language].signIn}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {text[language].getStarted}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Navbar;
