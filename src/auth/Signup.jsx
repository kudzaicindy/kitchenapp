import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import supabase from '../config/supabaseClient';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(false);
      setLoading(true);

      // 1. Sign up the user with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (authError) throw authError;

      // 2. Insert the user profile into your profiles table
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: authData.user.id,
              full_name: name,
              email: email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ], { 
            onConflict: 'id',
            returning: 'minimal'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      // Show success message
      setSuccess(true);
      
      // Wait 10 seconds before redirecting
      setTimeout(() => {
        navigate('/login');
      }, 10000);

    } catch (error) {
      console.error('Signup error:', error);
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
              Join Your Kitchen Hub
            </h2>
            <p className="text-gray-600">
              Create an account to start organizing your kitchen smartly
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

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <p>Registration successful! Redirecting to login...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  placeholder="Enter your name"
                  disabled={loading}
                  required
                />
              </div>
            </div>

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
                  required
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
                  placeholder="Choose a password"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 rounded-xl hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : (
                <>
                  Sign Up <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 