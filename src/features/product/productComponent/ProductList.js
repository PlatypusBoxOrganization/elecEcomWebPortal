import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { addToCart } from '../../cart/cartSlice';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProductList = ({ title, subtitle, products, showTimer = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 3,
    minutes: 59,
    seconds: 59
  });

  React.useEffect(() => {
    if (!showTimer) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };

        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };

        const newHours = prev.hours - 1;
        if (newHours >= 0) return { hours: newHours, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showTimer]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        {showTimer && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Ends in:</span>
            <div className="flex items-center space-x-1">
              <div className="bg-gray-900 text-white px-2 py-1 rounded">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-gray-900">:</span>
              <div className="bg-gray-900 text-white px-2 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-gray-900">:</span>
              <div className="bg-gray-900 text-white px-2 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        )}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={item}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div
              className="relative cursor-pointer aspect-w-1 aspect-h-1 bg-gray-200"
              onClick={() => handleProductClick(product._id)}
            >
              <img
                src={product.images[0]?.url || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400">
                  <FaStar />
                  <span className="ml-1 text-gray-600">
                    ({product.numReviews})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.discountPrice}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaShoppingCart className="mr-2" />
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
