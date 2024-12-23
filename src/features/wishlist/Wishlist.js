import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaShoppingCart, 
  FaTrash, 
  FaShare, 
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaRegClock,
  FaRegBell
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { 
  removeFromWishlist, 
  moveToCart,
  selectWishlistItems 
} from './wishlistSlice';
import { addToCart } from '../cart/cartSlice';
import NavBar from '../../pages/NavBar';

const sortOptions = [
  { id: 'dateAdded', name: 'Date Added' },
  { id: 'priceLowToHigh', name: 'Price: Low to High' },
  { id: 'priceHighToLow', name: 'Price: High to Low' },
  { id: 'name', name: 'Name' },
];

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleRemove = (itemId) => {
    dispatch(removeFromWishlist(itemId));
    toast.success('Item removed from wishlist');
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(moveToCart(item.id));
    toast.success('Item moved to cart');
  };

  const handleShare = (item) => {
    // Simulate sharing functionality
    toast.success('Sharing options opened');
  };

  const handleNotify = (item) => {
    toast.success('You will be notified when the price drops');
  };

  const sortItems = (items) => {
    switch (sortBy) {
      case 'priceLowToHigh':
        return [...items].sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return [...items].sort((a, b) => b.price - a.price);
      case 'name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case 'dateAdded':
      default:
        return items;
    }
  };

  const filterItems = (items) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortedAndFilteredItems = sortItems(filterItems(wishlistItems));

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-16 text-center"
        >
          <FaHeart className="mx-auto text-6xl text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add items to your wishlist to save them for later
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold mb-4 md:mb-0 text-gray-900 dark:text-white">
            My Wishlist ({wishlistItems.length} items)
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 sm:max-w-xs">
              <input
                type="text"
                placeholder="Search wishlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 
                  dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 
                  dark:hover:bg-gray-600 transition-colors"
              >
                <FaSortAmountDown />
                <span>Sort by: {sortOptions.find(opt => opt.id === sortBy)?.name}</span>
              </button>
              
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10"
                >
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setShowSortMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortBy === option.id
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sortedAndFilteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(item)}
                      className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md text-gray-600 
                        dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <FaShare className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleNotify(item)}
                      className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md text-gray-600 
                        dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <FaRegBell className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-500 dark:text-red-400 font-medium text-lg">
                      ${item.discountPrice ? item.discountPrice.toFixed(2) : item.price.toFixed(2)}
                    </span>
                    {item.discountPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <FaRegClock className="mr-2" />
                    Added on {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 mr-2 flex items-center justify-center px-4 py-2 bg-red-500 text-white 
                        rounded-md hover:bg-red-600 transition-colors"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 
                        dark:hover:text-red-400 transition-colors"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Wishlist;
