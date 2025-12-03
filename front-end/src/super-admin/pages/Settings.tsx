import { IndianRupee, Shield, Bell } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage system configuration and preferences</p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <IndianRupee className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Pricing Plans</h2>
              <p className="text-sm text-gray-500 mt-1">Configure subscription pricing and features</p>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Plan</h3>
                    <span className="text-2xl font-bold text-gray-900">₹999</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">For small PG owners</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>• Up to 50 tenants</li>
                    <li>• Basic reporting</li>
                    <li>• Email support</li>
                  </ul>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Edit Plan
                  </button>
                </div>

                <div className="border-2 border-teal-500 rounded-xl p-6 relative">
                  <div className="absolute -top-3 left-6">
                    <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pro Plan</h3>
                    <span className="text-2xl font-bold text-gray-900">₹2,999</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">For growing businesses</p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>• Unlimited tenants</li>
                    <li>• Advanced analytics</li>
                    <li>• Priority support</li>
                    <li>• Custom branding</li>
                  </ul>
                  <button className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                    Edit Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">User Permissions</h2>
              <p className="text-sm text-gray-500 mt-1">Control access levels and roles</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Manager Access</p>
                    <p className="text-sm text-gray-500">Can view and manage assigned PGs</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Financial Reports</p>
                    <p className="text-sm text-gray-500">Access to revenue and payment data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Tenant Data Export</p>
                    <p className="text-sm text-gray-500">Allow exporting tenant information</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">System Notifications</h2>
              <p className="text-sm text-gray-500 mt-1">Configure alert preferences</p>

              <div className="mt-6 space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Payment Overdue Alerts</p>
                    <p className="text-sm text-gray-500">Notify when rent payments are overdue</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Subscription Expiry</p>
                    <p className="text-sm text-gray-500">Alert 7 days before subscription renewal</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Low Occupancy Warnings</p>
                    <p className="text-sm text-gray-500">Notify when occupancy drops below 70%</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Weekly Summary Reports</p>
                    <p className="text-sm text-gray-500">Send weekly performance summaries via email</p>
                  </div>
                </label>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                  Save All Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
