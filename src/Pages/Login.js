import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../Components/AuthLayout';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // TODO: Replace this with real login logic
  };

  const welcomeContent = (
    <motion.div
     className="text-center lg:text-left lg:pl-8"  // <-- Added 'lg:pl-8'
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
      >
      <div className="flex items-center justify-center lg:justify-start mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white ml-3 font-poppins">Break The Bill</h1>
      </div>
      <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4 font-poppins">Welcome Back!</h2>
      <p className="text-gray-400 text-lg leading-relaxed font-poppins">
        Ready to split expenses with your friends? Sign in to your account and continue managing your group expenses effortlessly.
      </p>
      <div className="mt-8 hidden lg:block">
        <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-green-700 shadow-inner backdrop-blur">
          <p className="text-green-400 text-sm font-medium mb-2">💡 Smart Tip</p>
          <p className="text-gray-300 text-sm">The best way to manage group expenses is to track them in real-time. Never worry about who owes what again!</p>
        </div>
      </div>
    </motion.div>
  );

  const formContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2 font-poppins">Sign In</h3>
        <p className="text-gray-400 font-poppins"> Access your expense tracking dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className={`w-5 h-5 ${focusedField === 'email' ? 'text-green-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-700 rounded-xl text-white placeholder-gray-500 font-poppins focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-200 backdrop-blur shadow-md"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`w-5 h-5 ${focusedField === 'password' ? 'text-green-400' : 'text-gray-500'}`} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-12 py-3 bg-black/50 border border-green-700 rounded-xl text-white placeholder-gray-500 font-poppins focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-200 backdrop-blur shadow-md"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-400 hover:text-green-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-400">
            <input type="checkbox" className="w-4 h-4 text-green-500 bg-black border-green-600 rounded" />
            <span className="ml-2">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-green-400 hover:text-green-300">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-green-500/20 font-poppins"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-green-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-green-400 font-poppins">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-green-700 rounded-xl bg-black/50 text-green-300 hover:bg-black/70 font-poppins focus:ring-2 focus:ring-green-500 transition shadow-md"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-green-700 rounded-xl bg-black/50 text-green-300 hover:bg-black/70 font-poppins focus:ring-2 focus:ring-green-500 transition shadow-md"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-400 font-poppins">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center font-poppins">
      <div className="w-full max-w-[2000px] px-4 py-10">
        <AuthLayout welcomeContent={welcomeContent} formContent={formContent} />
      </div>
    </div>
  );
};

export default Login;
