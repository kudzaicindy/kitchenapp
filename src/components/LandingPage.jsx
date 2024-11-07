import React, { useState } from 'react';
import { ChefHat, Utensils, ClipboardList, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-secondary-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-xl animate-fade-in">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-700">
          <h2 className="text-2xl font-bold text-white">About Our Kitchen System</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Welcome to our Smart Kitchen Management System! This application helps you:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Organize and track all your kitchen items efficiently</li>
            <li>Manage different categories: Cookware, Utensils, Appliances, and more</li>
            <li>Keep track of item locations and quantities</li>
            <li>Easy-to-use interface for adding, updating, and removing items</li>
            <li>Smart search functionality to quickly find what you need</li>
            <li>Location-based organization system</li>
          </ul>
          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <p className="text-primary-700 dark:text-primary-300 font-medium">
              Never lose track of your kitchen items again with our intuitive organization system!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/An-island-with-a-marble-top-is-the-centerpiece-of-this-contemporary-kitchens-design.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* About Button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <button
          onClick={() => setShowAbout(true)}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-200"
        >
          About
        </button>
        <LogoutButton />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Manage Your Kitchen
            <span className="text-primary-400"> Smartly</span>
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Keep track of your kitchen inventory, organize your supplies, and never run out of essential items again.
          </p>
          <Link
            to="/organization"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Link to="/organization" className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
              <ChefHat className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Smart Organization
            </h3>
            <p className="text-secondary-700">
              Categorize and organize your kitchen items efficiently with our intuitive system.
            </p>
          </Link>

          <Link 
            to="/inventory" 
            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
              <Utensils className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Track Everything
            </h3>
            <p className="text-secondary-700">
              Keep track of all your kitchen items, from utensils to ingredients, in one place.
            </p>
          </Link>

          <Link 
            to="/manage"
            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
              <ClipboardList className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Easy Management
            </h3>
            <p className="text-secondary-700">
              Add, update, and remove items with just a few clicks. Simple and effective.
            </p>
          </Link>
        </div>
      </div>

      {/* About Modal */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

export default LandingPage;