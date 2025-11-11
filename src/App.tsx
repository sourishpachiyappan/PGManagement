import React, { useState } from 'react';
import AuthPage from './AuthPage';
import ManagerPanel from './manager/ManagerPanel';
import TenentPanle from './tenent/TenentPanle';
import SuperAdmin from './super-admin/SuperAdmin';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'auth', 'manager', 'tenant'
  const [userType, setUserType] = useState<'manager' | 'tenant' | 'super-admin' | null>(null);

  const handleLogin = (type: 'manager' | 'tenant' | 'super-admin') => {
    setUserType(type);
    setCurrentPage(type);
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentPage('landing');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'manager':
        return <ManagerPanel onLogout={handleLogout} />;
      case 'tenant':
        return <TenentPanle onLogout={handleLogout} />;
      case 'super-admin':
        return <SuperAdmin onLogout={handleLogout} />;
      default :
        return <AuthPage onLogin={handleLogin} onGoToLanding={() => setCurrentPage('manager')} />;
        }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
