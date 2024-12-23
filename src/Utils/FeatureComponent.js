import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaHeadset, FaShieldAlt, FaUndo } from "react-icons/fa";

const features = [
  {
    icon: FaTruck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
    color: "bg-purple-500"
  },
  {
    icon: FaHeadset,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
    color: "bg-red-500"
  },
  {
    icon: FaShieldAlt,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
    color: "bg-blue-500"
  },
  {
    icon: FaUndo,
    title: "EASY RETURNS",
    description: "Hassle-free return policy",
    color: "bg-green-500"
  }
];

const FeatureComponent = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-4 transform hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureComponent;