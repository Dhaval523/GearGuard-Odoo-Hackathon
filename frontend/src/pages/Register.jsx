// pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { 
  Mail, Lock, User, Building, Eye, EyeOff, 
  Check, X, ArrowLeft, Users, Briefcase,
  Shield, Wrench, Server, ToolCase, Zap,
  AlertCircle, Info
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    department: '',
    team: '', // Only for technicians
    specialization: '', // Only for technicians
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Available teams for technicians
  const technicianTeams = [
    { id: 1, name: 'Mechanics Team', icon: <Wrench className="h-4 w-4" />, color: 'text-orange-600' },
    { id: 2, name: 'Electricians Team', icon: <Zap className="h-4 w-4" />, color: 'text-yellow-600' },
    { id: 3, name: 'IT Support Team', icon: <Server className="h-4 w-4" />, color: 'text-blue-600' },
    { id: 4, name: 'Production Support', icon: <Briefcase className="h-4 w-4" />, color: 'text-green-600' },
    { id: 5, name: 'Facilities Team', icon: <Building className="h-4 w-4" />, color: 'text-purple-600' },
  ];

  // Specializations based on team
  const specializations = {
    'Mechanics Team': ['CNC Machine Specialist', 'Hydraulic Systems', 'Pneumatic Systems', 'General Mechanic'],
    'Electricians Team': ['Electrical Panel', 'Wiring Specialist', 'Control Systems', 'Power Distribution'],
    'IT Support Team': ['Hardware Support', 'Network Specialist', 'Software Support', 'Security Specialist'],
    'Production Support': ['Assembly Line', 'Quality Control', 'Machine Operation', 'Safety Officer'],
    'Facilities Team': ['HVAC Specialist', 'Plumbing', 'Structural Maintenance', 'General Maintenance'],
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidation(validations);
    return Object.values(validations).every(Boolean);
  };

  const handlePasswordChange = (password) => {
    validatePassword(password);
    setFormData({ ...formData, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!formData.password) {
      toast.error('Please enter a password');
      return;
    }
    
    if (!validatePassword(formData.password)) {
      toast.error('Password does not meet all requirements');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    // Additional validation for technicians
    if (formData.role === 'technician') {
      if (!formData.team) {
        toast.error('Please select a team for the technician');
        return;
      }
      if (!formData.specialization) {
        toast.error('Please select a specialization');
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        ...formData,
        createdAt: new Date().toISOString(),
        isVerified: false,
      };
      
      toast.success('Registration successful! Please check your email for verification.');
      console.log('User registered:', userData);
      setIsLoading(false);
      
      // Redirect to login page
      navigate('/login');
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    
    // If team changes and user is technician, reset specialization
    if (name === 'team' && formData.role === 'technician') {
      updatedData.specialization = '';
    }
    
    if (name === 'password') {
      handlePasswordChange(value);
    } else {
      setFormData(updatedData);
    }
  };

  const ValidationItem = ({ valid, text }) => (
    <div className="flex items-center space-x-2">
      {valid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={`text-sm ${valid ? 'text-green-600' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="w-full max-w-md mb-4">
        <Link
          to="/login"
          className="inline-flex items-center text-[#3B82F6] hover:text-blue-700 font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>
      </div>

      {/* Logo/Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D0D0D] mb-2">
          <span className="text-[#3B82F6]">Gear</span>Guard
        </h1>
        <p className="text-[#BFBFBF]">Create Your Account</p>
      </div>

      {/* Register Form Container */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-6 text-center">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <User className="h-5 w-5 text-[#3B82F6]" />
                <h3 className="text-sm font-semibold text-[#0D0D0D]">Personal Information</h3>
              </div>
              
              <div>
                <label className="block text-[#0D0D0D] text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#0D0D0D] text-sm font-medium mb-1">
                  Email Address *
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#0D0D0D] text-sm font-medium mb-1">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-[#BFBFBF]" />
                  </div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all appearance-none bg-white"
                  >
                    <option value="">Select Department (Optional)</option>
                    <option value="production">Production</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="it">IT Support</option>
                    <option value="electrical">Electrical</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="quality">Quality Assurance</option>
                    <option value="facilities">Facilities</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Role Selection Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-[#3B82F6]" />
                <h3 className="text-sm font-semibold text-[#0D0D0D]">Select Your Role *</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'manager', label: 'Manager', icon: <Briefcase className="h-4 w-4" />, color: 'bg-blue-100 border-blue-200 text-blue-700' },
                  { value: 'technician', label: 'Technician', icon: <Wrench className="h-4 w-4" />, color: 'bg-orange-100 border-orange-200 text-orange-700' },
                  { value: 'emplotee', label: 'Employee', icon: <User className="h-4 w-4" />, color: 'bg-gray-100 border-gray-200 text-gray-700' }
                ].map((role) => (
                  <label
                    key={role.value}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.role === role.value
                        ? 'ring-2 ring-[#3B82F6] ' + role.color
                        : 'border-gray-200 hover:bg-gray-50 text-[#0D0D0D]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <span className="mr-3">{role.icon}</span>
                    <span className="font-medium">{role.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Technician Team Assignment - Only shown when role is technician */}
            {formData.role === 'technician' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#3B82F6]" />
                    <h3 className="text-sm font-semibold text-[#0D0D0D]">Technician Details *</h3>
                  </div>
                  <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    Required
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#0D0D0D] text-sm font-medium mb-2">
                        Maintenance Team *
                      </label>
                      <div className="space-y-2">
                        {technicianTeams.map((team) => (
                          <label
                            key={team.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                              formData.team === team.name
                                ? 'border-[#3B82F6] bg-blue-100 ring-2 ring-blue-100'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="team"
                              value={team.name}
                              checked={formData.team === team.name}
                              onChange={handleChange}
                              className="sr-only"
                              required
                            />
                            <span className={`mr-3 ${team.color}`}>{team.icon}</span>
                            <span className="font-medium text-[#0D0D0D]">{team.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#0D0D0D] text-sm font-medium mb-2">
                        Specialization *
                      </label>
                      {formData.team ? (
                        <div className="space-y-2">
                          {specializations[formData.team]?.map((spec, index) => (
                            <label
                              key={index}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                formData.specialization === spec
                                  ? 'border-[#3B82F6] bg-blue-100 ring-2 ring-blue-100'
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="specialization"
                                value={spec}
                                checked={formData.specialization === spec}
                                onChange={handleChange}
                                className="sr-only"
                                required
                              />
                              <span className="font-medium text-[#0D0D0D]">{spec}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                          <Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Select a team first to see available specializations</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-100 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      Technicians will automatically receive maintenance requests assigned to their team. Each team specializes in specific equipment types.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Password Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-[#3B82F6]" />
                <h3 className="text-sm font-semibold text-[#0D0D0D]">Security</h3>
              </div>
              
              <div>
                <label className="block text-[#0D0D0D] text-sm font-medium mb-1">
                  Password *
                </label>
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
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#0D0D0D]" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-[#0D0D0D]" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#0D0D0D] text-sm font-medium mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#BFBFBF]" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-300'
                        : 'border-gray-200'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#0D0D0D]" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-[#0D0D0D]" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <X className="h-4 w-4 mr-1" /> Passwords do not match
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-[#0D0D0D] mb-3">Password Requirements</p>
                <div className="space-y-2">
                  <ValidationItem valid={passwordValidation.length} text="At least 8 characters" />
                  <ValidationItem valid={passwordValidation.uppercase} text="One uppercase letter" />
                  <ValidationItem valid={passwordValidation.lowercase} text="One lowercase letter" />
                  <ValidationItem valid={passwordValidation.number} text="One number (0-9)" />
                  <ValidationItem valid={passwordValidation.special} text="One special character" />
                </div>
              </div>
            </div>

           
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-[#BFBFBF] text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3B82F6] hover:text-blue-700 font-semibold">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;