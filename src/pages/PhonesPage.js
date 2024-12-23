import React from 'react';
import { motion } from 'framer-motion';
import { phones } from '../data/phones';
import { FaStar } from 'react-icons/fa';

const PhonesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Smartphones
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {phones.map((phone) => (
          <motion.div
            key={phone.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img 
                src={phone.image} 
                alt={phone.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                -{phone.discount}%
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{phone.name}</h3>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400">
                  <FaStar />
                  <span className="ml-1 text-gray-600">({phone.ratings})</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-gray-900">₹{phone.price}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹{phone.originalPrice}</span>
                </div>
              </div>

              <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PhonesPage;
