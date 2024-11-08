import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Search, Layout, Grid, List, Moon, Sun, Image, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Locations from './Locations';
import DinnerModal from './DinnerModal';
import PotsModal from './PotsModal';
import UtensilsModal from './UtensilsModal';
import IngredientsModal from './IngredientsModal';
import StorageModal from './StorageModal';
import AppliancesModal from './AppliancesModal';
import LogoutButton from './LogoutButton';
import { supabase } from '../supabaseClient';
import { FaArrowLeft, FaArrowRight, FaSignOutAlt, FaBars } from 'react-icons/fa';

// Context
const KitchenContext = createContext(null);

// Types
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_THEME: 'SET_THEME',
  SET_VIEW: 'SET_VIEW',
  SET_ITEMS: 'SET_ITEMS'
};

// Image categories mapping
const categoryImages = {
  'Dinnerware': '/dinner2.jpg',
  'Cookware': '/set4.jpg',
  'Utensils': '/utensils1.jpg',
  'Appliances': '/blender.jpg',
  'Ingredients': '/sugar.jpg',
  'Storage': '/potatoes.jpg'
};

// Reducer
const kitchenReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now() }]
      };
    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        )
      };
    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case ACTIONS.SET_VIEW:
      return {
        ...state,
        viewMode: action.payload
      };
    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

// Custom Hooks
const useKitchenStore = () => {
  const initialState = {
    items: [
      { 
        id: 1, 
        name: 'Professional Cookware Set', 
        category: 'Cookware', 
        quantity: 5, 
        location: 'Lower Cabinet', 
        description: 'Professional grade stainless steel cookware set',
        image: '/set4.jpg'
      },
      { 
        id: 2, 
        name: 'Ceramic Dinner Set', 
        category: 'Dinnerware', 
        quantity: 6, 
        location: 'Upper Cabinet', 
        description: 'Modern white ceramic dinner set with gold trim',
        image: '/dinner2.jpg'
      },
      { 
        id: 3, 
        name: 'Kitchen Utensils Set',
        category: 'Utensils',
        quantity: 12,
        location: 'Drawer',
        description: 'Complete set of essential kitchen utensils',
        image: '/utensils1.jpg'
      },
      { 
        id: 4, 
        name: 'Basic Ingredients Set',
        category: 'Ingredients',
        quantity: 3,
        location: 'Upper Cabinet',
        description: 'Essential cooking ingredients including sugar, spices, and salt',
        image: '/sugar.jpg'
      },
      { 
        id: 5, 
        name: 'Food Storage Essentials',
        category: 'Storage',
        quantity: 6,
        location: 'Pantry',
        description: 'Essential food storage items',
        image: '/potatoes.jpg'
      },
      { 
        id: 6, 
        name: 'Kitchen Appliances Set',
        category: 'Appliances',
        quantity: 8,
        location: 'Countertop',
        description: 'Essential kitchen appliances',
        image: '/blender.jpg'
      }
    ],
    theme: 'light',
    viewMode: 'grid'
  };

  return useReducer(kitchenReducer, initialState);
};

const useKitchenContext = () => {
  const context = useContext(KitchenContext);
  if (!context) throw new Error('useKitchenContext must be used within KitchenProvider');
  return context;
};

// Components
const ImageUpload = ({ onImageSelect }) => (
  <div className="relative w-full h-40 mb-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
    <input
      type="file"
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      onChange={(e) => {
        onImageSelect('/api/placeholder/800/600');
      }}
    />
    <div className="flex flex-col items-center justify-center h-full">
      <Image size={24} className="text-gray-400 mb-2" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload image</p>
    </div>
  </div>
);

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative w-full max-w-2xl mx-auto">
    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search your kitchen items..."
      className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-lg shadow-sm transition-all duration-200"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

const ItemCard = ({ item, onEdit, onDelete, viewMode }) => {
  const { theme } = useKitchenContext();
  const [showDinnerModal, setShowDinnerModal] = React.useState(false);
  const [showPotsModal, setShowPotsModal] = React.useState(false);
  const [showUtensilsModal, setShowUtensilsModal] = React.useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = React.useState(false);
  const [showStorageModal, setShowStorageModal] = React.useState(false);
  const [showAppliancesModal, setShowAppliancesModal] = React.useState(false);

  const handleLocationClick = (e) => {
    e.preventDefault();
    if (item.category === 'Dinnerware') {
      setShowDinnerModal(true);
    } else if (item.name === 'Professional Cookware Set') {
      setShowPotsModal(true);
    } else if (item.name === 'Kitchen Utensils Set') {
      setShowUtensilsModal(true);
    } else if (item.category === 'Ingredients') {
      setShowIngredientsModal(true);
    } else if (item.category === 'Storage') {
      setShowStorageModal(true);
    } else if (item.category === 'Appliances') {
      setShowAppliancesModal(true);
    }
  };

  const handleLocationSelect = (newLocation) => {
    onEdit({ ...item, location: newLocation });
  };
  
  return (
    <>
      <div className={`rounded-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] ${
        theme === 'light' 
          ? 'bg-white/90 shadow-lg hover:shadow-xl' 
          : 'bg-secondary-800/90 shadow-secondary-900 hover:shadow-secondary-900'
      } backdrop-blur-sm`}>
        <div className="relative h-52 overflow-hidden group">
          <img 
            src={item.image || categoryImages[item.category]} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />
          
          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-primary-600 hover:bg-white hover:scale-110 transition-all shadow-lg"
              onClick={() => onEdit(item)}
            >
              <Edit2 size={18} />
            </button>
            <button
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-red-600 hover:bg-white hover:scale-110 transition-all shadow-lg"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-medium rounded-full bg-primary-500/90 text-white backdrop-blur-sm">
            {item.category}
          </span>

          {/* Item Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-gray-200 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.description}
            </p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-50/50 dark:bg-primary-900/20 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">Quantity</p>
              <p className="text-lg font-bold text-primary-700 dark:text-primary-300">
                {item.quantity}
              </p>
            </div>
            <div 
              onClick={handleLocationClick}
              className="bg-secondary-50/50 dark:bg-secondary-700/20 rounded-xl p-3 backdrop-blur-sm
                       hover:bg-secondary-100/50 dark:hover:bg-secondary-600/30 transition-colors 
                       group/link cursor-pointer"
            >
              <p className="text-xs text-secondary-600 dark:text-secondary-400 font-medium mb-1">Location</p>
              <p className="text-lg font-bold text-secondary-700 dark:text-secondary-300 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 transition-colors">
                {item.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DinnerModal 
        isOpen={showDinnerModal}
        onClose={() => setShowDinnerModal(false)}
        onSelectLocation={handleLocationSelect}
      />
      <PotsModal 
        isOpen={showPotsModal}
        onClose={() => setShowPotsModal(false)}
        onSelectLocation={handleLocationSelect}
      />
      <UtensilsModal 
        isOpen={showUtensilsModal}
        onClose={() => setShowUtensilsModal(false)}
        onSelectLocation={handleLocationSelect}
      />
      <IngredientsModal 
        isOpen={showIngredientsModal}
        onClose={() => setShowIngredientsModal(false)}
        onSelectLocation={handleLocationSelect}
      />
      <StorageModal 
        isOpen={showStorageModal}
        onClose={() => setShowStorageModal(false)}
        onSelectLocation={handleLocationSelect}
      />
      <AppliancesModal 
        isOpen={showAppliancesModal}
        onClose={() => setShowAppliancesModal(false)}
        onSelectLocation={handleLocationSelect}
      />
    </>
  );
};

// Main Inventory Component
const Inventory = () => {
  const [state, dispatch] = useKitchenStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('items');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDeleteItem = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: id });
  }, [dispatch]);

  const handleEditItem = useCallback((item) => {
    // Navigate to manage page with the item to edit
    window.location.href = `/manage?edit=${item.id}`;
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: ACTIONS.SET_THEME, payload: state.theme === 'light' ? 'dark' : 'light' });
  }, [state.theme, dispatch]);

  const toggleView = useCallback(() => {
    dispatch({ type: ACTIONS.SET_VIEW, payload: state.viewMode === 'grid' ? 'list' : 'grid' });
  }, [state.viewMode, dispatch]);

  const filteredItems = state.items.filter(item =>
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  React.useEffect(() => {
    if (activeTab === 'locations') {
      navigate('/locations');
    }
  }, [activeTab, navigate]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Update the state with database items
        dispatch({ type: ACTIONS.SET_ITEMS, payload: data || [] });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // Set up real-time subscription
    const subscription = supabase
      .channel('items_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'items' },
        (payload) => {
          console.log('Change received in Inventory!', payload);
          fetchItems(); // Refresh items when changes occur
      })
      .subscribe();

    fetchItems();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <KitchenContext.Provider value={state}>
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
        <div className={`absolute inset-0 ${
          state.theme === 'light' 
            ? 'bg-white/80' 
            : 'bg-secondary-900/90'
        } backdrop-blur-[1px] transition-colors duration-300`} />

        <div className="relative z-10 p-2 sm:p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center gap-3 sm:gap-6 mb-4 sm:mb-8 md:mb-12 px-2 sm:px-0">
              {/* Left side with back arrow and title */}
              <div className="flex items-center gap-2 sm:gap-4">
                <Link 
                  to="/organization"
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">Kitchen Inventory</h1>
              </div>

              {/* Right side with icons */}
              <div className="flex items-center">
                {/* Mobile hamburger menu */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="sm:hidden p-1.5 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <FaBars className="w-5 h-5" />
                </button>

                {/* Desktop icons */}
                <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={toggleView}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
                  >
                    {state.viewMode === 'grid' ? 
                      <List className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                      <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
                  >
                    {state.theme === 'light' ? 
                      <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </button>
                  <Link 
                    to="/manage"
                    className="p-1.5 sm:p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
                  >
                    <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-200"
                  >
                    <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile menu dropdown */}
              {isMobileMenuOpen && (
                <div className="absolute top-2 right-2 z-50 sm:hidden">
                  <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg backdrop-blur-sm p-2 space-y-1">
                    <button
                      onClick={toggleView}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full"
                    >
                      {state.viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                      {state.viewMode === 'grid' ? 'List View' : 'Grid View'}
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full"
                    >
                      {state.theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      {state.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                    <Link 
                      to="/manage"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full"
                    >
                      <FaArrowRight className="w-4 h-4" />
                      Manage
                    </Link>
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

            {/* Search Bar */}
            <div className="mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
              <button
                onClick={() => setActiveTab('items')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                  activeTab === 'items'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/80 dark:bg-gray-800/80'
                }`}
              >
                Items
              </button>
              <button
                onClick={() => setActiveTab('locations')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                  activeTab === 'locations'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/80 dark:bg-gray-800/80'
                }`}
              >
                Locations
              </button>
            </div>

            {activeTab === 'items' ? (
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-1 xs:px-2 sm:px-0">
                  {filteredItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={handleEditItem}
                      onDelete={handleDeleteItem}
                      viewMode={state.viewMode}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-2 sm:px-0">
                <Locations items={state.items} />
              </div>
            )}
          </div>
        </div>
      </div>
    </KitchenContext.Provider>
  );
};

export default Inventory;

// Add these exports at the end of the file
export { ItemCard, useKitchenStore, KitchenContext };