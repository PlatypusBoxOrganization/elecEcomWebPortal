import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGift, FiTag, FiClock } from "react-icons/fi";
import gamingSetup from "../Assets/gaming setup.jpg";
import gadgetsCollection from "../Assets/gadgetsection.webp";

const SalesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Sale Item */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-[300px] sm:h-[400px] rounded-lg sm:rounded-2xl overflow-hidden group"
        >
          <img
            src={gamingSetup}
            alt="Gaming Setup"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/80" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 text-white">
            <span className="inline-block bg-red-500 text-white px-3 sm:px-4 py-1 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
              New Season
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
              Gaming Setup
              <br />
              Collection
            </h3>
            <p className="text-sm sm:text-base text-gray-200 dark:text-gray-300 mb-4 sm:mb-6">
              Save up to 50% on selected gaming gear
            </p>
            <Link
              to="/category/gaming"
              className="inline-block bg-white text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>

        {/* Right Sale Item */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-[300px] sm:h-[400px] rounded-lg sm:rounded-2xl overflow-hidden group"
        >
          <img
            src={gadgetsCollection}
            alt="Gadgets Collection"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/80" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 text-white">
            <span className="inline-block bg-green-500 text-white px-3 sm:px-4 py-1 rounded-md mb-3 sm:mb-4 text-sm sm:text-base">
              Trending Now
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
              Latest Gadgets
              <br />
              Collection
            </h3>
            <p className="text-sm sm:text-base text-gray-200 dark:text-gray-300 mb-4 sm:mb-6">
              Discover cutting-edge technology
            </p>
            <Link
              to="/category/gadgets"
              className="inline-block bg-white text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SalesSection;