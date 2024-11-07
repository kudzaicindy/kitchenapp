import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import LogoutButton from './LogoutButton';

const categories = {
  'Cookware': [
    { name: 'Professional Pots', image: '/professional pots.jpg' },
    { name: 'Non-stick Pans', image: '/non stick pans.jpg' },
    { name: 'Cast Iron Skillet', image: '/cast iron skillet.jpg' },
    { name: 'Wok', image: '/wok.jpg' }
  ],
  'Appliances': [
    { name: 'Stand Mixer', image: '/stand mixer.jpg' },
    { name: 'Food Processor', image: '/food processor.jpg' },
    { name: 'Blender', image: '/blender.jpg' },
    { name: 'Coffee Maker', image: '/coffee maker.jpg' }
  ],
  'Utensils': [
    { name: 'Knife Set', image: '/knife set.jpg' },
    { name: 'Wooden Spoons', image: '/wooden spoons.jpg' },
    { name: 'Measuring Cups', image: '/measuring cups.jpg' },
    { name: 'Cutting Boards', image: '/cutting boards.jpg' }
  ],
  'Storage': [
    { name: 'Glass Containers', image: '/glass containers.jpg' },
    { name: 'Spice Jars', image: '/spice jars.jpg' },
    { name: 'Mason Jars', image: '/mason jars.jpg' },
    { name: 'Pantry Containers', image: '/pantry containers.jpg' }
  ]
};

const CategorySection = ({ title, items }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold mb-6 text-secondary-900 dark:text-white">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div 
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="aspect-w-16 aspect-h-12">
            <img 
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SmartOrganization = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div 
      className="min-h-screen relative bg-blend-overlay"
      style={{
        backgroundImage: `url('/src/assets/An-island-with-a-marble-top-is-the-centerpiece-of-this-contemporary-kitchens-design.jpg')`,
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
              to="/"
              className="p-2 rounded-xl bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white">
              Smart Organization
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LogoutButton />
            <Link 
              to="/inventory"
              className="p-2 rounded-xl bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={20} />
            <input
              type="text"
              placeholder="Search kitchen items..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 
                       focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white/80 dark:bg-secondary-800/80 
                       dark:border-secondary-700 dark:text-white backdrop-blur-sm transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {Object.entries(categories)
            .filter(([category, items]) => 
              category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map(([category, items]) => (
              <CategorySection key={category} title={category} items={items} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SmartOrganization; 