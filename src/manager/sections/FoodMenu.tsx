import { Calendar, UtensilsCrossed } from 'lucide-react';

export default function FoodMenu() {
  const todaysMenu = {
    breakfast: ['Poha', 'Tea/Coffee', 'Banana'],
    lunch: ['Dal Tadka', 'Rice', 'Roti', 'Mixed Veg', 'Salad'],
    dinner: ['Paneer Butter Masala', 'Rice', 'Roti', 'Dal', 'Raita'],
  };

  const weeklyMenu = [
    { day: 'Monday', breakfast: 'Upma', lunch: 'Dal Rice', dinner: 'Roti Sabzi' },
    { day: 'Tuesday', breakfast: 'Poha', lunch: 'Rajma Rice', dinner: 'Paneer Roti' },
    { day: 'Wednesday', breakfast: 'Paratha', lunch: 'Chole Rice', dinner: 'Mix Veg' },
    { day: 'Thursday', breakfast: 'Idli Sambhar', lunch: 'Dal Rice', dinner: 'Aloo Gobi' },
    { day: 'Friday', breakfast: 'Sandwich', lunch: 'Kadhi Rice', dinner: 'Paneer Tikka' },
    { day: 'Saturday', breakfast: 'Dosa', lunch: 'Veg Pulao', dinner: 'Special Thali' },
    { day: 'Sunday', breakfast: 'Puri Sabzi', lunch: 'Biryani', dinner: 'Dal Makhani' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Food Menu</h2>
        <p className="text-gray-600 mt-1">Daily and weekly meal planning</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <UtensilsCrossed className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Today's Menu</h3>
          <span className="ml-auto text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-orange-200">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Breakfast</h4>
            <ul className="space-y-2">
              {todaysMenu.breakfast.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Lunch</h4>
            <ul className="space-y-2">
              {todaysMenu.lunch.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Dinner</h4>
            <ul className="space-y-2">
              {todaysMenu.dinner.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Weekly Menu Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Breakfast
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lunch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dinner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weeklyMenu.map((menu, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{menu.day}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{menu.breakfast}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{menu.lunch}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{menu.dinner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
