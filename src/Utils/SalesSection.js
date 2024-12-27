import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SalesSection = () => {
  const promotions = [
    {
      id: 1,
      title: "Free Hearing Test",
      description: "Book a comprehensive hearing assessment with our experts",
      image: "hearing-test.jpg", // Replace with actual image
      link: "/services/hearing-test"
    },
    {
      id: 2,
      title: "Special Offer on BTE Aids",
      description: "Up to 20% off on selected behind-the-ear hearing aids",
      image: "bte-offer.jpg", // Replace with actual image
      link: "/category/behind-the-ear"
    },
    {
      id: 3,
      title: "Battery Bundle Deal",
      description: "Buy 3 packs of batteries, get 1 free",
      image: "battery-deal.jpg", // Replace with actual image
      link: "/category/batteries"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Special Offers & Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Link key={promo.id} to={promo.link}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-sm">{promo.description}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SalesSection;