import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Plus, X } from 'lucide-react';

type ComplaintStatus = 'pending' | 'resolved' | 'in-progress';

interface Complaint {
  id: number;
  issue: string;
  status: ComplaintStatus;
  date: string;
}

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, issue: 'Wi-Fi not working', status: 'pending', date: '15 Oct 2024' },
    { id: 2, issue: 'Fan noise issue', status: 'resolved', date: '10 Oct 2024' },
    { id: 3, issue: 'Water supply delay', status: 'in-progress', date: '18 Oct 2024' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComplaint.trim()) {
      const complaint: Complaint = {
        id: complaints.length + 1,
        issue: newComplaint,
        status: 'pending',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      setComplaints([complaint, ...complaints]);
      setNewComplaint('');
      setShowForm(false);
    }
  };

  const getStatusConfig = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          icon: Clock,
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          iconColor: 'text-amber-600',
        };
      case 'resolved':
        return {
          label: 'Resolved',
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: AlertCircle,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-600',
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My Complaints</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
        >
          {showForm ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Raise Complaint
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Complaint</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newComplaint}
              onChange={(e) => setNewComplaint(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              rows={4}
              required
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewComplaint('');
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {complaints.map((complaint) => {
            const statusConfig = getStatusConfig(complaint.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={complaint.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{complaint.issue}</h3>
                    <p className="text-sm text-gray-500">{complaint.date}</p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                    <span className="text-sm font-medium">{statusConfig.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
