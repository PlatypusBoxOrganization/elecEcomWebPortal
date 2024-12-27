import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const bestSellingProducts = [
  {
    id: 'premium-bte-aids',
    name: 'Premium BTE Hearing Aids',
    image: '/images/product-placeholder.png',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    ratings: 495,
    description: "Advanced digital hearing aids with noise cancellation",
    category: "behind-the-ear"
  },
  {
    id: 'custom-ite-pro',
    name: 'Custom ITE Devices',
    image: '/images/product-placeholder.png',
    price: 94999,
    originalPrice: 104999,
    discount: 10,
    ratings: 485,
    description: "Custom-fitted in-the-ear hearing solution",
    category: "in-the-ear"
  },
  {
    id: 'custom-musician-monitor',
    name: "Musician's Custom Monitor",
    image: '/images/product-placeholder.png',
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    ratings: 475,
    description: "Professional-grade custom monitors for musicians",
    category: "custom-solutions"
  },
  {
    id: 'uv-sanitizer-pro',
    name: 'UV Sanitizer Pro',
    image: '/images/product-placeholder.png',
    price: 5999,
    originalPrice: 6999,
    discount: 14,
    ratings: 465,
    description: "Advanced UV-C sanitization system",
    category: "maintenance"
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

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
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
