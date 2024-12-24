import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import NavBar from "./NavBar";

// Import category images
import computing from "../Assets/Computing.webp";
import gaming from "../Assets/Gaming.webp";
import audio from "../Assets/Audio.webp";
import homeAutomation from "../Assets/HomeAutomation.webp";
import wearable from "../Assets/Wearable.jpg";
import ps5 from "../Assets/ps5.png";
import speakers from "../Assets/speakers.png";
import phone from "../Assets/phone.jpg";

const categoryProducts = {
  phones: [
    {
      id: "iphone-15-pro",
      name: "iPhone 15 Pro",
      image: phone,
      price: 129999,
      originalPrice: 139999,
      discount: 7,
      ratings: 485,
      description: "Latest iPhone with A17 Pro chip and titanium design",
      category: "phones",
      brand: "Apple",
      inStock: true,
      features: [
        "A17 Pro chip",
        "48MP camera system",
        "Titanium design",
        "Action button"
      ]
    },
    {
      id: "samsung-s23-ultra",
      name: "Samsung Galaxy S23 Ultra",
      image: phone,
      price: 124999,
      originalPrice: 134999,
      discount: 7,
      ratings: 425,
      description: "Premium Android flagship with S Pen",
      category: "phones",
      brand: "Samsung",
      inStock: true,
      features: [
        "200MP camera",
        "S Pen included",
        "Snapdragon 8 Gen 2",
        "5000mAh battery"
      ]
    },
    {
      id: "pixel-8-pro",
      name: "Google Pixel 8 Pro",
      image: phone,
      price: 106999,
      originalPrice: 114999,
      discount: 7,
      ratings: 325,
      description: "Google's latest flagship with AI features",
      category: "phones",
      brand: "Google",
      inStock: true,
      features: [
        "Tensor G3 chip",
        "AI photography",
        "7 years of updates",
        "Temperature sensor"
      ]
    },
    {
      id: "oneplus-11",
      name: "OnePlus 11",
      image: phone,
      price: 56999,
      originalPrice: 64999,
      discount: 12,
      ratings: 385,
      description: "Flagship killer with Hasselblad cameras",
      category: "phones",
      brand: "OnePlus",
      inStock: true,
      features: [
        "Snapdragon 8 Gen 2",
        "Hasselblad cameras",
        "100W charging",
        "AMOLED display"
      ]
    }
  ],
  computers: [
    {
      id: "macbook-pro-m2",
      name: "MacBook Pro M2",
      description: "Latest MacBook Pro with M2 chip",
      price: 1299,
      rating: 4.9,
      image: computing,
      category: "Computers",
      stock: 10,
      features: [
        "M2 Pro or M2 Max chip",
        "Up to 96GB unified memory",
        "Up to 22 hours battery life",
        "Liquid Retina XDR display"
      ]
    },
    {
      id: "dell-xps-15",
      name: "Dell XPS 15",
      description: "Premium Windows Laptop",
      price: 1499,
      rating: 4.8,
      image: computing,
      category: "Computers",
      stock: 15,
      features: [
        "12th Gen Intel Core processors",
        "NVIDIA RTX graphics",
        "15.6-inch 4K OLED display",
        "Up to 64GB RAM"
      ]
    }
  ],
  gaming: [
    {
      id: "ps5-console",
      name: "PlayStation 5",
      description: "Next-gen gaming console",
      price: 499,
      rating: 4.9,
      image: ps5,
      category: "Gaming",
      stock: 5,
      features: [
        "4K gaming",
        "Ray tracing support",
        "Ultra-high speed SSD",
        "3D Audio"
      ]
    },
    {
      id: "gaming-pc",
      name: "Gaming PC",
      description: "High-end gaming desktop",
      price: 1999,
      rating: 4.7,
      image: gaming,
      category: "Gaming",
      stock: 8,
      features: [
        "RTX 4080 Graphics",
        "Intel i9 processor",
        "32GB DDR5 RAM",
        "2TB NVMe SSD"
      ]
    }
  ],
  audio: [
    {
      id: "premium-speakers",
      name: "Premium Speakers",
      description: "Wireless surround sound system",
      price: 299,
      rating: 4.8,
      image: speakers,
      category: "Audio",
      stock: 20,
      features: [
        "360° Spatial Audio",
        "Wireless connectivity",
        "Voice assistant support",
        "Multi-room audio"
      ]
    },
    {
      id: "noise-cancelling-headphones",
      name: "Noise-Cancelling Headphones",
      description: "Premium wireless headphones",
      price: 249,
      rating: 4.7,
      image: audio,
      category: "Audio",
      stock: 25,
      features: [
        "Active noise cancellation",
        "40-hour battery life",
        "Hi-Res Audio certified",
        "Multi-device pairing"
      ]
    }
  ],
  "smart home": [
    {
      id: "smart-hub",
      name: "Smart Hub",
      description: "Central control for your smart home",
      price: 149,
      rating: 4.6,
      image: homeAutomation,
      category: "Smart Home",
      stock: 30,
      features: [
        "Voice control",
        "Multi-device support",
        "Energy monitoring",
        "Automation routines"
      ]
    },
    {
      id: "smart-security",
      name: "Smart Security System",
      description: "Complete home security solution",
      price: 399,
      rating: 4.8,
      image: homeAutomation,
      category: "Smart Home",
      stock: 12,
      features: [
        "4K security cameras",
        "24/7 monitoring",
        "Motion detection",
        "Mobile alerts"
      ]
    }
  ],
  wearables: [
    {
      id: "smart-watch-pro",
      name: "Smart Watch Pro",
      description: "Advanced fitness tracking",
      price: 299,
      rating: 4.7,
      image: wearable,
      category: "Wearables",
      stock: 18,
      features: [
        "Heart rate monitoring",
        "GPS tracking",
        "Sleep analysis",
        "5-day battery life"
      ]
    },
    {
      id: "fitness-band",
      name: "Fitness Band",
      description: "24/7 health monitoring",
      price: 99,
      rating: 4.5,
      image: wearable,
      category: "Wearables",
      stock: 40,
      features: [
        "Activity tracking",
        "Heart rate monitor",
        "Sleep tracking",
        "Water resistant"
      ]
    }
  ]
};

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = categoryProducts[category.toLowerCase()] || [];

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent navigation when clicking the Add to Cart button
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart!");
  };

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  return (
    <div className="dark:bg-gray-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-16 dark:bg-gray-900">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 capitalize dark:text-white">
            {category.replace(/%20/g, " ")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our collection of {category.toLowerCase().replace(/%20/g, " ")} products
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product.id)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square dark:bg-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Stock badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold
                  ${product.stock > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({product.rating})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500 dark:text-red-400">
                    ${product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!product.stock}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold
                      ${product.stock > 0 
                        ? 'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700' 
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                  >
                    <FaShoppingCart />
                    <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
