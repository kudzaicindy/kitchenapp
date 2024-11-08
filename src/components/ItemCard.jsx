import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete, viewMode = 'grid' }) => {
  return (
    <div className="rounded-md xs:rounded-lg sm:rounded-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] bg-white/90 shadow-sm xs:shadow-md sm:shadow-lg hover:shadow-xl backdrop-blur-sm">
      <div className="relative h-20 xs:h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden group">
        <img 
          src={item.image_url || item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />
        
        {/* Action Buttons */}
        <div className="absolute top-0.5 xs:top-1 sm:top-2 right-0.5 xs:right-1 sm:right-2 flex gap-0.5 xs:gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="p-0.5 xs:p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-primary-600 hover:bg-white hover:scale-110 transition-all shadow-lg"
            onClick={() => onEdit(item)}
          >
            <Edit2 size={10} className="xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-0.5 xs:p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-red-600 hover:bg-white hover:scale-110 transition-all shadow-lg"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 size={10} className="xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Category Badge */}
        <span className="absolute top-0.5 xs:top-1 sm:top-2 left-0.5 xs:left-1 sm:left-2 px-1 xs:px-1.5 sm:px-2 py-0.5 text-[8px] xs:text-[10px] sm:text-xs font-medium rounded-full bg-primary-500/90 text-white backdrop-blur-sm">
          {item.category}
        </span>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-1 xs:p-1.5 sm:p-2 md:p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
            {item.name}
          </h3>
          <p className="text-[8px] xs:text-[10px] sm:text-xs text-gray-200 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.description}
          </p>
        </div>
      </div>

      <div className="p-1 xs:p-1.5 sm:p-2 md:p-3 space-y-0.5 xs:space-y-1 sm:space-y-2">
        <div className="grid grid-cols-2 gap-0.5 xs:gap-1 sm:gap-2">
          <div className="bg-primary-50/50 rounded xs:rounded-md sm:rounded-lg p-0.5 xs:p-1 sm:p-2 backdrop-blur-sm">
            <p className="text-[8px] xs:text-[10px] sm:text-xs text-primary-600 font-medium">Qty</p>
            <p className="text-[10px] xs:text-xs sm:text-sm font-bold text-primary-700">
              {item.quantity}
            </p>
          </div>
          <div className="bg-secondary-50/50 rounded xs:rounded-md sm:rounded-lg p-0.5 xs:p-1 sm:p-2 backdrop-blur-sm">
            <p className="text-[8px] xs:text-[10px] sm:text-xs text-secondary-600 font-medium">Loc</p>
            <p className="text-[10px] xs:text-xs sm:text-sm font-bold text-secondary-700 truncate">
              {item.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard; 