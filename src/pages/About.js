import React from "react";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import { 
  FaShieldAlt, 
  FaTruck, 
  FaHeadset, 
  FaMoneyBillWave,
  FaUsers,
  FaGlobe,
  FaHandshake,
  FaHeart
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Shopping",
      description: "We prioritize your security with advanced encryption and secure payment methods.",
      color: "bg-blue-500"
    },
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description: "Get your products delivered quickly with our efficient shipping partners.",
      color: "bg-green-500"
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Our customer support team is always ready to help you.",
      color: "bg-purple-500"
    },
    {
      icon: FaMoneyBillWave,
      title: "Best Deals",
      description: "We offer competitive prices and regular discounts on our products.",
      color: "bg-red-500"
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "10K+", icon: FaUsers },
    { label: "Monthly Sales", value: "5K+", icon: FaMoneyBillWave },
    { label: "Global Reach", value: "50+", subtext: "Countries", icon: FaGlobe },
    { label: "Years of Excellence", value: "5+", icon: FaHandshake },
  ];

  const values = [
    {
      title: "Customer First",
      description: "We believe in putting our customers' needs first and providing exceptional service.",
      icon: FaHeart,
    },
    {
      title: "Quality Assurance",
      description: "Every product undergoes strict quality checks before reaching our customers.",
      icon: FaShieldAlt,
    },
    {
      title: "Global Standards",
      description: "We maintain international standards in our operations and service delivery.",
      icon: FaGlobe,
    },
    {
      title: "Community Focus",
      description: "We actively participate in community development and sustainable practices.",
      icon: FaUsers,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Welcome to Exclusive
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Your premier destination for exclusive electronics and cutting-edge technology.
            We're more than just a store - we're your technology partner.
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b dark:border-gray-800"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center"
            >
              <div className="inline-block p-4 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <stat.icon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="text-3xl font-bold mb-2 dark:text-white">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              {stat.subtext && (
                <div className="text-sm text-gray-500 dark:text-gray-500">{stat.subtext}</div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-16 border-b dark:border-gray-800"
        >
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <value.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            To revolutionize the electronics shopping experience by providing cutting-edge products,
            exceptional service, and innovative solutions that enrich our customers' lives.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors"
          >
            Join Our Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
