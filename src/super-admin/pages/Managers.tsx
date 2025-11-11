import { useEffect, useState } from 'react';
import { Mail, Phone, Building2, Search } from 'lucide-react';
import { supabase, Manager } from '../lib/supabase';

interface ManagerWithStats extends Manager {
  totalCapacity: number;
  currentTenants: number;
  occupancyRate: number;
  pgCount: number;
}

export function Managers() {
  const [managers, setManagers] = useState<ManagerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchManagers();
  }, []);

  async function fetchManagers() {
    try {
      const { data: managersData, error: managersError } = await supabase
        .from('managers')
        .select('*')
        .order('name');

      if (managersError) throw managersError;

      const { data: pgsData, error: pgsError } = await supabase
        .from('pgs')
        .select('manager_id, current_occupancy, total_capacity');

      if (pgsError) throw pgsError;

      const managersWithStats = managersData.map((manager) => {
        const managerPGs = pgsData.filter((pg) => pg.manager_id === manager.id);
        const totalCapacity = managerPGs.reduce((sum, pg) => sum + pg.total_capacity, 0);
        const currentTenants = managerPGs.reduce((sum, pg) => sum + pg.current_occupancy, 0);
        const occupancyRate = totalCapacity > 0 ? Math.round((currentTenants / totalCapacity) * 100) : 0;

        return {
          ...manager,
          totalCapacity,
          currentTenants,
          occupancyRate,
          pgCount: managerPGs.length,
        };
      });

      setManagers(managersWithStats);
    } catch (error) {
      console.error('Error fetching managers:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Managers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all property managers</p>
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredManagers.map((manager) => (
          <div key={manager.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: manager.avatar_color }}
                >
                  {getInitials(manager.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Building2 className="w-3 h-3 mr-1" />
                    {manager.pgCount} {manager.pgCount === 1 ? 'PG' : 'PGs'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {manager.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {manager.phone}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Occupancy Rate</span>
                <span className="text-sm font-semibold text-gray-900">{manager.occupancyRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    manager.occupancyRate >= 90 ? 'bg-teal-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${manager.occupancyRate}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Total Capacity</p>
                  <p className="text-lg font-bold text-gray-900">{manager.totalCapacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Tenants</p>
                  <p className="text-lg font-bold text-gray-900">{manager.currentTenants}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
