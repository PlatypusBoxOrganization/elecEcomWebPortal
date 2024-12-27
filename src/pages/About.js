import React from "react";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import { 
  FaHeadphones, 
  FaTruck, 
  FaHeadset, 
  FaCertificate,
  FaUsers,
  FaGlobe,
  FaHandshake,
  FaHeart,
  FaCheckCircle,
  FaMicroscope,
  FaUserMd,
  FaClinicMedical
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: FaHeadphones,
      title: "Expert Audiology",
      description: "Our certified audiologists provide comprehensive hearing assessments and personalized solutions.",
      color: "bg-blue-500"
    },
    {
      icon: FaTruck,
      title: "Home Trials",
      description: "Try our hearing aids at home with our 45-day risk-free trial period.",
      color: "bg-green-500"
    },
    {
      icon: FaHeadset,
      title: "Lifetime Support",
      description: "Ongoing care and support for all your hearing health needs.",
      color: "bg-purple-500"
    },
    {
      icon: FaCertificate,
      title: "Quality Guarantee",
      description: "All our hearing aids are certified and backed by manufacturer warranty.",
      color: "bg-red-500"
    },
  ];

  const stats = [
    { label: "Satisfied Clients", value: "5K+", icon: FaUsers },
    { label: "Hearing Tests", value: "10K+", icon: FaMicroscope },
    { label: "Certified Audiologists", value: "20+", icon: FaUserMd },
    { label: "Service Centers", value: "15+", icon: FaClinicMedical },
  ];

  const values = [
    {
      title: "Patient-Centric Care",
      description: "We prioritize your hearing health with personalized care and attention.",
      icon: FaHeart,
    },
    {
      title: "Professional Excellence",
      description: "Our audiologists are certified and continuously trained in latest technologies.",
      icon: FaCheckCircle,
    },
    {
      title: "Advanced Technology",
      description: "We offer state-of-the-art hearing solutions from leading manufacturers.",
      icon: FaGlobe,
    },
    {
      title: "Community Service",
      description: "We're committed to improving hearing healthcare accessibility.",
      icon: FaHandshake,
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
            Your Hearing Health Partner
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Dedicated to improving lives through better hearing. We combine expertise, 
            technology, and compassionate care to provide the best hearing solutions.
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
            To revolutionize the hearing healthcare experience by providing cutting-edge solutions,
            exceptional service, and compassionate care that enrich our patients' lives.
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
