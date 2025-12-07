import React, { useState, useEffect } from 'react';
import AuthPage from './AuthPage';
import ManagerPanel from './manager/ManagerPanel';
import TenentPanle from './tenent/TenentPanle';
import SuperAdmin from './super-admin/SuperAdmin';
import { getToken, logoutUser } from './api/services'; // Updated imports

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'auth', 'manager', 'tenant'
  const [userType, setUserType] = useState<'manager' | 'tenant' | 'super-admin' | null>(null);

  useEffect(() => {
    const storedToken = getToken(); // Use new getToken function
    const storedUserString = localStorage.getItem('userDetails'); // Directly get user details

    if (storedToken && storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString);
        setUserType(storedUser.userType); // Assuming userType is part of storedUser
        setCurrentPage(storedUser.userType); // Redirect to user's panel
      } catch (e) {
        console.error("Failed to parse user details from localStorage", e);
        logoutUser(); // Clear invalid data
        setUserType(null);
        setCurrentPage('landing');
      }
    } else {
      setCurrentPage('landing'); // No valid token, go to landing/auth page
    }
  }, []);

  const handleLogin = (type: 'manager' | 'tenant' | 'super-admin') => {
    setUserType(type);
    setCurrentPage(type);
  };

  const handleLogout = () => {
    logoutUser(); // Clear local storage on logout
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
      default:
        // If no userType is set, or if token expired, show AuthPage
        return <AuthPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
