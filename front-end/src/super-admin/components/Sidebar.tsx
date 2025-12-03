import { Building2, Users, CreditCard, Calendar, Settings, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'pgs', label: 'PGs', icon: Building2 },
    { id: 'managers', label: 'Managers', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'subscriptions', label: 'Subscriptions', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">StayGrid</h1>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors bg-red-500 text-white hover:bg-red-600"
        >
          <LayoutDashboard className="w-5 h-5" /> {/* Using a placeholder icon, you might want a specific logout icon */}
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
