import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './pages/Overview';
import { PGProperties } from './pages/PGProperties';
import { Managers } from './pages/Managers';
import { Payments } from './pages/Payments';
import { Subscriptions } from './pages/Subscriptions';
import { Settings } from './pages/Settings';

interface SuperAdminProps {
  onLogout: () => void;
}

function App({ onLogout }: SuperAdminProps) {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'pgs':
        return <PGProperties />;
      case 'managers':
        return <Managers />;
      case 'payments':
        return <Payments />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={onLogout} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
