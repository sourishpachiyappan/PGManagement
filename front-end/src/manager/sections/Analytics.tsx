import { Home, CreditCard, Users, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
        <p className="text-gray-600 mt-1">Key metrics and performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Occupancy Rate"
          value="87%"
          icon={Home}
          trend="+5% from last month"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Total Payments"
          value="₹4.2L"
          icon={CreditCard}
          trend="+12% from last month"
          trendUp={true}
          color="green"
        />
        <StatCard
          title="Staff Count"
          value="24"
          icon={Users}
          color="gray"
        />
        <StatCard
          title="Revenue Growth"
          value="+18%"
          icon={TrendingUp}
          trend="This quarter"
          trendUp={true}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 78, 82, 70, 88, 92, 87].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Average Stay Duration</span>
              <span className="font-semibold text-gray-900">6.2 months</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-gray-900">4.6/5.0</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Pending Complaints</span>
              <span className="font-semibold text-orange-600">3</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Staff on Leave</span>
              <span className="font-semibold text-gray-900">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
