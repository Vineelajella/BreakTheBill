import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, DollarSign } from 'lucide-react';
import AuthLayout from '../Components/AuthLayout';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebaseconfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(null); // Track which provider is loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

const handleGoogleSignIn = async () => {
  if (loadingProvider) return;
  setLoadingProvider('google');

  try {
    // Ensure popup is not pending from another request
    await signInWithPopup(auth, googleProvider);
    navigate('/home');
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (redirectError) {
        alert(redirectError.message);
      }
    } else if (error.code === 'auth/cancelled-popup-request') {
      // Ignore silently — Firebase cancels previous popup automatically
      console.warn('Cancelled previous popup request');
    } else {
      alert(error.message);
    }
  } finally {
    setTimeout(() => setLoadingProvider(null), 500); // Slight delay helps with stability
  }
};

const handleGithubSignIn = async () => {
  if (loadingProvider) return;
  setLoadingProvider('github');

  try {
    await signInWithPopup(auth, githubProvider);
    navigate('/home');
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      try {
        await signInWithRedirect(auth, githubProvider);
      } catch (redirectError) {
        alert(redirectError.message);
      }
    } else if (error.code === 'auth/cancelled-popup-request') {
      console.warn('Cancelled previous popup request');
    } else {
      alert(error.message);
    }
  } finally {
    setTimeout(() => setLoadingProvider(null), 500);
  }
};

  const welcomeContent = (
    <div className="text-center lg:text-left animate-fade-in">
      <div className="flex items-center justify-center lg:justify-start mb-6">
        <div className="bg-primary-500 p-3 rounded-2xl animate-float">
          <DollarSign className="w-8 h-8 text-dark-900" />
        </div>
        <h1 className="text-3xl font-bold text-white ml-3">Break The Bill</h1>
      </div>
      <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">Welcome Back!</h2>
      <p className="text-dark-100 text-lg leading-relaxed">
        Ready to split expenses with your friends? Sign in to your account and continue managing your group expenses effortlessly.
      </p>
      <div className="mt-8 hidden lg:block">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-600">
          <p className="text-primary-400 text-sm font-medium mb-2">💡 Smart Tip</p>
          <p className="text-dark-200 text-sm">
            "The best way to manage group expenses is to track them in real-time. Never worry about who owes what again!"
          </p>
        </div>
      </div>
    </div>
  );

  const formContent = (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">Sign In</h3>
        <p className="text-dark-200">Access your expense tracking dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className={`w-5 h-5 ${focusedField === 'email' ? 'text-primary-500' : 'text-dark-400'}`} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Enter your email"
            required
          />
          <label className={`absolute left-10 transition-all duration-200 pointer-events-none ${
            formData.email || focusedField === 'email'
              ? '-top-2 text-xs text-primary-500 bg-dark-900 px-2'
              : 'top-3 text-dark-400'
          }`}>
            {formData.email || focusedField === 'email' ? 'Email Address' : ''}
          </label>
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`w-5 h-5 ${focusedField === 'password' ? 'text-primary-500' : 'text-dark-400'}`} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-10 pr-12 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <label className={`absolute left-10 transition-all duration-200 pointer-events-none ${
            formData.password || focusedField === 'password'
              ? '-top-2 text-xs text-primary-500 bg-dark-900 px-2'
              : 'top-3 text-dark-400'
          }`}>
            {formData.password || focusedField === 'password' ? 'Password' : ''}
          </label>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-600 rounded" />
            <span className="ml-2 text-sm text-dark-200">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-400">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-dark-900 font-semibold py-3 px-6 rounded-xl hover:from-primary-400 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-900 text-dark-400">Or continue with</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loadingProvider !== null}
            className={`flex items-center justify-center px-4 py-3 border border-dark-600 rounded-xl ${
              loadingProvider === 'google' ? 'bg-dark-700 text-dark-500 cursor-not-allowed' : 'bg-dark-800 text-dark-200 hover:bg-dark-700'
            }`}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={loadingProvider !== null}
            className={`flex items-center justify-center px-4 py-3 border border-dark-600 rounded-xl ${
              loadingProvider === 'github' ? 'bg-dark-700 text-dark-500 cursor-not-allowed' : 'bg-dark-800 text-dark-200 hover:bg-dark-700'
            }`}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>

        {/* Signup Prompt */}
        <p className="text-center text-dark-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-500 hover:text-primary-400 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );

  return <AuthLayout welcomeContent={welcomeContent} formContent={formContent} />;
};

export default Login;
