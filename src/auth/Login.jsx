import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import supabase from '../config/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      console.log('Login attempt with:', { email, password });

      console.log('Supabase instance:', supabase);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Detailed error:', error);
        throw error;
      }

      console.log('Login successful:', data);

      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (error) {
      console.error('Full error object:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <img 
          src="/login6.jpg"
          alt="Kitchen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h3 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Organize Your Kitchen
          </h3>
          <p className="text-xl text-white max-w-md leading-relaxed drop-shadow-lg">
            Keep track of your kitchen inventory and manage your space efficiently
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to Your Kitchen Hub
            </h2>
            <p className="text-gray-600">
              Your smart kitchen management journey starts here
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 rounded-xl hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : (
                <>
                  Login <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 