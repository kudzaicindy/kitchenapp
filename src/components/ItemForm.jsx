import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ItemForm = ({ item, onSubmit, onCancel, isEditing, availableLocations }) => {
  const [formData, setFormData] = useState({
    id: item?.id || null,
    name: item?.name || '',
    category: item?.category || '',
    quantity: item?.quantity || 1,
    location: item?.location || '',
    description: item?.description || '',
    image_url: item?.image_url || ''
  });

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch locations from inventory
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Fetch distinct locations from the items table
        const { data, error } = await supabase
          .from('items')
          .select('location')
          .not('location', 'is', null)
          .eq('is_location', true)  // Assuming locations have this flag
          .order('location');

        if (error) throw error;

        // Remove duplicates and format data
        const uniqueLocations = [...new Set(data.map(item => item.location))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('items')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('items')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) return <div>Loading locations...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
                      border-2 border-gray-100 focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90
                      dark:border-gray-700 dark:text-white text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
                      border-2 border-gray-100 focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90
                      dark:border-gray-700 dark:text-white text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
                      border-2 border-gray-100 focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90
                      dark:border-gray-700 dark:text-white text-sm sm:text-base"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <select
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
                      border-2 border-gray-100 focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90
                      dark:border-gray-700 dark:text-white text-sm sm:text-base"
            required
          >
            <option value="">Select a location</option>
            {availableLocations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
                      border-2 border-gray-100 focus:border-blue-500 focus:outline-none
                      focus:ring-2 focus:ring-blue-200 bg-white/90 dark:bg-gray-800/90
                      dark:border-gray-700 dark:text-white text-sm sm:text-base"
            rows="3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image
          </label>
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-blue-900/50 dark:file:text-blue-400"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base
                    border-2 border-gray-300 rounded-lg sm:rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base
                    bg-blue-600 text-white rounded-lg sm:rounded-xl
                    hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Update' : 'Add'} Item
        </button>
      </div>
    </form>
  );
};

export default ItemForm; 