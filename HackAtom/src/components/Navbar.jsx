// src/components/Navbar.jsx
import React from "react";
import { HelpCircle, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();

  const text = {
    EN: {
      partnership: "In partnership with",
      partner: "ROSATOM",
      title: "Nuclear Medicine Isotope Comparison Tool",
      help: "Help",
      login: "Login",
    },
    RU: {
      partnership: "В партнёрстве с",
      partner: "РОСАТОМ",
      title: "Инструмент сравнения изотопов ядерной медицины",
      help: "Помощь",
      login: "Войти",
    },
  };

  return (
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
        {/* Login */}
        <button className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer">
          <User size={20} className="mr-1" /> {text[language].login}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
