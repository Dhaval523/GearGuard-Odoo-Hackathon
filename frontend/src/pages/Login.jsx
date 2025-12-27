// pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Password validation
    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Login successful! Redirecting to dashboard...');
      setIsLoading(false);
      // In real app, you would redirect to dashboard
      // navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      admin: { email: 'admin@gearguard.com', password: 'Admin@123' },
      technician: { email: 'tech@gearguard.com', password: 'Tech@123' },
      manager: { email: 'manager@gearguard.com', password: 'Manager@123' },
      user: { email: 'user@gearguard.com', password: 'User@123' },
    };
    
    setFormData(demoCredentials[role]);
    toast.success(`Demo ${role} credentials loaded`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#0D0D0D] mb-2">
          <span className="text-[#3B82F6]">Gear</span>Guard
        </h1>
        <p className="text-[#BFBFBF] text-lg">The Ultimate Maintenance Tracker</p>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6 text-center">Sign In to Your Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#0D0D0D] text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#BFBFBF]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[#0D0D0D] text-sm font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-[#3B82F6] hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#BFBFBF]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#BFBFBF] hover:text-[#0D0D0D]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#BFBFBF] hover:text-[#0D0D0D]" />
                  )}
                </button>
              </div>
            </div>

            

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3B82F6] text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-[#BFBFBF] text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#3B82F6] hover:text-blue-700 font-semibold">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;