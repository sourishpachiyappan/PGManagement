import { CreditCard, TrendingUp, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Payments() {
  const recentPayments = [
    { id: 1, room: '101', tenant: 'Rajesh Kumar', amount: 8500, type: 'rent', status: 'paid', date: '2025-10-15' },
    { id: 2, room: '205', tenant: 'Priya Sharma', amount: 8500, type: 'rent', status: 'paid', date: '2025-10-14' },
    { id: 3, room: '308', tenant: 'Amit Singh', amount: 8500, type: 'rent', status: 'pending', date: '2025-10-01' },
    { id: 4, room: '412', tenant: 'Neha Patel', amount: 8500, type: 'rent', status: 'paid', date: '2025-10-12' },
    { id: 5, room: '115', tenant: 'Vikram Joshi', amount: 8500, type: 'rent', status: 'overdue', date: '2025-09-28' },
    { id: 6, room: '203', tenant: 'Anjali Verma', amount: 2000, type: 'maintenance', status: 'paid', date: '2025-10-16' },
  ];

  const statusConfig = {
    paid: { label: 'Paid', color: 'bg-green-100 text-green-700' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
        <p className="text-gray-600 mt-1">Track rent and payment collections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Collected"
          value="₹4.2L"
          icon={CreditCard}
          trend="+8% from last month"
          trendUp={true}
          color="green"
        />
        <StatCard
          title="Rent Paid (This Month)"
          value="₹3.8L"
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Pending Payments"
          value="₹42,500"
          icon={Clock}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{payment.room}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.tenant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[payment.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[payment.status as keyof typeof statusConfig].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Total Rooms</span>
                <span className="font-semibold text-gray-900">50</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Paid</span>
                <span className="font-semibold text-green-600">45</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">3</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Overdue</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Collection Rate</h4>
            <p className="text-3xl font-bold text-blue-700 mb-1">94%</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
