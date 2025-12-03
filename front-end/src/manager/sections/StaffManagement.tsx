import { Users, Check, X } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function StaffManagement() {
  const staff = [
    { id: 1, name: 'Ravi Kumar', role: 'Cleaner', salary: 12000, status: 'paid', phone: '+91 98765 43210' },
    { id: 2, name: 'Sunita Devi', role: 'Cook', salary: 15000, status: 'paid', phone: '+91 98765 43211' },
    { id: 3, name: 'Ramesh Singh', role: 'Food Supervisor', salary: 18000, status: 'paid', phone: '+91 98765 43212' },
    { id: 4, name: 'Geeta Sharma', role: 'Cleaner', salary: 12000, status: 'pending', phone: '+91 98765 43213' },
    { id: 5, name: 'Mohan Lal', role: 'Cook Helper', salary: 10000, status: 'paid', phone: '+91 98765 43214' },
    { id: 6, name: 'Anjali Yadav', role: 'Cook Helper', salary: 10000, status: 'paid', phone: '+91 98765 43215' },
    { id: 7, name: 'Rajesh Gupta', role: 'Cleaner Helper', salary: 8000, status: 'paid', phone: '+91 98765 43216' },
    { id: 8, name: 'Priya Kumari', role: 'Cleaner Helper', salary: 8000, status: 'pending', phone: '+91 98765 43217' },
  ];

  const roleStats = {
    cleaners: staff.filter(s => s.role === 'Cleaner').length,
    cook: staff.filter(s => s.role === 'Cook').length,
    foodSupervisor: staff.filter(s => s.role === 'Food Supervisor').length,
    cookHelpers: staff.filter(s => s.role === 'Cook Helper').length,
    cleanerHelpers: staff.filter(s => s.role === 'Cleaner Helper').length,
  };

  const statusConfig = {
    paid: { label: 'Paid', color: 'bg-green-100 text-green-700', icon: Check },
    pending: { label: 'Pending', color: 'bg-orange-100 text-orange-700', icon: X },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
        <p className="text-gray-600 mt-1">Manage staff members and salary status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Staff" value={staff.length} icon={Users} color="gray" />
        <StatCard
          title="Salary Paid"
          value={`₹${(staff.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.salary, 0) / 1000).toFixed(0)}K`}
          icon={Check}
          color="green"
        />
        <StatCard
          title="Pending Payments"
          value={`₹${(staff.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.salary, 0) / 1000).toFixed(0)}K`}
          icon={X}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Staff List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((member) => {
                  const config = statusConfig[member.status as keyof typeof statusConfig];
                  const StatusIcon = config.icon;

                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{member.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">₹{member.salary.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {config.label}
                        </span>
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

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Cleaners</span>
              <span className="font-semibold text-gray-900">{roleStats.cleaners}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Cook</span>
              <span className="font-semibold text-gray-900">{roleStats.cook}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Food Supervisor</span>
              <span className="font-semibold text-gray-900">{roleStats.foodSupervisor}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Cook Helpers</span>
              <span className="font-semibold text-gray-900">{roleStats.cookHelpers}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Cleaner Helpers</span>
              <span className="font-semibold text-gray-900">{roleStats.cleanerHelpers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
