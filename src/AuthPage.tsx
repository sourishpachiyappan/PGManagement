import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (userType: 'manager' | 'tenant') => void;
  onGoToLanding: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onGoToLanding }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'manager' | 'tenant'>('manager');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    console.log(`Attempting ${isSignUp ? 'signup' : 'login'} for ${username} as ${userType}`);
    onLogin(userType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            </div>
          </div>
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
