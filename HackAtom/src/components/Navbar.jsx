// src/components/Navbar.jsx
import React from "react";
import { HelpCircle, User, LogOut } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThreeCircles from "./ThreeCircles";

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const text = {
    EN: {
      partnership: "In partnership with",
      partner: "ROSATOM",
      title: "Nuclear Medicine Isotope Comparison Tool",
      help: "Help",
      login: "Login",
      logout: "Logout",
      welcome: "Welcome",
    },
    RU: {
      partnership: "В партнёрстве с",
      partner: "РОСАТОМ",
      title: "Инструмент сравнения изотопов ядерной медицины",
      help: "Помощь",
      login: "Войти",
      logout: "Выйти",
      welcome: "Добро пожаловать",
    },
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <>
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-700 text-white rounded-full font-bold text-sm">
          R
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-gray-500">{text[language].partnership}</span>
          <span className="text-blue-700 font-semibold text-sm">{text[language].partner}</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="text-lg font-semibold text-gray-800">
        {text[language].title}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Language Switcher */}
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden text-sm">
          <button
            onClick={() => toggleLanguage("EN")}
            className={`px-3 py-1 cursor-pointer transition ${
              language === "EN" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => toggleLanguage("RU")}
            className={`px-3 py-1 cursor-pointer transition ${
              language === "RU" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            RU
          </button>
        </div>

        {/* Help */}
        <button className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer">
          <HelpCircle size={20} className="mr-1" /> {text[language].help}
        </button>

        {/* User Section */}
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600 cursor-pointer transition-colors"
              title={text[language].logout}
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <User size={20} className="mr-1" /> {text[language].login}
          </button>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
