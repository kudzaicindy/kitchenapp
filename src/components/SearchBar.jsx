import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className="relative w-full">
    <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
    <input
      type="text"
      placeholder="Search items..."
      className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl 
                border-2 border-gray-100 focus:border-blue-500 focus:outline-none 
                focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90 
                dark:border-gray-700 dark:text-white text-sm sm:text-base shadow-sm 
                transition-all duration-200"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default SearchBar; 