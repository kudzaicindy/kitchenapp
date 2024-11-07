import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import supabase from '../config/supabaseClient';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 
                 hover:scale-105 active:scale-95 group"
    >
      <LogOut 
        size={20} 
        className="transform transition-transform duration-300 group-hover:rotate-12" 
      />
      <span className="transform transition-transform duration-300 group-hover:translate-x-0.5">
        Sign Out
      </span>
    </button>
  );
};

export default LogoutButton; 