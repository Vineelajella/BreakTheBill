import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  DollarSign,
} from 'lucide-react';
import AuthLayout from '../Components/AuthLayout';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebaseconfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const storeLoginDataToBackend = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8082/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('❌ Backend error:', data.error);
      }
    } catch (error) {
      console.error('❌ Backend connection failed:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success('Login successful!');
      await storeLoginDataToBackend(formData.email, formData.password);
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      let message = 'Invalid credentials.';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        message = 'Invalid credentials.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      }
      toast.error(message, {
        icon: () => <span className="text-red-500 text-lg">❌</span>,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    if (loadingProvider) return;
    setLoadingProvider('google');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { email } = result.user;
      toast.success('Signed in with Google!');
      await storeLoginDataToBackend(email, 'google-oauth');
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          toast.error(redirectError.message);
        }
      } else {
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => setLoadingProvider(null), 500);
    }
  };

  const handleGithubSignIn = async () => {
    if (loadingProvider) return;
    setLoadingProvider('github');

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const { email } = result.user;
      toast.success('Signed in with GitHub!');
      await storeLoginDataToBackend(email, 'github-oauth');
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, githubProvider);
        } catch (redirectError) {
          toast.error(redirectError.message);
        }
      } else {
        toast.error(error.message);
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
      <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
        Welcome Back!
      </h2>
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-600 rounded" />
            <span className="ml-2 text-sm text-dark-200">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-400">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-dark-900 font-semibold py-3 px-6 rounded-xl hover:from-primary-400 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
        >
          Sign In
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-900 text-dark-400">Or continue with</span>
          </div>
        </div>

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

        <p className="text-center text-dark-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-500 hover:text-primary-400 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );

  return (
    <>
      <AuthLayout welcomeContent={welcomeContent} formContent={formContent} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Login;
