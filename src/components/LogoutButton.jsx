import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import supabase from '../config/supabaseClient';

const LogoutButton = () => (
  <button
    onClick={() => supabase.auth.signOut()}
    className="p-1.5 sm:p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 
              backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
  >
    <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
);

export default LogoutButton; 