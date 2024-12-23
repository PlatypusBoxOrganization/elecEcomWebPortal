import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

// Import product images
import ps5 from '../Assets/ps5.png';
import phone from '../Assets/phone.jpg';
import computing from '../Assets/Computing.webp';
import audio from '../Assets/Audio.webp';

const bestSellingProducts = [
  {
    id: 'ps5-console',
    name: 'PlayStation 5 Console',
    image: ps5,
    price: 49999,
    originalPrice: 54999,
    discount: 9,
    ratings: 495,
    description: "Next-gen gaming console with ultra-high speed SSD",
    category: "gaming"
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    image: phone,
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    ratings: 485,
    description: "Latest iPhone with A17 Pro chip",
    category: "phones"
  },
  {
    id: 'macbook-pro-m2',
    name: 'MacBook Pro M2',
    image: computing,
    price: 199999,
    originalPrice: 219999,
    discount: 9,
    ratings: 475,
    description: "Powerful laptop with M2 chip",
    category: "computers"
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    image: audio,
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    ratings: 465,
    description: "Premium noise-cancelling headphones",
    category: "audio"
  }
];

const BestSelling = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-md mb-2">
          This Month
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Best Selling Products</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellingProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/productDetail/${product.id}`} className="block">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  -{product.discount}%
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {(product.ratings / 100).toFixed(1)} ({product.ratings})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
