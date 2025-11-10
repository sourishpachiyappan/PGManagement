import { CheckCircle, Clock, IndianRupee, Calendar } from 'lucide-react';

export default function PaymentStatus() {
  const paymentHistory = [
    { month: 'August 2024', status: 'paid', amount: 10000, date: '25 Aug 2024' },
    { month: 'September 2024', status: 'paid', amount: 10000, date: '25 Sep 2024' },
    { month: 'October 2024', status: 'pending', amount: 10000, date: '25 Oct 2024' },
  ];

  const totalDue = paymentHistory
    .filter((payment) => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-sm p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <p className="text-red-100 text-sm font-medium">Total Due</p>
          </div>
          <p className="text-3xl font-bold">₹{totalDue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Next Payment Date</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">25 Oct</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment History</h2>
        <div className="space-y-4">
          {paymentHistory.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    payment.status === 'paid' ? 'bg-green-100' : 'bg-amber-100'
                  }`}
                >
                  {payment.status === 'paid' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{payment.month}</h3>
                  <p className="text-sm text-gray-500">Due: {payment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {payment.status === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalDue > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Pay Your Rent</h3>
              <p className="text-sm text-gray-500">Complete your payment before the due date</p>
            </div>
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
