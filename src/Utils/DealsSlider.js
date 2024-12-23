import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ps5 from '../Assets/ps5.png';
import phone from '../Assets/phone.jpg';
import computing from '../Assets/Computing.webp';

const deals = [
  {
    id: 1,
    title: "PlayStation 5",
    subtitle: "Next-Gen Gaming",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.",
    discount: "20% OFF",
    image: ps5,
    bgColor: "from-purple-600 to-blue-500",
    link: "/category/gaming"
  },
  {
    id: 2,
    title: "iPhone 15 Pro",
    subtitle: "Pro Camera System",
    description: "Capture stunning photos and videos with the advanced camera system and A17 Pro chip.",
    discount: "15% OFF",
    image: phone,
    bgColor: "from-gray-800 to-gray-900",
    link: "/category/phones"
  },
  {
    id: 3,
    title: "MacBook Pro",
    subtitle: "Power & Performance",
    description: "Supercharged by M2 Pro or M2 Max chip for exceptional performance and amazing battery life.",
    discount: "10% OFF",
    image: computing,
    bgColor: "from-red-500 to-pink-500",
    link: "/category/computers"
  }
];

const DealsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + deals.length) % deals.length);
  };

  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Navigation Arrows - Hidden on mobile */}
      <div className="hidden sm:block">
        <button
          className="absolute left-2 md:left-4 top-1/2 z-10 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          onClick={() => paginate(-1)}
        >
          <FiChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button
          className="absolute right-2 md:right-4 top-1/2 z-10 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          onClick={() => paginate(1)}
        >
          <FiChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <div className={`w-full h-full bg-gradient-to-r ${deals[currentSlide].bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-full items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white space-y-2 sm:space-y-4 md:space-y-6 text-center md:text-left"
                >
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium">
                    Special Offer
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {deals[currentSlide].title}
                  </h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90">
                    {deals[currentSlide].subtitle}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-lg hidden sm:block">
                    {deals[currentSlide].description}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-white/20 backdrop-blur-sm px-4 py-1 md:px-6 md:py-2 rounded-lg">
                      {deals[currentSlide].discount}
                    </span>
                    <Link
                      to={deals[currentSlide].link}
                      className="inline-block bg-white text-gray-900 px-4 py-2 md:px-8 md:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-opacity-90 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative h-[200px] sm:h-[250px] md:h-[400px] flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={deals[currentSlide].image}
                      alt={deals[currentSlide].title}
                      className="absolute inset-0 w-full h-full object-contain p-4 md:p-8"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
        {deals.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-4 sm:w-6 bg-white'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsSlider;
