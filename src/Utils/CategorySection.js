import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import category images
import phones from "../Assets/phone.jpg";
import Computing from '../Assets/Computing.webp';
import Gaming from '../Assets/Gaming.webp';
import Audio from '../Assets/Audio.webp';
import HomeAutomation from '../Assets/HomeAutomation.webp';
import Wearable from '../Assets/Wearable.jpg';

const categories = [
  {
    id: "phones",
    name: "Phones",
    image: phones,
    count: 20,
    description: "Latest smartphones and accessories"
  },
  {
    id: "computers",
    name: "Computers",
    image: Computing,
    count: 15,
    description: "Laptops, desktops and accessories"
  },
  {
    id: "gaming",
    name: "Gaming",
    image: Gaming,
    count: 25,
    description: "Gaming consoles and accessories"
  },
  {
    id: "audio",
    name: "Audio",
    image: Audio,
    count: 18,
    description: "Headphones, speakers and more"
  },
  {
    id: "home-automation",
    name: "Home Automation",
    image: HomeAutomation,
    count: 12,
    description: "Smart home devices and systems"
  },
  {
    id: "wearables",
    name: "Wearables",
    image: Wearable,
    count: 24,
    description: "Smart wearable technology"
  }
];

const CategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8 px-4 sm:px-0">
        <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-md mb-2">
          Categories
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Browse By Category</h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link to={`/category/${category.id}`}>
              <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <h3 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">{category.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-300">
                    {category.count} Products
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-300 line-clamp-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;