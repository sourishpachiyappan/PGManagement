import React from 'react';
import { ManagerUser, SuperAdminUser } from '../../types/user';
import { CreditCard, Phone, User, UserCircle } from 'lucide-react';

interface CommonAdminSignUpFieldsProps {
  formData: Partial<ManagerUser | SuperAdminUser>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CommonAdminSignUpFields = ({ formData, onFormChange }: CommonAdminSignUpFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            id="name"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={formData.name || ''}
            onChange={onFormChange}
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="aadhar_no">
          Aadhar Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            id="aadhar_no"
            maxLength={12}
            value={formData.aadhar_no || ""}     // <-- required to control the input
            onChange={(e) => {
              const value = e.target.value;

              if (/^[0-9]*$/.test(value)) {      // only digits allowed
                onFormChange(e);                 // update state
              }
              // if not a number → do nothing → input won’t change
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 
             rounded-lg focus:ring-2 focus:ring-blue-500 
             focus:border-transparent transition-all"
            placeholder="XXXX-XXXX-XXXX"
            required
          />

        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="mobile_no">
          Mobile Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            id="mobile_no"
            maxLength={10}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={formData.mobile_no || ''}
            onChange={(e) => {
              const value = e.target.value;

              if (/^[0-9]*$/.test(value)) {      // only digits allowed
                onFormChange(e);                 // update state
              }
              // if not a number → do nothing → input won’t change
            }}
            placeholder="+91 XXXXX-XXXXX"
            required
          />
        </div>
      </div>

      {/* <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="profile_pic">
          Profile Picture URL <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <div className="relative">
          <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            id="profile_pic"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={formData.profile_pic || ''}
            onChange={onFormChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div> */}
    </div>
  );
};

export default CommonAdminSignUpFields;