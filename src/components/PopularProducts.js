import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const popularProducts = [
  {
    id: 1,
    name: 'IPS LCD Gaming Monitor',
    description: '24" Full HD gaming monitor with 180Hz refresh rate',
    price: 370,
    originalPrice: 400,
    rating: 4.8,
    image: '/path/to/monitor.jpg'
  },
  {
    id: 2,
    name: 'Galaxy Watch 5 Pro',
    description: 'Advanced smartwatch with comprehensive health tracking',
    price: 650,
    originalPrice: 800,
    rating: 4.7,
    image: '/path/to/watch.jpg'
  },
  {
    id: 3,
    name: 'HAVIT HV-G92 Gamepad',
    description: 'Professional gaming controller with precise controls and ergonomic design',
    price: 120,
    originalPrice: 160,
    rating: 4.5,
    image: '/path/to/gamepad.jpg'
  },
  {
    id: 4,
    name: 'AK-900 Wired Keyboard',
    description: 'Compact wireless keyboard with comfortable typing experience',
    price: 960,
    originalPrice: 1160,
    rating: 4.2,
    image: '/path/to/keyboard.jpg'
  }
];

const PopularProducts = () => {
  const { darkMode } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
      >
        Most Popular
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg shadow-md overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative pb-[75%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className={`text-lg font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.description}
                </p>

                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className={`ml-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${product.price}
                    </span>
                    <span className={`ml-2 text-sm line-through ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
