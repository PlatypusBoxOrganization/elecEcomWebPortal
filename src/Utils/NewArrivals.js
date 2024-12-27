import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    image: "/images/product-placeholder.png",
    title: "Next-Gen BTE Aids",
    description: "Revolutionary behind-the-ear hearing aids with AI-powered noise reduction.",
    buttonText: "Learn More",
    size: "large",
    productId: "premium-bte",
  },
  {
    id: 2,
    image: "/images/product-placeholder.png",
    title: "Custom ITE Solutions",
    description: "Personalized in-the-ear devices for maximum comfort and clarity.",
    buttonText: "Discover",
    size: "medium",
    productId: "custom-ite",
  },
  {
    id: 3,
    image: "/images/product-placeholder.png",
    title: "Care Essentials",
    description: "Professional cleaning and maintenance kit",
    buttonText: "Shop Now",
    size: "small",
    productId: "care-kit",
  },
  {
    id: 4,
    image: "/images/product-placeholder.png",
    title: "Power Solutions",
    description: "Long-lasting hearing aid batteries",
    buttonText: "Shop Now",
    size: "small",
    productId: "batteries",
  },
];

const NewArrivals = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8 px-4 sm:px-0">
        <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-md mb-2">
          New Technology
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">
          Latest Innovations
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Large Item (BTE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-6 relative rounded-xl sm:rounded-2xl overflow-hidden bg-black aspect-[4/3] cursor-pointer dark:bg-gray-800"
          onClick={() => handleProductClick(items[0].productId)}
        >
          <img
            src={items[0].image}
            alt={items[0].title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-gray-900/80 dark:via-gray-900/20" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white dark:text-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{items[0].title}</h3>
            <p className="text-sm sm:text-base text-gray-200 dark:text-gray-400 mb-4">{items[0].description}</p>
            <Link
              to={`/productDetail/${items[0].productId}`}
              className="inline-block bg-white text-black px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              {items[0].buttonText}
            </Link>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="lg:col-span-6 grid grid-rows-2 gap-4 sm:gap-6">
          {/* ITE Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black aspect-[2/1] cursor-pointer dark:bg-gray-800"
            onClick={() => handleProductClick(items[1].productId)}
          >
            <img
              src={items[1].image}
              alt={items[1].title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-gray-900/80 dark:via-gray-900/20" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white dark:text-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{items[1].title}</h3>
              <p className="text-sm text-gray-200 dark:text-gray-400 mb-3">{items[1].description}</p>
              <Link
                to={`/productDetail/${items[1].productId}`}
                className="inline-block bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {items[1].buttonText}
              </Link>
            </div>
          </motion.div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {items.slice(2).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative rounded-xl overflow-hidden bg-black aspect-square cursor-pointer dark:bg-gray-800"
                onClick={() => handleProductClick(item.productId)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-gray-900/80 dark:via-gray-900/20" />
                <div className="absolute bottom-0 left-0 p-3 sm:p-4 text-white dark:text-gray-200">
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-200 dark:text-gray-400 mb-2">{item.description}</p>
                  <Link
                    to={`/productDetail/${item.productId}`}
                    className="inline-block bg-white text-black px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
