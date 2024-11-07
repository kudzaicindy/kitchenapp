import React from 'react';
import { X, MapPin } from 'lucide-react';

const AppliancesModal = ({ isOpen, onClose, onSelectLocation }) => {
  const appliancesImages = [
    { 
      id: 1, 
      image: '/mixer1.jpg', 
      location: 'Countertop',
      description: 'Easy access for frequent baking'
    },
    { 
      id: 2, 
      image: '/measuring cups.jpg', 
      location: 'Upper Cabinet',
      description: 'Organized storage for measuring tools'
    },
    { 
      id: 3, 
      image: '/mason jars.jpg', 
      location: 'Pantry',
      description: 'Storage for dry goods and preserves'
    },
    { 
      id: 4, 
      image: '/food processor.jpg', 
      location: 'Lower Cabinet',
      description: 'Convenient storage for food processor'
    },
    { 
      id: 5, 
      image: '/glass containers.jpg', 
      location: 'Upper Cabinet',
      description: 'Organized storage for leftovers'
    },
    { 
      id: 6, 
      image: '/cutting boards.jpg', 
      location: 'Cabinet',
      description: 'Vertical storage for cutting boards'
    },
    { 
      id: 7, 
      image: '/coffee maker.jpg', 
      location: 'Countertop',
      description: 'Coffee station setup'
    },
    { 
      id: 8, 
      image: '/blender.jpg', 
      location: 'Lower Cabinet',
      description: 'Easy access for smoothie making'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-secondary-800 rounded-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-xl animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-700">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Select Appliance Location
            </h2>
            <p className="text-primary-100 text-sm">
              Choose the perfect spot for your kitchen appliances
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-88px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliancesImages.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onSelectLocation(item.location);
                  onClose();
                }}
                className="group relative rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-white dark:bg-secondary-800"
              >
                {/* Image Container */}
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={item.image}
                    alt={`Appliance storage option ${item.id}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-primary-500/90 backdrop-blur-sm">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {item.location}
                    </p>
                  </div>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 bg-primary-600/90 text-white rounded-lg backdrop-blur-sm transform scale-95 group-hover:scale-100 transition-transform duration-300">
                    Select Location
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliancesModal; 