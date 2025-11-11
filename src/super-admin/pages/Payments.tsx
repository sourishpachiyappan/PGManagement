import { useEffect, useState } from 'react';
import { TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { supabase, Payment } from '../lib/supabase';

export function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    collected: 0,
    pending: 0,
    overdue: 0,
    collectionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*, pgs(*)')
        .order('payment_date', { ascending: false });

      if (error) throw error;

      const paymentsData = data || [];
      setPayments(paymentsData);

      const totalRevenue = paymentsData.reduce((sum, p) => sum + p.amount, 0);
      const collected = paymentsData
        .filter((p) => p.status === 'Collected')
        .reduce((sum, p) => sum + p.amount, 0);
      const pendingCount = paymentsData.filter((p) => p.status === 'Pending').length;
      const overdueCount = paymentsData.filter((p) => p.status === 'Overdue').length;
      const collectionRate = totalRevenue > 0 ? Math.round((collected / totalRevenue) * 100) : 0;

      setStats({
        totalRevenue,
        collected,
        pending: pendingCount,
        overdue: overdueCount,
        collectionRate,
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Collected':
        return <CheckCircle2 className="w-4 h-4 text-teal-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Overdue':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Collected':
        return 'bg-teal-100 text-teal-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
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
        <h1 className="text-2xl font-bold text-gray-900">Payments & Revenue</h1>
        <p className="text-sm text-gray-500 mt-1">Track rent collections and financial overview</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-500 mt-2">This month</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ₹{stats.collected.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-teal-600 mt-2">{stats.collectionRate}% collection rate</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
              <p className="text-sm text-gray-500 mt-2">Invoices pending</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.overdue}</p>
              <p className="text-sm text-red-600 mt-2">Requires attention</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Collections</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                PG Property
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Amount
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Tenants
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{payment.pgs?.name || 'N/A'}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">{payment.tenants_count} tenants</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">{formatDate(payment.payment_date)}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      payment.status
                    )}`}
                  >
                    {getStatusIcon(payment.status)}
                    <span className="ml-2">{payment.status}</span>
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
