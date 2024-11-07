import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useKitchenStore, KitchenContext } from './Inventory';

const locationImages = {
  'Upper Cabinet': '/upper cabinet.jpg',
  'Lower Cabinet': '/lower cabinet.jpg',
  'Countertop': '/counter top.jpg',
  'Spice Rack': '/spice rack.jpg',
  'Drawer': '/drawer.jpg',
  'Pantry': '/pantry.jpg'
};

const LocationSection = ({ location, items }) => (
  <div className="mb-16">
    <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
      <img 
        src={locationImages[location]}
        alt={location}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-3xl font-bold text-white mb-2">{location}</h2>
        <p className="text-gray-200">{items.length} items</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div 
          key={item.id}
          className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg 
                   hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative h-48">
            <img 
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-primary-500/90 text-white text-sm rounded-full">
              {item.category}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">{item.name}</h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">Quantity: {item.quantity}</p>
            {item.description && (
              <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LocationsPage = () => {
  const [state] = useKitchenStore();

  // Group items by location
  const itemsByLocation = state.items.reduce((acc, item) => {
    if (!acc[item.location]) {
      acc[item.location] = [];
    }
    acc[item.location].push(item);
    return acc;
  }, {});

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
          <div className="flex items-center gap-4 mb-12">
            <Link 
              to="/"
              className="p-2 rounded-xl bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white">
              Kitchen Locations
            </h1>
          </div>

          {/* Location Sections */}
          <div className="space-y-8">
            {Object.entries(locationImages).map(([location]) => (
              itemsByLocation[location] && (
                <LocationSection 
                  key={location}
                  location={location}
                  items={itemsByLocation[location] || []}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </KitchenContext.Provider>
  );
};

export default LocationsPage; 