import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Upload } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ItemModal = ({ isOpen, onClose, onSubmit, item, isEditing, availableLocations }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || '',
    quantity: item?.quantity || 1,
    location: item?.location || '',
    description: item?.description || '',
    image_url: item?.image_url || ''
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(item?.image_url || '');

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
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
      setPreviewUrl(publicUrl);

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-gray-900/85 backdrop-blur-[2px] z-[100]
                    data-[state=open]:animate-in data-[state=closed]:animate-out 
                    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
                                 w-[calc(100%-2rem)] max-w-lg max-h-[85vh] overflow-y-auto
                                 rounded-xl bg-white dark:bg-gray-800 p-6 
                                 shadow-xl focus:outline-none z-[101]
                                 data-[state=open]:animate-in data-[state=closed]:animate-out
                                 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                                 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                                 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
                                 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
            <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Item' : 'Add New Item'}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400">
              {isEditing ? 'Update the item details below.' : 'Fill in the details for your new item.'}
            </Dialog.Description>
          </div>

          <Dialog.Close className="absolute right-4 top-4 p-1 rounded-full 
                                 text-gray-500 hover:text-gray-900 dark:text-gray-400 
                                 dark:hover:text-gray-100 hover:bg-gray-100 
                                 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </Dialog.Close>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Item Image
              </label>
              <div className="flex flex-col items-center justify-center w-full">
                {previewUrl ? (
                  <div className="relative w-full h-48 mb-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setFormData(prev => ({ ...prev, image_url: '' }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                               hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 
                                   border-2 border-dashed border-gray-300 dark:border-gray-600 
                                   rounded-lg cursor-pointer hover:border-blue-500 
                                   dark:hover:border-blue-400 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 
                           dark:text-white text-sm transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 
                           dark:text-white text-sm transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 
                           dark:text-white text-sm transition-colors"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 
                           dark:text-white text-sm transition-colors"
                  required
                >
                  <option value="">Select Location</option>
                  {availableLocations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 
                           dark:text-white text-sm transition-colors"
                  rows="3"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                           bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 
                           dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                         rounded-lg hover:bg-blue-700 transition-colors"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : isEditing ? 'Update' : 'Add'} Item
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ItemModal; 