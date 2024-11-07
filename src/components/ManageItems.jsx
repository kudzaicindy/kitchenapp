import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit2, Trash2, Image } from 'lucide-react';
import { useKitchenStore, KitchenContext } from './Inventory';
import LogoutButton from './LogoutButton';

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

const ItemForm = ({ item, setItem, onSubmit, isEditing }) => {
  const categories = ['Dinnerware', 'Cookware', 'Utensils', 'Appliances', 'Ingredients', 'Storage'];
  const locations = ['Upper Cabinet', 'Lower Cabinet', 'Drawer', 'Pantry', 'Countertop', 'Spice Rack'];

  const handleImageSelect = (imageUrl) => {
    setItem({...item, image: imageUrl});
  };

  return (
    <div className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-secondary-900 dark:text-white">
        {isEditing ? 'Edit Item' : 'Add New Item'}
      </h2>
      <ImageUpload onImageSelect={handleImageSelect} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Name</label>
          <input
            type="text"
            placeholder="Item Name"
            className="input-field"
            value={item.name || ''}
            onChange={(e) => setItem({...item, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Category</label>
          <select
            className="input-field"
            value={item.category || ''}
            onChange={(e) => setItem({...item, category: e.target.value})}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            className="input-field"
            value={item.quantity || ''}
            onChange={(e) => setItem({...item, quantity: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Location</label>
          <select
            className="input-field"
            value={item.location || ''}
            onChange={(e) => setItem({...item, location: e.target.value})}
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="col-span-full space-y-2">
          <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Description</label>
          <textarea
            placeholder="Description"
            className="input-field"
            value={item.description || ''}
            onChange={(e) => setItem({...item, description: e.target.value})}
            rows={3}
          />
        </div>
      </div>
      <button
        className="btn-primary mt-6"
        onClick={onSubmit}
      >
        <Plus size={20} />
        {isEditing ? 'Update Item' : 'Add Item'}
      </button>
    </div>
  );
};

const ItemList = ({ items, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={20} />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 
                   focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white/80 dark:bg-secondary-800/80 
                   dark:border-secondary-700 dark:text-white backdrop-blur-sm transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg 
                     hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{item.name}</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {item.category} • {item.location} • Quantity: {item.quantity}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 
                           dark:bg-primary-900/20 dark:text-primary-400 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 
                           dark:bg-red-900/20 dark:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageItems = () => {
  const [state, dispatch] = useKitchenStore();
  const [currentItem, setCurrentItem] = useState({});
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdateItem = () => {
    if (currentItem.name && currentItem.category && currentItem.quantity && currentItem.location) {
      dispatch({
        type: editingId ? 'UPDATE_ITEM' : 'ADD_ITEM',
        payload: currentItem
      });
      setCurrentItem({});
      setEditingId(null);
    }
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setEditingId(item.id);
  };

  const handleDeleteItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
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
        <div className="absolute inset-0 bg-white/90 dark:bg-secondary-900/95 backdrop-blur-[1px]" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link 
                to="/inventory"
                className="p-2 rounded-xl bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white">
                Manage Items
              </h1>
            </div>
            <LogoutButton />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ItemForm
                item={currentItem}
                setItem={setCurrentItem}
                onSubmit={handleAddOrUpdateItem}
                isEditing={!!editingId}
              />
            </div>
            <div>
              <ItemList
                items={state.items}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            </div>
          </div>
        </div>
      </div>
    </KitchenContext.Provider>
  );
};

export default ManageItems; 