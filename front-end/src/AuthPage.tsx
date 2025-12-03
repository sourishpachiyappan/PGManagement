import React, { useState, useEffect } from 'react';
import { TenantUser, ManagerUser, SuperAdminUser } from './types/user';
import { signup, login, setWithExpiry, getWithExpiry } from './api/services';

interface AuthPageProps {
  onLogin: (userType: 'manager' | 'tenant' | 'super-admin') => void;
  onGoToLanding: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onGoToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'manager' | 'tenant' | 'super-admin'>('manager');
  const [error, setError] = useState('');

  // Initial state for sign-up form data
  const initialTenantFormData: Omit<TenantUser, 'email' | 'password'> = {
    name: '',
    dob: '',
    gender: 'male',
    age: 0,
    address: '',
    mobile_no: '',
    aadhar_no: '',
    type: 'student',
    joining_date: '',
    college_or_company_name: '',
    college_or_company_address: '',
    guardian_name: '',
    guardian_mobile: '',
    room_type: 'single',
    advance: 0,
    rent: 0,
  };

  const initialManagerFormData: Omit<ManagerUser, 'email' | 'password'> = {
    id: '', // Manager ID might be auto-generated or handled differently
    name: '',
    aadhar_no: '',
    mobile_no: '',
  };

  const initialSuperAdminFormData: Omit<SuperAdminUser, 'email' | 'password'> = {
    id: '', // Super Admin ID might be auto-generated or handled differently
    name: '',
    aadhar_no: '',
    mobile_no: '',
  };

  const [signUpFormData, setSignUpFormData] = useState<
    Partial<TenantUser & ManagerUser & SuperAdminUser>
  >(initialManagerFormData); // Initialize with manager as default

  useEffect(() => {
    if (isSignUp) {
      if (userType === 'tenant') {
        setSignUpFormData(initialTenantFormData);
      } else if (userType === 'manager') {
        setSignUpFormData(initialManagerFormData);
      } else if (userType === 'super-admin') {
        setSignUpFormData(initialSuperAdminFormData);
      }
    } else {
      setSignUpFormData({}); // Clear form data when switching to login
    }
    setError(''); // Clear error on form type/user type change
  }, [isSignUp, userType]);

  const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let newValue: string | number | boolean = value;

    if (e.target instanceof HTMLInputElement) {
      if (e.target.type === 'number') {
        newValue = parseFloat(value);
      } else if (e.target.type === 'checkbox') {
        newValue = e.target.checked;
      }
    }

    setSignUpFormData((prevData: Partial<TenantUser & ManagerUser & SuperAdminUser>) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      if (isSignUp) {
        const fullSignUpData = { ...signUpFormData, email, password, userType };
        console.log(`Attempting signup for ${userType}:`, fullSignUpData);
        const response = await signup(fullSignUpData);
        console.log(response.data.message);
        setWithExpiry('user', response.data.user, 24 * 60 * 60 * 1000); // 1 day
        setWithExpiry('token', response.data.token, 24 * 60 * 60 * 1000); // 1 day
        onLogin(userType);
      } else {
        console.log(`Attempting login for ${email} as ${userType}`);
        const response = await login({
          email,
          password,
          userType,
        });
        console.log(response.data.message);
        setWithExpiry('user', response.data.user, 24 * 60 * 60 * 1000); // 1 day
        setWithExpiry('token', response.data.token, 24 * 60 * 60 * 1000); // 1 day
        onLogin(userType);
      }
    } catch (err: any) {
      console.error('Authentication error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  const renderTenantSignUpFields = () => (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).name || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).dob || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
          Gender
        </label>
        <select
          id="gender"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).gender || 'male'}
          onChange={handleSignUpFormChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          id="age"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).age || 0}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).address || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile_no">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile_no"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).mobile_no || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhar_no">
          Aadhar Number
        </label>
        <input
          type="text"
          id="aadhar_no"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).aadhar_no || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
          Student / Professional
        </label>
        <select
          id="type"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).type || 'student'}
          onChange={handleSignUpFormChange}
          required
        >
          <option value="student">Student</option>
          <option value="professional">Professional</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_pic">
          Profile Picture URL (Optional)
        </label>
        <input
          type="text"
          id="profile_pic"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).profile_pic || ''}
          onChange={handleSignUpFormChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="joining_date">
          Joining Date
        </label>
        <input
          type="date"
          id="joining_date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).joining_date || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaving_date">
          Leaving Date (Optional)
        </label>
        <input
          type="date"
          id="leaving_date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).leaving_date || ''}
          onChange={handleSignUpFormChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="college_or_company_name">
          College or Company Name
        </label>
        <input
          type="text"
          id="college_or_company_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).college_or_company_name || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="college_or_company_address">
          College or Company Address
        </label>
        <input
          type="text"
          id="college_or_company_address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).college_or_company_address || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardian_name">
          Guardian Name
        </label>
        <input
          type="text"
          id="guardian_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).guardian_name || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardian_mobile">
          Guardian Mobile
        </label>
        <input
          type="text"
          id="guardian_mobile"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).guardian_mobile || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room_type">
          Room Type
        </label>
        <select
          id="room_type"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).room_type || 'single'}
          onChange={handleSignUpFormChange}
          required
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="advance">
          Advance
        </label>
        <input
          type="number"
          id="advance"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).advance || 0}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rent">
          Rent
        </label>
        <input
          type="number"
          id="rent"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as TenantUser).rent || 0}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
    </>
  );

  const renderManagerOrSuperAdminSignUpFields = () => (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
          ID
        </label>
        <input
          type="text"
          id="id"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as ManagerUser).id || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as ManagerUser).name || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhar_no">
          Aadhar Number
        </label>
        <input
          type="text"
          id="aadhar_no"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as ManagerUser).aadhar_no || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_pic">
          Profile Picture URL (Optional)
        </label>
        <input
          type="text"
          id="profile_pic"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as ManagerUser).profile_pic || ''}
          onChange={handleSignUpFormChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile_no">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile_no"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={(signUpFormData as ManagerUser).mobile_no || ''}
          onChange={handleSignUpFormChange}
          required
        />
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Type
            </label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio"
                  name="userType"
                  value="manager"
                  checked={userType === 'manager'}
                  onChange={() => setUserType('manager')}
                />
                <span className="ml-2">Manager</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="userType"
                  value="tenant"
                  checked={userType === 'tenant'}
                  onChange={() => setUserType('tenant')}
                />
                <span className="ml-2">Tenant</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="userType"
                  value="super-admin"
                  checked={userType === 'super-admin'}
                  onChange={() => setUserType('super-admin')}
                />
                <span className="ml-2">Super Admin</span>
              </label>
            </div>
          </div>

          {isSignUp && userType === 'tenant' && renderTenantSignUpFields()}
          {isSignUp && (userType === 'manager' || userType === 'super-admin') && renderManagerOrSuperAdminSignUpFields()}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={onGoToLanding}
            className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800"
          >
            Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
