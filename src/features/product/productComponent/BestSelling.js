import React from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cart/cartSlice';
import { addToWishlist } from '../../wishlist/wishlistSlice';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import saleImg1 from "../../../Assets/saleImg1.jpg";
import saleImg2 from "../../../Assets/saleImg2.jpg";
import saleImg3 from "../../../Assets/saleImg3.webp";
import wearableImg from "../../../Assets/Wearable.jpg";
import homeAutomationImg from "../../../Assets/HomeAutomation.webp";
import audioImg from "../../../Assets/Audio.webp";
import { useTheme } from "../../../context/ThemeContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const BestSelling = () => {
  const dispatch = useDispatch();
  const { darkMode } = useTheme();

  const products = [
    {
      id: 1,
      discount: "-40%",
      image: saleImg1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      oldPrice: 160,
      rating: 4.5,
    },
    {
      id: 2,
      discount: "-35%",
      image: saleImg2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      oldPrice: 1160,
      rating: 4.7,
    },
    {
      id: 3,
      discount: "-30%",
      image: homeAutomationImg,
      name: "Smart Home Hub",
      price: 370,
      oldPrice: 400,
      rating: 4.8,
    },
    {
      id: 4,
      discount: "-25%",
      image: wearableImg,
      name: "Smart Watch Pro",
      price: 199,
      oldPrice: 299,
      rating: 4.6,
    },
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    toast.success("Added to wishlist!");
  };

  return (
    <section className={`py-8 ${darkMode ? 'bg-dark' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Best Selling Products
            </h2>
            <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : ''}`}>
              This Month's Top Products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-dark-card' : 'bg-white'}`}
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  {product.discount}
                </span>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'} hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-600' : ''} transition-colors duration-200`}
                >
                  <FaHeart className="text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className={`ml-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-center ml-4">
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${product.price}
                    </span>
                    <span className={`ml-2 line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ${product.oldPrice}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
