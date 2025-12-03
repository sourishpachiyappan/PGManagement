import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Analytics from './sections/Analytics';
import Rooms from './sections/Rooms';
import FoodMenu from './sections/FoodMenu';
import Complaints from './sections/Complaints';
import Payments from './sections/Payments';
import StaffManagement from './sections/StaffManagement';

interface ManagerPanelProps {
  onLogout: () => void;
}

function ManagerPanel({ onLogout }: ManagerPanelProps) {
  const [activeSection, setActiveSection] = useState('analytics');

  const renderSection = () => {
    switch (activeSection) {
      case 'analytics':
        return <Analytics />;
      case 'rooms':
        return <Rooms />;
      case 'food':
        return <FoodMenu />;
      case 'complaints':
        return <Complaints />;
      case 'payments':
        return <Payments />;
      case 'staff':
        return <StaffManagement />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        {renderSection()}
      </main>
    </div>
  );
}

export default ManagerPanel;
