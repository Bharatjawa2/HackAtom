import React, { createContext, useState, useContext, useEffect } from "react";
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "EN");

  // Save selection in localStorage so it persists after refresh
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const toggleLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easy use
export const useLanguage = () => useContext(LanguageContext);
