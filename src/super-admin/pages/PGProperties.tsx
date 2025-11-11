import { useEffect, useState } from 'react';
import { MapPin, User, Search } from 'lucide-react';
import { supabase, PG } from '../lib/supabase';

export function PGProperties() {
  const [pgs, setPGs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPGs();
  }, []);

  async function fetchPGs() {
    try {
      const { data, error } = await supabase
        .from('pgs')
        .select('*, managers(*)')
        .order('name');

      if (error) throw error;
      setPGs(data || []);
    } catch (error) {
      console.error('Error fetching PGs:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPGs = pgs.filter((pg) =>
    pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOccupancyPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-teal-500';
    if (percentage >= 80) return 'bg-blue-500';
    return 'bg-blue-500';
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
          <h1 className="text-2xl font-bold text-gray-900">PG Properties</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all PG properties across locations</p>
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search PGs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                PG Name
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Location
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Manager
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Occupancy
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Capacity
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPGs.map((pg) => {
              const occupancyPercentage = getOccupancyPercentage(
                pg.current_occupancy,
                pg.total_capacity
              );
              const occupancyColor = getOccupancyColor(occupancyPercentage);

              return (
                <tr key={pg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{pg.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{pg.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span>Managed by {pg.managers?.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${occupancyColor} rounded-full`}
                          style={{ width: `${occupancyPercentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {occupancyPercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {pg.current_occupancy}/{pg.total_capacity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                      <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-2" />
                      {pg.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
