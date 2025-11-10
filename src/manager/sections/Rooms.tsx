import { Home, Check, X, LogIn, LogOut } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Rooms() {
  const rooms = [
    { number: '101', status: 'filled', tenant: 'Rajesh Kumar', dueDate: '2025-11-15' },
    { number: '102', status: 'vacant', tenant: null, dueDate: null },
    { number: '103', status: 'filled', tenant: 'Priya Sharma', dueDate: '2025-10-25' },
    { number: '104', status: 'ready-vacate', tenant: 'Amit Singh', dueDate: '2025-10-22' },
    { number: '105', status: 'ready-join', tenant: 'Neha Patel', dueDate: '2025-10-20' },
    { number: '106', status: 'filled', tenant: 'Vikram Joshi', dueDate: '2025-12-01' },
    { number: '107', status: 'vacant', tenant: null, dueDate: null },
    { number: '108', status: 'filled', tenant: 'Anjali Verma', dueDate: '2025-11-10' },
  ];

  const statusConfig = {
    filled: { label: 'Filled', color: 'bg-green-100 text-green-700', icon: Check },
    vacant: { label: 'Vacant', color: 'bg-gray-100 text-gray-700', icon: X },
    'ready-vacate': { label: 'Ready to Vacate', color: 'bg-orange-100 text-orange-700', icon: LogOut },
    'ready-join': { label: 'Ready to Join', color: 'bg-blue-100 text-blue-700', icon: LogIn },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
        <p className="text-gray-600 mt-1">Overview and status of all rooms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Rooms" value="50" icon={Home} color="gray" />
        <StatCard title="Filled" value="42" icon={Check} color="green" />
        <StatCard title="Vacant" value="5" icon={X} color="gray" />
        <StatCard title="Ready to Vacate" value="2" icon={LogOut} color="orange" />
        <StatCard title="Ready to Join" value="1" icon={LogIn} color="blue" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Room Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => {
                const config = statusConfig[room.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <tr key={room.number} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{room.number}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {room.tenant || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {room.dueDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
