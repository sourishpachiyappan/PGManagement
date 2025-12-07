import React, { useState, useEffect } from 'react';
import { TenantUser, ManagerUser, SuperAdminUser } from './types/user';
import { signup, login } from './api/services';
import TenantSignUpForm from './auth/components/TenantSignUpForm';
import ManagerSignUpForm from './auth/components/ManagerSignUpForm';
import SuperAdminSignUpForm from './auth/components/SuperAdminSignUpForm';
import { Eye, EyeOff } from 'lucide-react';

interface AuthPageProps {
  onLogin: (userType: 'manager' | 'tenant' | 'super-admin') => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // false means initially login mode
  const [userType, setUserType] = useState<'manager' | 'tenant' | 'super-admin'>('manager');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    id: '',
    name: '',
    aadhar_no: '',
    mobile_no: '',
  };

  const initialSuperAdminFormData: Omit<SuperAdminUser, 'email' | 'password'> = {
    id: '',
    name: '',
    aadhar_no: '',
    mobile_no: '',
  };

  const [signUpFormData, setSignUpFormData] = useState<
    Partial<TenantUser & ManagerUser & SuperAdminUser>
  >(initialManagerFormData);

  useEffect(() => {
    if (isSignUp) { // If currently in SIGN UP mode, load appropriate form data
      if (userType === 'tenant') {
        setSignUpFormData(initialTenantFormData);
      } else if (userType === 'manager') {
        setSignUpFormData(initialManagerFormData);
      } else if (userType === 'super-admin') {
        setSignUpFormData(initialSuperAdminFormData);
      }
    } else { // If currently in LOGIN mode, clear form data
      setSignUpFormData({});
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
    setError('');

    try {
      if (isSignUp) { // Corrected condition: call signup if isSignUp is true
        const fullSignUpData = { ...signUpFormData, email, password, userType };
        console.log(`Attempting signup for ${userType}:`, fullSignUpData);
        const response = await signup(fullSignUpData);
        console.log(response.data.message);
        onLogin(userType);
      } else { // Call login if isSignUp is false
        console.log(`Attempting login for ${email} as ${userType}`);
        const response = await login({
          email,
          password,
          userType,
        });
        console.log(response);
        onLogin(userType);
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-1 text-center text-gray-900">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          {isSignUp ? "Fill in your details to continue" : "Login to your dashboard"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* User Type */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Select User Type
            </label>

            <div className="grid grid-cols-3 gap-3">
              {/* Manager */}
              <button
                type="button"
                onClick={() => setUserType("manager")}
                className={`py-2.5 rounded-lg border text-sm font-medium transition ${userType === "manager"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                Manager
              </button>

              {/* Tenant */}
              <button
                type="button"
                onClick={() => setUserType("tenant")}
                className={`py-2.5 rounded-lg border text-sm font-medium transition ${userType === "tenant"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                Tenant
              </button>

              {/* Super Admin */}
              <button
                type="button"
                onClick={() => setUserType("super-admin")}
                className={`py-2.5 rounded-lg border text-sm font-medium transition ${userType === "super-admin"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 border border-gray-300 
               focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div
              className="absolute inset-y-0 right-4 flex items-center justify-center cursor-pointer 
               text-gray-500 hover:text-gray-700 transition-opacity hover:opacity-80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </div>
          </div>

          {/* Dynamic Sign-up Forms */}
          {isSignUp && userType === "tenant" && (
            <TenantSignUpForm
              formData={signUpFormData as Partial<TenantUser>}
              onFormChange={handleSignUpFormChange}
            />
          )}
          {isSignUp && userType === "manager" && (
            <ManagerSignUpForm
              formData={signUpFormData as Partial<ManagerUser>}
              onFormChange={handleSignUpFormChange}
            />
          )}
          {isSignUp && userType === "super-admin" && (
            <SuperAdminSignUpForm
              formData={signUpFormData as Partial<SuperAdminUser>}
              onFormChange={handleSignUpFormChange}
            />
          )}

          {/* Buttons */}
          <div className="flex flex-col space-y-3 mt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow-md"
            >
              {isSignUp ? "Create Account" : "Login"}
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full py-2 text-blue-600 text-sm font-medium hover:underline transition"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}
      </div>
    </div>

  );
};

export default AuthPage;
