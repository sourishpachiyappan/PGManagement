import {
  BarChart3,
  Home,
  UtensilsCrossed,
  MessageSquare,
  CreditCard,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'rooms', label: 'Rooms', icon: Home },
  { id: 'food', label: 'Food Menu', icon: UtensilsCrossed },
  { id: 'complaints', label: 'Complaints', icon: MessageSquare },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'staff', label: 'Staff Management', icon: Users },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">StayGrid</h1>
        <p className="text-sm text-gray-500 mt-1">Manager Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
            M
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Manager</p>
            <p className="text-xs text-gray-500">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
