import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import LogoutButton from './LogoutButton';
import { FaArrowLeft, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { KitchenContext, useKitchenStore, ItemCard } from './Inventory';
import ItemModal from './ItemModal';

const ManageItems = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useKitchenStore();
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch items and locations
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        if (authError) throw new Error('Authentication error: ' + authError.message);
        if (!session) throw new Error('No active session');

        const { data: itemsData, error: itemsError } = await supabase
          .from('items')
          .select('*')
          .order('created_at', { ascending: false });

        if (itemsError) throw itemsError;

        const uniqueLocations = [...new Set(itemsData
          .map(item => item.location)
          .filter(location => location)
        )];

        setItems(itemsData || []);
        setLocations(uniqueLocations);

      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const subscription = supabase
      .channel('items_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'items' },
        () => fetchData()
      )
      .subscribe();

    fetchData();

    return () => subscription.unsubscribe();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const itemToAdd = {
        ...newItem,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_managed: true
      };

      const { data, error } = await supabase
        .from('items')
        .insert([itemToAdd])
        .select();

      if (error) throw error;

      setItems(prevItems => [data[0], ...prevItems]);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      if (updatedItem.location && !locations.includes(updatedItem.location)) {
        throw new Error('Invalid location selected');
      }

      const updates = {
        ...updatedItem,
        updated_at: new Date().toISOString(),
        is_managed: true
      };

      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', editingItem.id)
        .select();

      if (error) throw error;

      setItems(prevItems =>
        prevItems.map(item =>
          item.id === editingItem.id ? data[0] : item
        )
      );
      setEditingItem(null);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-2xl font-medium text-gray-700 dark:text-gray-300">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-gray-900 flex items-center justify-center">
      <div className="text-2xl font-medium text-red-600 dark:text-red-400">Error: {error}</div>
    </div>
  );

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
        <div className="absolute inset-0 bg-black/50" />
        
        <div className={`absolute inset-0 ${
          state.theme === 'light' 
            ? 'bg-gray-100/70'
            : 'bg-secondary-900/80'
        } backdrop-blur-[3px] transition-colors duration-300`} />

        <div className="relative z-10 p-2 sm:p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start gap-3 sm:gap-6 mb-4 sm:mb-8 md:mb-12 px-2 sm:px-0">
              <div className="flex items-center gap-2 sm:gap-4">
                <button 
                  onClick={() => navigate('/inventory')}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">Manage Inventory</h1>
              </div>
              
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

            <div className="mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                className="w-full sm:w-auto text-sm sm:text-base"
              />
              <button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto px-3 sm:px-4 md:px-6 py-2 bg-primary-600 text-white text-sm sm:text-base rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add New Item
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <ItemModal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleAddItem}
                availableLocations={locations}
              />

              <ItemModal
                isOpen={!!editingItem}
                onClose={() => setEditingItem(null)}
                onSubmit={handleUpdateItem}
                item={editingItem}
                isEditing={true}
                availableLocations={locations}
              />

              {items.length === 0 ? (
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 backdrop-blur-sm text-center mx-2 sm:mx-0">
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
                    No items found in inventory
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-1 xs:px-2 sm:px-0">
                  {filteredItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={setEditingItem}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </KitchenContext.Provider>
  );
};

export default ManageItems;