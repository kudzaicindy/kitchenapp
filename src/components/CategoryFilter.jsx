import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <select
    value={selectedCategory}
    onChange={(e) => onSelectCategory(e.target.value)}
    className="block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
              border-2 border-gray-100 focus:border-blue-500 focus:outline-none
              focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90
              dark:border-gray-700 dark:text-white text-sm sm:text-base shadow-sm
              transition-all duration-200"
  >
    {categories.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
);

export default CategoryFilter; 