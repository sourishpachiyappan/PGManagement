import { Plus, AlertCircle, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Complaints() {
  const complaints = [
    { id: 1, room: '101', category: 'Maintenance', issue: 'AC not working', status: 'pending', date: '2025-10-18', priority: 'high' },
    { id: 2, room: '205', category: 'Food', issue: 'Food quality complaint', status: 'in-progress', date: '2025-10-17', priority: 'medium' },
    { id: 3, room: '308', category: 'Cleanliness', issue: 'Bathroom cleaning required', status: 'resolved', date: '2025-10-16', priority: 'low' },
    { id: 4, room: '412', category: 'Maintenance', issue: 'Water leakage', status: 'pending', date: '2025-10-18', priority: 'high' },
    { id: 5, room: '115', category: 'Other', issue: 'Noise complaint', status: 'in-progress', date: '2025-10-17', priority: 'medium' },
  ];

  const categories = ['Maintenance', 'Food', 'Cleanliness', 'Staff', 'Other'];

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-orange-100 text-orange-700' },
    'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700' },
  };

  const priorityConfig = {
    high: { color: 'text-red-600' },
    medium: { color: 'text-orange-600' },
    low: { color: 'text-gray-600' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complaints Management</h2>
          <p className="text-gray-600 mt-1">Track and resolve tenant complaints</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Plus className="w-5 h-5" />
          New Complaint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Complaints" value="48" icon={AlertCircle} color="gray" />
        <StatCard title="Pending" value="12" icon={Clock} color="orange" />
        <StatCard title="Resolved (This Week)" value="8" icon={AlertCircle} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Complaint List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{complaint.room}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {complaint.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {complaint.issue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-medium uppercase ${priorityConfig[complaint.priority as keyof typeof priorityConfig].color}`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[complaint.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[complaint.status as keyof typeof statusConfig].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {complaint.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-700">{category}</span>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Edit
                </button>
              </div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Category</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
