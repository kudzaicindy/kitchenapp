import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Plus, Trash2, Edit2, Search, Layout, Grid, List, Moon, Sun, Image } from 'lucide-react';

// Context
const KitchenContext = createContext(null);

// Types
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_THEME: 'SET_THEME',
  SET_VIEW: 'SET_VIEW'
};

// Image categories mapping
const categoryImages = {
  'Dinnerware': '/api/placeholder/800/600',
  'Cookware': '/api/placeholder/800/600',
  'Utensils': '/api/placeholder/800/600',
  'Appliances': '/api/placeholder/800/600',
  'Ingredients': '/api/placeholder/800/600',
  'Storage': '/api/placeholder/800/600'
};

// Rest of your original kitchen app code...
// (Copy all the components and logic from your original App.jsx)

const KitchenApp = () => {
  const [state, dispatch] = useKitchenStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentItem, setCurrentItem] = React.useState({});
  const [editingId, setEditingId] = React.useState(null);

  // Rest of your original kitchen app component code...

  return (
    <KitchenContext.Provider value={state}>
      <div className={`min-h-screen transition-colors duration-200 ${
        state.theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      } p-8`}>
        {/* Rest of your original JSX... */}
      </div>
    </KitchenContext.Provider>
  );
};

export default KitchenApp; 