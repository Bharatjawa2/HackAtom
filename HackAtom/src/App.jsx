import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider,AuthContext } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import SpaceBackground from './components/SpaceBackground';
import AtomicBackground from './components/AtomicBackground';

const OptionalAuthRoute = ({ children }) => {
  return children;
};

const PublicRoute = ({ children }) => {
  // Replace the context with your actual AuthContext
  const { user } = React.useContext(AuthContext); // <-- Make sure AuthContext is imported correctly
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          {/* Atomic Background Animation */}
          <AtomicBackground isVisible={true} />

          {/* Space Background (fallback) */}
          <SpaceBackground>
            <Routes>
              <Route path="/" element={<OptionalAuthRoute><HomePage /></OptionalAuthRoute>} />
              <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SpaceBackground>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
