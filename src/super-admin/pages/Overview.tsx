import { useEffect, useState } from 'react';
import { Building2, Users, Home, TrendingUp, ArrowUp, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Stats {
  totalPGs: number;
  totalManagers: number;
  totalTenants: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  averagePerPG: number;
  collectionRate: number;
  avgOccupancy: number;
  managerPerformance: number;
  renewalRate: number;
}

export function Overview() {
  const [stats, setStats] = useState<Stats>({
    totalPGs: 0,
    totalManagers: 0,
    totalTenants: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    averagePerPG: 0,
    collectionRate: 0,
    avgOccupancy: 0,
    managerPerformance: 0,
    renewalRate: 80,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [pgsResult, managersResult, subscriptionsResult, paymentsResult] = await Promise.all([
        supabase.from('pgs').select('*'),
        supabase.from('managers').select('*'),
        supabase.from('subscriptions').select('*').eq('status', 'Active'),
        supabase.from('payments').select('*').eq('status', 'Collected'),
      ]);

      const pgs = pgsResult.data || [];
      const managers = managersResult.data || [];
      const subscriptions = subscriptionsResult.data || [];
      const payments = paymentsResult.data || [];

      const totalTenants = pgs.reduce((sum, pg) => sum + pg.current_occupancy, 0);
      const totalCapacity = pgs.reduce((sum, pg) => sum + pg.total_capacity, 0);
      const monthlyRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
      const avgOccupancy = totalCapacity > 0 ? (totalTenants / totalCapacity) * 100 : 0;

      setStats({
        totalPGs: pgs.length,
        totalManagers: managers.length,
        totalTenants,
        activeSubscriptions: subscriptions.length,
        monthlyRevenue,
        averagePerPG: pgs.length > 0 ? Math.round(monthlyRevenue / pgs.length) : 0,
        collectionRate: 94,
        avgOccupancy: Math.round(avgOccupancy),
        managerPerformance: 89,
        renewalRate: 80,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Complete system overview and key metrics</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total PGs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPGs}</p>
              <p className="text-sm text-teal-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3 this month
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Managers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalManagers}</p>
              <p className="text-sm text-gray-500 mt-2">All active</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTenants}</p>
              <p className="text-sm text-teal-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +42 this month
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeSubscriptions}</p>
              <p className="text-sm text-teal-600 mt-2">{stats.renewalRate}% renewal rate</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center text-sm text-teal-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              +12% from last month
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">Total Monthly Revenue</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">₹{stats.monthlyRevenue.toLocaleString('en-IN')}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Average per PG</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{stats.averagePerPG.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.collectionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Average Occupancy</p>
                <p className="text-sm font-semibold text-gray-900">{stats.avgOccupancy}%</p>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${stats.avgOccupancy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Manager Performance</p>
                <p className="text-sm font-semibold text-gray-900">{stats.managerPerformance}%</p>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${stats.managerPerformance}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <p className="text-sm font-medium text-gray-900">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
