import React, { useState, useContext } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { KitchenContext } from './Inventory';

const locationImages = {
  'Upper Cabinet': '/upper cabinet.jpg',
  'Lower Cabinet': '/lower cabinet.jpg',
  'Countertop': '/counter top.jpg',
  'Spice Rack': '/spice rack.jpg',
  'Drawer': '/drawer.jpg',
  'Pantry': '/pantry.jpg'
};

const LocationCard = ({ location, items, onClick }) => {
  const { theme } = useContext(KitchenContext);
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] ${
        theme === 'light' 
          ? 'bg-white/90 shadow-lg hover:shadow-xl' 
          : 'bg-secondary-800/90 shadow-secondary-900 hover:shadow-secondary-900'
      } backdrop-blur-sm cursor-pointer`}
    >
      <div className="relative h-52 overflow-hidden group">
        <img 
          src={locationImages[location]}
          alt={location}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <h3 className="text-2xl font-bold text-white mb-2">{location}</h3>
          <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view items in this location
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="bg-primary-50/50 dark:bg-primary-900/20 rounded-xl p-3 backdrop-blur-sm">
          <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">Items</p>
          <p className="text-lg font-bold text-primary-700 dark:text-primary-300">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
    </div>
  );
};

const ItemsList = ({ location, items, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-secondary-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl animate-fade-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
          {location}
        </h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
        <div className="grid gap-4">
          {items.map(item => (
            <div 
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 
                       hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
            >
              <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{item.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/20 
                                 text-primary-600 dark:text-primary-400">
                    {item.category}
                  </span>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">
                    Quantity: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Locations = ({ items }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Group items by location
  const itemsByLocation = items.reduce((acc, item) => {
    if (!acc[item.location]) {
      acc[item.location] = [];
    }
    acc[item.location].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {Object.entries(itemsByLocation).map(([location, locationItems]) => (
          <LocationCard 
            key={location}
            location={location}
            items={locationItems}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
      </div>

      {selectedLocation && (
        <ItemsList 
          location={selectedLocation}
          items={itemsByLocation[selectedLocation]}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </>
  );
};

export default Locations;