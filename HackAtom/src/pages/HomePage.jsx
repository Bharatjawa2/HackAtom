import React from 'react'
import Navbar from '../components/Navbar'
import { useLanguage } from "../context/LanguageContext";

const HomePage = () => {
    const { language } = useLanguage();
    return (
    <>
        <Navbar/>
        <div className="p-6">
      {language === "EN" ? "Welcome to the homepage!" : "Добро пожаловать на главную страницу!"}
    </div>
    </>
  )
}

export default HomePage