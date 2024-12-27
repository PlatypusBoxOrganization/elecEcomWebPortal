import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "behind-the-ear",
    name: "Behind-the-ear (BTE)",
    image: "/images/product-placeholder.png",
    count: 15,
    description: "Powerful and versatile hearing solutions"
  },
  {
    id: "in-the-ear",
    name: "In-the-ear (ITE)",
    image: "/images/product-placeholder.png",
    count: 12,
    description: "Customized in-ear hearing devices"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/images/product-placeholder.png",
    count: 25,
    description: "Essential hearing aid accessories"
  },
  {
    id: "batteries",
    name: "Batteries & Power",
    image: "/images/product-placeholder.png",
    count: 18,
    description: "Long-lasting power solutions"
  },
  {
    id: "maintenance",
    name: "Care & Maintenance",
    image: "/images/product-placeholder.png",
    count: 20,
    description: "Cleaning and maintenance products"
  },
  {
    id: "custom-solutions",
    name: "Custom Solutions",
    image: "/images/product-placeholder.png",
    count: 8,
    description: "Personalized hearing solutions"
  }
];

const CategorySection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Our Hearing Solutions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="block"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {category.description}
                </p>
                <span className="text-sm text-red-600 dark:text-red-400">
                  {category.count} products
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;