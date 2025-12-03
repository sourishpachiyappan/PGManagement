import { useState } from 'react';
import { User, UtensilsCrossed, MessageSquare, CreditCard } from 'lucide-react';
import Profile from './components/Profile';
import Menu from './components/Menu';
import Complaints from './components/Complaints';
import PaymentStatus from './components/PaymentStatus';

type Tab = 'profile' | 'menu' | 'complaints' | 'payment';

interface TenentPanleProps {
  onLogout: () => void;
}

function TenentPanle({ onLogout }: TenentPanleProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'menu' as Tab, label: 'Menu', icon: UtensilsCrossed },
    { id: 'complaints' as Tab, label: 'Complaints', icon: MessageSquare },
    { id: 'payment' as Tab, label: 'Payment Status', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">StayGrid</h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                AV
              </div>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'complaints' && <Complaints />}
        {activeTab === 'payment' && <PaymentStatus />}
      </main>
    </div>
  );
}

export default TenentPanle;
