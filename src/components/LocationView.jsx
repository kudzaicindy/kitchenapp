import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid, List, Moon, Sun } from 'lucide-react';
import { ItemCard, useKitchenStore, KitchenContext } from './Inventory';
import LogoutButton from './LogoutButton';

const LocationView = () => {
  const { location } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useKitchenStore();
  const decodedLocation = decodeURIComponent(location);
  
  const locationItems = state.items.filter(item => item.location === decodedLocation);

  const handleEditItem = (item) => {
    navigate('/inventory', { state: { editItem: item } });
  };

  const handleDeleteItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
  };

  const toggleView = () => {
    dispatch({ type: 'SET_VIEW', payload: state.viewMode === 'grid' ? 'list' : 'grid' });
  };

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
        
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link 
                  to="/inventory"
                  className="p-2 rounded-xl bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold dark:text-white">
                  {decodedLocation}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <LogoutButton />
                <button
                  onClick={toggleView}
                  className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {state.viewMode === 'grid' ? <List size={22} /> : <Grid size={22} />}
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {state.theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                </button>
              </div>
            </div>

            <div className={`grid gap-6 ${
              state.viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {locationItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))}
              {locationItems.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-500 dark:text-gray-400">
                    No items found in {decodedLocation}
                  </p>
                  <Link 
                    to="/inventory" 
                    className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Inventory
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </KitchenContext.Provider>
  );
};

export default LocationView; 