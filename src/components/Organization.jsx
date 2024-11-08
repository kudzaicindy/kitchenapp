import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const Organization = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories] = useState([
    {
      name: 'Inventory',
      path: '/inventory',
      description: 'View and manage your kitchen inventory',
      image: '/professional pots.jpg'
    },
    {
      name: 'Manage Items',
      path: '/manage',
      description: 'Add, edit, and organize items',
      image: '/utensils1.jpg'
    },
    {
      name: 'Locations',
      path: '/locations',
      description: 'Manage storage locations',
      image: '/pantry-containers.jpg'
    }
  ]);

  return (
    <div 
      className="min-h-screen relative bg-blend-overlay"
      style={{
        backgroundImage: `url('/An-island-with-a-marble-top-is-the-centerpiece-of-this-contemporary-kitchens-design.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/90 backdrop-blur-[1px] transition-colors duration-300" />

      <div className="relative z-10 p-2 sm:p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start gap-3 sm:gap-6 mb-4 sm:mb-8 md:mb-12 px-2 sm:px-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
              Kitchen Organization
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-1.5 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
              >
                <FaBars className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="p-1.5 sm:p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="absolute top-2 right-2 z-50 sm:hidden">
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg backdrop-blur-sm p-2">
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-1 xs:px-2 sm:px-0">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="relative rounded-md xs:rounded-lg sm:rounded-2xl overflow-hidden shadow-sm xs:shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-20 xs:h-24 sm:h-32 md:h-40 lg:h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 xs:p-2 sm:p-3 md:p-4">
                    <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-gray-200 line-clamp-1 sm:line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization; 