import React from 'react';
import { X, MapPin } from 'lucide-react';

const PotsModal = ({ isOpen, onClose, onSelectLocation }) => {
  const potsImages = [
    { 
      id: 1, 
      image: '/professional pots.jpg', 
      location: 'Lower Cabinet',
      description: 'Easy access for daily cooking'
    },
    { 
      id: 2, 
      image: '/wok.jpg', 
      location: 'Lower Cabinet',
      description: 'Perfect for stir-frying and deep-frying'
    },
    { 
      id: 3, 
      image: '/cast iron skillet.jpg', 
      location: 'Lower Cabinet',
      description: 'Ideal for high-heat cooking'
    },
    { 
      id: 4, 
      image: '/non stick pans.jpg', 
      location: 'Upper Cabinet',
      description: 'Great for everyday cooking needs'
    },
    { 
      id: 5, 
      image: '/set1.jpg', 
      location: 'Lower Cabinet',
      description: 'Professional cookware set storage'
    },
    { 
      id: 6, 
      image: '/set2.jpg', 
      location: 'Upper Cabinet',
      description: 'Additional cookware storage'
    },
    { 
      id: 7, 
      image: '/set3.jpg', 
      location: 'Pantry',
      description: 'Extra cookware storage'
    },
    { 
      id: 8, 
      image: '/set4.jpg', 
      location: 'Lower Cabinet',
      description: 'Large cookware storage'
    },
    { 
      id: 9, 
      image: '/set5.jpg', 
      location: 'Upper Cabinet',
      description: 'Specialty cookware storage'
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
              Select Cookware Location
            </h2>
            <p className="text-primary-100 text-sm">
              Choose the perfect spot for your cookware
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
            {potsImages.map((item) => (
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
                    alt={`Cookware storage option ${item.id}`}
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

export default PotsModal; 