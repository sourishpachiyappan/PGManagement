import { Coffee, Sun, Moon } from 'lucide-react';

export default function Menu() {
  const todaysMenu = [
    {
      meal: 'Breakfast',
      time: '8:00 AM - 10:00 AM',
      items: 'Poha & Tea',
      icon: Coffee,
      color: 'amber',
    },
    {
      meal: 'Lunch',
      time: '12:30 PM - 2:30 PM',
      items: 'Dal, Rice, Roti, Paneer Butter Masala',
      icon: Sun,
      color: 'orange',
    },
    {
      meal: 'Dinner',
      time: '7:30 PM - 9:30 PM',
      items: 'Veg Biryani & Curd',
      icon: Moon,
      color: 'blue',
    },
  ];

  const weeklyMenu = [
    { day: 'Monday', breakfast: 'Poha & Tea', lunch: 'Dal, Rice, Chapati, Mix Veg', dinner: 'Rajma Rice & Salad' },
    { day: 'Tuesday', breakfast: 'Upma & Coffee', lunch: 'Sambar, Rice, Roti, Aloo Gobi', dinner: 'Veg Pulao & Raita' },
    { day: 'Wednesday', breakfast: 'Paratha & Curd', lunch: 'Dal, Rice, Roti, Paneer Butter Masala', dinner: 'Veg Biryani & Curd' },
    { day: 'Thursday', breakfast: 'Idli & Sambhar', lunch: 'Chole, Rice, Chapati, Cabbage', dinner: 'Dal Khichdi & Pickle' },
    { day: 'Friday', breakfast: 'Aloo Puri & Chai', lunch: 'Kadhi, Rice, Roti, Bhindi Fry', dinner: 'Paneer Pulao & Salad' },
    { day: 'Saturday', breakfast: 'Sandwich & Tea', lunch: 'Dal, Rice, Chapati, Matar Paneer', dinner: 'Fried Rice & Manchurian' },
    { day: 'Sunday', breakfast: 'Dosa & Chutney', lunch: 'Special Thali', dinner: 'Veg Noodles & Soup' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todaysMenu.map((meal) => {
            const Icon = meal.icon;
            const colorClasses = {
              amber: 'bg-amber-100 text-amber-600',
              orange: 'bg-orange-100 text-orange-600',
              blue: 'bg-blue-100 text-blue-600',
            }[meal.color];

            return (
              <div key={meal.meal} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${colorClasses} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{meal.meal}</h3>
                    <p className="text-xs text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{meal.items}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Menu</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Day</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Breakfast</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Lunch</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {weeklyMenu.map((day, index) => (
                <tr key={day.day} className={index !== weeklyMenu.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-3 px-4 font-medium text-gray-900 text-sm">{day.day}</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">{day.breakfast}</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">{day.lunch}</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">{day.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
