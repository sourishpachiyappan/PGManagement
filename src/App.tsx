import React, { useState } from 'react';
import LandingPage from './landing-page/LandingPage';
import AuthPage from './AuthPage';
import ManagerPanel from './manager/ManagerPanel';
import TenentPanle from './tenent/TenentPanle';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'auth', 'manager', 'tenant'
  const [userType, setUserType] = useState<'manager' | 'tenant' | null>(null);

  const handleLogin = (type: 'manager' | 'tenant') => {
    setUserType(type);
    setCurrentPage(type);
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentPage('landing');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGoToAuth={() => setCurrentPage('auth')} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onGoToLanding={() => setCurrentPage('landing')} />;
      case 'manager':
        return <ManagerPanel onLogout={handleLogout} />;
      case 'tenant':
        return <TenentPanle onLogout={handleLogout} />;
      default:
        return <LandingPage onGoToAuth={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
