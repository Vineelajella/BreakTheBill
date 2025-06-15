import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Github, Chrome, DollarSign, CheckCircle } from 'lucide-react';
import AuthLayout from '../Components/AuthLayout';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('SignUp submitted:', formData);
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const welcomeContent = (
    <div className="text-center lg:text-left animate-fade-in">
      <div className="flex items-center justify-center lg:justify-start mb-6">
        <div className="bg-primary-500 p-3 rounded-2xl animate-float">
          <DollarSign className="w-8 h-8 text-dark-900" />
        </div>
        <h1 className="text-3xl font-bold text-white ml-3">Break The Bill</h1>
      </div>
      <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
        Join The Smart Way
      </h2>
      <p className="text-dark-100 text-lg leading-relaxed mb-6">
        Split expenses effortlessly with friends, track group spending, and never worry about who owes what again.
      </p>

      <div className="space-y-4 hidden lg:block">
        {[
          'Real-time expense tracking',
          'Smart bill splitting algorithms',
          'Group collaboration features',
          'Detailed spending analytics'
        ].map((text, index) => (
          <div key={index} className="flex items-center text-dark-200">
            <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const formContent = (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">Create Account</h3>
        <p className="text-dark-200">Start managing expenses with your group</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'name' ? 'text-primary-500' : 'text-dark-400'}`} />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
            placeholder="Enter your full name"
            required
          />
          <label className={`absolute left-10 transition-all duration-200 pointer-events-none ${formData.name || focusedField === 'name' ? '-top-2 text-xs text-primary-500 bg-dark-900 px-2' : 'top-3 text-dark-400'}`}>
            {formData.name || focusedField === 'name' ? 'Full Name' : ''}
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-primary-500' : 'text-dark-400'}`} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
            placeholder="Enter your email"
            required
          />
          <label className={`absolute left-10 transition-all duration-200 pointer-events-none ${formData.email || focusedField === 'email' ? '-top-2 text-xs text-primary-500 bg-dark-900 px-2' : 'top-3 text-dark-400'}`}>
            {formData.email || focusedField === 'email' ? 'Email Address' : ''}
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-primary-500' : 'text-dark-400'}`} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-12 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <label className={`absolute left-10 transition-all duration-200 pointer-events-none ${formData.password || focusedField === 'password' ? '-top-2 text-xs text-primary-500 bg-dark-900 px-2' : 'top-3 text-dark-400'}`}>
            {formData.password || focusedField === 'password' ? 'Password' : ''}
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'confirmPassword' ? 'text-primary-500' : 'text-dark-400'}`} />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
            className={`w-full pl-10 pr-12 py-3 bg-dark-800 border rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-1 transition-all duration-200 ${
              formData.confirmPassword && !passwordsMatch
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : formData.confirmPassword && passwordsMatch
                ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500'
                : 'border-dark-600 focus:border-primary-500 focus:ring-primary-500'
            }`}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500 transition-colors duration-200"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <label className={`absolute left-10 transition-all duration-200 pointer-events-none ${
            formData.confirmPassword || focusedField === 'confirmPassword'
              ? '-top-2 text-xs bg-dark-900 px-2'
              : 'top-3 text-dark-400'
          } ${
            formData.confirmPassword && !passwordsMatch
              ? 'text-red-500'
              : formData.confirmPassword && passwordsMatch
              ? 'text-primary-500'
              : focusedField === 'confirmPassword'
              ? 'text-primary-500'
              : 'text-dark-400'
          }`}>
            {formData.confirmPassword || focusedField === 'confirmPassword' ? 'Confirm Password' : ''}
          </label>
          {formData.confirmPassword && passwordsMatch && (
            <CheckCircle className="absolute right-10 top-3 w-5 h-5 text-primary-500" />
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-600 rounded focus:ring-primary-500 focus:ring-2"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-dark-200">
            I agree to the{' '}
            <Link to="/terms" className="text-primary-500 hover:text-primary-400 transition-colors duration-200">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-500 hover:text-primary-400 transition-colors duration-200">Privacy Policy</Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-dark-900 font-semibold py-3 px-6 rounded-xl hover:from-primary-400 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-primary-500/25"
        >
          Create Account
        </button>

        {/* Or Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-900 text-dark-400">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-dark-200 hover:bg-dark-700 hover:border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200">
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </button>
          <button type="button" className="flex items-center justify-center px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-dark-200 hover:bg-dark-700 hover:border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200">
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>

        {/* Already have account */}
        <p className="text-center text-dark-300">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );

  return (
    <AuthLayout welcomeContent={welcomeContent} formContent={formContent} />
  );
};

export default SignUp;
