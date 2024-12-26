import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice";
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

      // Example userId


    try {
      // API request to add product to the cart in the backend
      const response = await fetch('http://localhost:4000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
            productId: "676529090ea1df52b91606f8",
            userId: "676bf67e6f553c1b7aa1e137",
            quantity: 1
          
          
        }),
      });
      

      if (response.ok && result.success) {
        // Dispatch the action to update the Redux store with the cart item
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding product to cart');
    }
  };

 


  const handleProductClick = (e) => {
    e.stopPropagation();
    navigate(`/productDetail/${product._id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-w-1 aspect-h-1 overflow-hidden">
        <img
          src={product.images?.[0]?.url || product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-64 object-contain p-4 bg-gray-50 dark:bg-gray-700"
        />
        <AnimatePresence>
          {product.discountPercentage > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium"
            >
              -{product.discountPercentage}%
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 capitalize">{product.category}</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="ml-1 text-gray-600 dark:text-gray-300">
              ({product.numReviews || 0})
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{product.discountPrice || product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProductClick}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <FaEye className="mr-2" />
              View Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
