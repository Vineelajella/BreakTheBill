import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import AuthLayout from '../Components/AuthLayout';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebaseconfig';
import { toast, Toaster } from 'react-hot-toast';

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success('Account created successfully!');
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in with Google!');
       setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          toast.error(redirectError.message);
        }
      } else if (error.code !== 'auth/cancelled-popup-request') {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await signInWithPopup(auth, githubProvider);
      toast.success('Signed in with GitHub!');
     setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, githubProvider);
        } catch (redirectError) {
          toast.error(redirectError.message);
        }
      } else if (error.code !== 'auth/cancelled-popup-request') {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
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
      <Toaster position="top-center" />
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">Create Account</h3>
        <p className="text-dark-200">Start managing expenses with your group</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          icon={User}
          name="name"
          value={formData.name}
          onChange={handleChange}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          placeholder="Enter your full name"
        />
        <InputField
          icon={Mail}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          placeholder="Enter your email"
        />
        <InputField
          icon={Lock}
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          placeholder="Create a password"
          showToggle
          toggleValue={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
        <InputField
          icon={Lock}
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          placeholder="Confirm your password"
          showToggle
          toggleValue={showConfirmPassword}
          onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          showCheck={formData.confirmPassword && passwordsMatch}
          error={!passwordsMatch && formData.confirmPassword}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-600 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-dark-200">
            I agree to the{' '}
            <Link to="/terms" className="text-primary-500 hover:text-primary-400">Terms</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-500 hover:text-primary-400">Privacy Policy</Link>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            loading
              ? 'bg-primary-700 text-dark-900 opacity-60 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-primary-700 text-dark-900 hover:from-primary-400 hover:to-primary-600'
          }`}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
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
          <SocialButton
            onClick={handleGoogleSignUp}
            icon={<Chrome className="w-5 h-5 mr-2" />}
            label="Google"
            loading={loading}
          />
          <SocialButton
            onClick={handleGithubSignUp}
            icon={<Github className="w-5 h-5 mr-2" />}
            label="GitHub"
            loading={loading}
          />
        </div>

        <p className="text-center text-dark-300">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );

  return <AuthLayout welcomeContent={welcomeContent} formContent={formContent} />;
};

const InputField = ({
  icon: Icon,
  name,
  type = 'text',
  value,
  onChange,
  focusedField,
  setFocusedField,
  placeholder,
  showToggle,
  toggleValue,
  onToggle,
  showCheck,
  error
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className={`w-5 h-5 ${focusedField === name ? 'text-primary-500' : 'text-dark-400'}`} />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className={`w-full pl-10 pr-12 py-3 bg-dark-800 border rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-1 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-dark-600 focus:border-primary-500 focus:ring-primary-500'
        }`}
        placeholder={placeholder}
        required
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500"
        >
          {toggleValue ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
      {showCheck && (
        <CheckCircle className="absolute right-10 top-3 w-5 h-5 text-primary-500" />
      )}
    </div>
  );
};

const SocialButton = ({ onClick, icon, label, loading }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className={`flex items-center justify-center px-4 py-3 border rounded-xl ${
      loading
        ? 'bg-dark-700 border-dark-600 text-dark-300 cursor-not-allowed'
        : 'bg-dark-800 text-dark-200 hover:bg-dark-700 border-dark-600'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default SignUp;
