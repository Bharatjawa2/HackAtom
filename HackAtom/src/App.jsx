import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Agriculture from './pages/Agriculture'
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from './components/Navbar'

const App = () => {
  return (
    <LanguageProvider>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/agri" element={<Agriculture/>}/>
    </Routes>
    </LanguageProvider>
  )
}

export default App