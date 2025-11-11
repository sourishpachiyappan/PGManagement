import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, IndianRupee } from 'lucide-react';
import { supabase, Subscription } from '../lib/supabase';

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState({
    active: 0,
    expiringSoon: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('renewal_date', { ascending: true });

      if (error) throw error;

      const subscriptionsData = data || [];
      setSubscriptions(subscriptionsData);

      const activeCount = subscriptionsData.filter((s) => s.status === 'Active').length;
      const expiringSoonCount = subscriptionsData.filter((s) => s.status === 'Expiring Soon').length;
      const monthlyRevenue = subscriptionsData
        .filter((s) => s.status === 'Active')
        .reduce((sum, s) => sum + s.price, 0);

      setStats({
        active: activeCount,
        expiringSoon: expiringSoonCount,
        monthlyRevenue,
      });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }

  const getPlanColor = (plan: string) => {
    return plan === 'Pro' ? 'text-blue-700 bg-blue-100' : 'text-gray-700 bg-gray-100';
  };

  const getStatusStyle = (status: string) => {
    return status === 'Active'
      ? 'bg-teal-100 text-teal-700'
      : 'bg-yellow-100 text-yellow-700';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor client subscriptions and plan details</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
              <p className="text-sm text-gray-500 mt-2">Out of {subscriptions.length} total</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.expiringSoon}</p>
              <p className="text-sm text-yellow-600 mt-2">Renewal required</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ₹{stats.monthlyRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-500 mt-2">From subscriptions</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Subscriptions</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Client
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Plan
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Price
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                PGs
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Renewal Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscriptions.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{subscription.client_name}</p>
                    <p className="text-xs text-gray-500 mt-1">Unlimited tenants, Analytics</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${getPlanColor(
                      subscription.plan
                    )}`}
                  >
                    {subscription.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">
                    ₹{subscription.price.toLocaleString('en-IN')}/month
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">
                    {subscription.properties_count}{' '}
                    {subscription.properties_count === 1 ? 'property' : 'properties'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">{formatDate(subscription.renewal_date)}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      subscription.status
                    )}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        subscription.status === 'Active' ? 'bg-teal-600' : 'bg-yellow-600'
                      }`}
                    />
                    {subscription.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
