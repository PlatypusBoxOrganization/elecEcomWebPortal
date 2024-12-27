import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import NavBar from "./NavBar";

// Use placeholder image for all products
const placeholderImage = "/images/product-placeholder.png";

const categoryProducts = {
  "behind-the-ear": [
    {
      id: "premium-bte-aids",
      name: "Premium BTE Hearing Aids",
      image: placeholderImage,
      price: 89999,
      originalPrice: 99999,
      discount: 10,
      ratings: 245,
      description: "Experience crystal-clear sound with our advanced behind-the-ear hearing aids featuring noise cancellation technology.",
      category: "behind-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "AI-powered noise reduction",
        "Bluetooth connectivity",
        "Rechargeable battery",
        "Water-resistant",
        "Smartphone app control"
      ]
    },
    {
      id: "bte-comfort-plus",
      name: "BTE Comfort Plus",
      image: placeholderImage,
      price: 74999,
      originalPrice: 84999,
      discount: 12,
      ratings: 188,
      description: "Discreet and comfortable behind-the-ear hearing solutions customized to your unique needs.",
      category: "behind-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Natural sound processing",
        "Feedback cancellation",
        "Long battery life",
        "Discreet design",
        "Wind noise reduction"
      ]
    },
    {
      id: "bte-essential",
      name: "BTE Essential",
      image: placeholderImage,
      price: 59999,
      originalPrice: 69999,
      discount: 14,
      ratings: 156,
      description: "Essential behind-the-ear hearing aids with advanced features for clear and natural sound.",
      category: "behind-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Digital sound processing",
        "Multiple listening programs",
        "Battery powered",
        "Easy volume control",
        "Affordable care"
      ]
    },
    {
      id: "bte-mini",
      name: "BTE Mini",
      image: placeholderImage,
      price: 64999,
      originalPrice: 74999,
      discount: 13,
      ratings: 172,
      description: "Compact and powerful behind-the-ear hearing aids with premium features.",
      category: "behind-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Ultra-compact design",
        "Advanced sound clarity",
        "Moisture resistant",
        "Automatic adjustment",
        "Tinnitus masking"
      ]
    }
  ],
  "in-the-ear": [
    {
      id: "custom-ite-pro",
      name: "Custom ITE Devices",
      image: placeholderImage,
      price: 94999,
      originalPrice: 104999,
      discount: 10,
      ratings: 215,
      description: "Discreet and comfortable in-the-ear hearing solutions customized to your unique needs.",
      category: "in-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Custom-molded design",
        "Advanced noise reduction",
        "Bluetooth connectivity",
        "Rechargeable battery",
        "Smartphone app control"
      ]
    },
    {
      id: "ite-invisible",
      name: "ITE Invisible Elite",
      image: placeholderImage,
      price: 79999,
      originalPrice: 89999,
      discount: 11,
      ratings: 168,
      description: "Nearly invisible in-the-ear hearing aids with premium sound quality and comfort.",
      category: "in-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Ultra-discreet design",
        "Natural sound processing",
        "Adaptive feedback cancellation",
        "Long battery life",
        "Wind noise reduction"
      ]
    },
    {
      id: "ite-comfort",
      name: "ITE Comfort Series",
      image: placeholderImage,
      price: 69999,
      originalPrice: 79999,
      discount: 13,
      ratings: 142,
      description: "Comfortable and reliable in-the-ear hearing aids for all-day wear.",
      category: "in-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Ergonomic fit",
        "Multiple sound environments",
        "Easy volume control",
        "Moisture resistant",
        "Tinnitus masking"
      ]
    },
    {
      id: "ite-essential",
      name: "ITE Essential",
      image: placeholderImage,
      price: 54999,
      originalPrice: 64999,
      discount: 15,
      ratings: 178,
      description: "Essential in-the-ear hearing aids with advanced features at an affordable price.",
      category: "in-the-ear",
      brand: "Kullo",
      inStock: true,
      features: [
        "Digital sound processing",
        "Customizable programs",
        "Battery powered",
        "Background noise reduction",
        "Clear voice focus"
      ]
    }
  ],
  "accessories": [
    {
      id: "premium-care-kit",
      name: "Premium Care Kit",
      image: placeholderImage,
      price: 4999,
      originalPrice: 5999,
      discount: 17,
      ratings: 325,
      description: "Complete care kit including cleaning tools, batteries, and protective cases for your hearing aids.",
      category: "accessories",
      brand: "Kullo",
      inStock: true,
      features: [
        "Professional cleaning tools",
        "UV sanitizer box",
        "Dehumidifier",
        "Battery tester",
        "Travel case"
      ]
    },
    {
      id: "rechargeable-battery-kit",
      name: "Rechargeable Battery Kit",
      image: placeholderImage,
      price: 7999,
      originalPrice: 8999,
      discount: 11,
      ratings: 245,
      description: "High-capacity rechargeable batteries with charging dock for hearing aids.",
      category: "accessories",
      brand: "Kullo",
      inStock: true,
      features: [
        "Fast charging capability",
        "Long battery life",
        "LED indicators",
        "Multiple charging slots",
        "Portable design"
      ]
    },
    {
      id: "hearing-aid-dryer",
      name: "Electronic Dryer & Sanitizer",
      image: placeholderImage,
      price: 6499,
      originalPrice: 7499,
      discount: 13,
      ratings: 198,
      description: "Professional electronic dryer and UV sanitizer for hearing aids maintenance.",
      category: "accessories",
      brand: "Kullo",
      inStock: true,
      features: [
        "UV-C sanitization",
        "Moisture removal",
        "Temperature control",
        "Timer function",
        "Compact design"
      ]
    },
    {
      id: "maintenance-essentials",
      name: "Maintenance Essentials Kit",
      image: placeholderImage,
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      ratings: 287,
      description: "Essential maintenance tools and supplies for daily hearing aid care.",
      category: "accessories",
      brand: "Kullo",
      inStock: true,
      features: [
        "Cleaning brushes",
        "Wax removal tools",
        "Air blower",
        "Cleaning wipes",
        "Storage case"
      ]
    },
    {
      id: "bluetooth-streamer",
      name: "Bluetooth Audio Streamer",
      image: placeholderImage,
      price: 8999,
      originalPrice: 9999,
      discount: 10,
      ratings: 156,
      description: "Stream audio directly from your devices to your hearing aids.",
      category: "accessories",
      brand: "Kullo",
      inStock: true,
      features: [
        "Multi-device connectivity",
        "Long range streaming",
        "Battery indicator",
        "Voice control support",
        "App compatibility"
      ]
    },
    {
      id: "protection-pack",
      name: "Weather Protection Pack",
      image: placeholderImage,
      price: 1999,
      originalPrice: 2499,
      discount: 20,
      ratings: 223,
      description: "Protect your hearing aids from moisture, dust, and daily wear.",
      category: "accessories",
      brand: "Kullo",
      inStock: true,
      features: [
        "Waterproof covers",
        "Dust protectors",
        "Sweatbands",
        "Cord clips",
        "Storage pouch"
      ]
    }
  ],
  "batteries": [
    {
      id: "premium-rechargeable",
      name: "Premium Rechargeable Battery Kit",
      image: placeholderImage,
      price: 8999,
      originalPrice: 9999,
      discount: 10,
      ratings: 412,
      description: "High-performance rechargeable battery kit with charging station for hearing aids.",
      category: "batteries",
      brand: "Kullo",
      inStock: true,
      features: [
        "Fast charging technology",
        "Up to 30 hours per charge",
        "Smart charging case",
        "Battery health monitoring",
        "Multiple charging slots"
      ]
    },
    {
      id: "size-10-batteries",
      name: "Size 10 Hearing Aid Batteries",
      image: placeholderImage,
      price: 499,
      originalPrice: 599,
      discount: 17,
      ratings: 368,
      description: "Long-lasting Size 10 zinc-air batteries for small hearing aids.",
      category: "batteries",
      brand: "Kullo",
      inStock: true,
      features: [
        "Pack of 60 batteries",
        "Long shelf life",
        "Easy-to-open packaging",
        "Color-coded for size",
        "Mercury-free"
      ]
    },
    {
      id: "size-13-batteries",
      name: "Size 13 Hearing Aid Batteries",
      image: placeholderImage,
      price: 599,
      originalPrice: 699,
      discount: 14,
      ratings: 295,
      description: "Reliable Size 13 zinc-air batteries for standard hearing aids.",
      category: "batteries",
      brand: "Kullo",
      inStock: true,
      features: [
        "Pack of 60 batteries",
        "Extended battery life",
        "Easy activation tabs",
        "Color-coded for size",
        "High energy density"
      ]
    },
    {
      id: "size-312-batteries",
      name: "Size 312 Hearing Aid Batteries",
      image: placeholderImage,
      price: 549,
      originalPrice: 649,
      discount: 15,
      ratings: 342,
      description: "Dependable Size 312 zinc-air batteries for modern hearing aids.",
      category: "batteries",
      brand: "Kullo",
      inStock: true,
      features: [
        "Pack of 60 batteries",
        "Consistent power output",
        "Easy-to-handle design",
        "Color-coded for size",
        "Air-sealed packaging"
      ]
    },
    {
      id: "size-675-batteries",
      name: "Size 675 Hearing Aid Batteries",
      image: placeholderImage,
      price: 649,
      originalPrice: 749,
      discount: 13,
      ratings: 278,
      description: "Powerful Size 675 zinc-air batteries for power-hungry hearing aids.",
      category: "batteries",
      brand: "Kullo",
      inStock: true,
      features: [
        "Pack of 60 batteries",
        "Maximum power output",
        "Long-lasting performance",
        "Color-coded for size",
        "Premium quality cells"
      ]
    },
    {
      id: "battery-value-pack",
      name: "Multi-Size Battery Value Pack",
      image: placeholderImage,
      price: 1999,
      originalPrice: 2499,
      discount: 20,
      ratings: 186,
      description: "Comprehensive battery pack with all common hearing aid battery sizes.",
      category: "batteries",
      brand: "Kullo",
      inStock: true,
      features: [
        "All sizes included",
        "120 batteries total",
        "Convenient storage box",
        "Color-coded organizer",
        "Best value package"
      ]
    }
  ],
  "maintenance": [
    {
      id: "pro-cleaning-kit",
      name: "Professional Cleaning Kit",
      image: placeholderImage,
      price: 3999,
      originalPrice: 4999,
      discount: 20,
      ratings: 385,
      description: "Complete professional-grade cleaning kit for all types of hearing aids.",
      category: "maintenance",
      brand: "Kullo",
      inStock: true,
      features: [
        "Multi-tool cleaner",
        "Wax removal system",
        "Cleaning solution",
        "Drying capsules",
        "Brush set"
      ]
    },
    {
      id: "uv-sanitizer-pro",
      name: "UV Sanitizer Pro",
      image: placeholderImage,
      price: 5999,
      originalPrice: 6999,
      discount: 14,
      ratings: 292,
      description: "Advanced UV-C sanitization system for thorough hearing aid disinfection.",
      category: "maintenance",
      brand: "Kullo",
      inStock: true,
      features: [
        "360° UV-C coverage",
        "3-minute sanitization",
        "Built-in timer",
        "Auto shutoff",
        "LED indicators"
      ]
    },
    {
      id: "dehumidifier-plus",
      name: "Electronic Dehumidifier Plus",
      image: placeholderImage,
      price: 4499,
      originalPrice: 5499,
      discount: 18,
      ratings: 246,
      description: "Electronic dehumidifier for overnight moisture removal and maintenance.",
      category: "maintenance",
      brand: "Kullo",
      inStock: true,
      features: [
        "Forced air circulation",
        "Temperature control",
        "8-hour cycle",
        "Status display",
        "Portable design"
      ]
    },
    {
      id: "cleaning-solution-kit",
      name: "Premium Cleaning Solution Kit",
      image: placeholderImage,
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      ratings: 328,
      description: "Specialized cleaning solutions for daily hearing aid maintenance.",
      category: "maintenance",
      brand: "Kullo",
      inStock: true,
      features: [
        "Antimicrobial formula",
        "Wax dissolving solution",
        "Moisture repellent",
        "Brush cleaner",
        "Travel-sized bottles"
      ]
    },
    {
      id: "maintenance-tools",
      name: "Professional Tool Set",
      image: placeholderImage,
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      ratings: 275,
      description: "Comprehensive set of professional maintenance tools for hearing aids.",
      category: "maintenance",
      brand: "Kullo",
      inStock: true,
      features: [
        "Precision screwdrivers",
        "Tube cleaning tools",
        "Filter replacement tools",
        "Magnifying glass",
        "Storage case"
      ]
    },
    {
      id: "drying-capsules",
      name: "Moisture Guard Capsules",
      image: placeholderImage,
      price: 799,
      originalPrice: 999,
      discount: 20,
      ratings: 412,
      description: "Highly effective moisture absorption capsules for hearing aid storage.",
      category: "maintenance",
      brand: "Kullo",
      inStock: true,
      features: [
        "Pack of 12 capsules",
        "Color change indicator",
        "6-month supply",
        "Reusable container",
        "Travel pouch"
      ]
    }
  ],
  "custom-solutions": [
    {
      id: "custom-shell-ite",
      name: "Custom Shell ITE Solution",
      image: placeholderImage,
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      ratings: 245,
      description: "Personalized in-the-ear hearing aid with custom-fitted shell for optimal comfort.",
      category: "custom-solutions",
      brand: "Kullo",
      inStock: true,
      features: [
        "3D ear scanning",
        "Custom shell design",
        "Precise acoustic tuning",
        "Comfort-fit guarantee",
        "Natural sound profile"
      ]
    },
    {
      id: "custom-musician-monitor",
      name: "Musician's Custom Monitor",
      image: placeholderImage,
      price: 34999,
      originalPrice: 39999,
      discount: 13,
      ratings: 178,
      description: "Professional-grade custom monitors designed specifically for musicians.",
      category: "custom-solutions",
      brand: "Kullo",
      inStock: true,
      features: [
        "Balanced armature drivers",
        "Custom frequency response",
        "Noise isolation -26dB",
        "Detachable cables",
        "Stage-ready design"
      ]
    },
    {
      id: "custom-swim-solution",
      name: "Aqua Custom Solution",
      image: placeholderImage,
      price: 29999,
      originalPrice: 34999,
      discount: 14,
      ratings: 156,
      description: "Waterproof custom-fitted hearing aids for swimming and water activities.",
      category: "custom-solutions",
      brand: "Kullo",
      inStock: true,
      features: [
        "Waterproof design",
        "Antimicrobial coating",
        "Pressure equalization",
        "Secure fit system",
        "Swimming compatible"
      ]
    },
    {
      id: "custom-pediatric",
      name: "Pediatric Custom Solution",
      image: placeholderImage,
      price: 27999,
      originalPrice: 32999,
      discount: 15,
      ratings: 203,
      description: "Specially designed custom hearing aids for children with growing ears.",
      category: "custom-solutions",
      brand: "Kullo",
      inStock: true,
      features: [
        "Growth adaptable",
        "Impact resistant",
        "Parent controls",
        "Location tracking",
        "Tamper-proof battery"
      ]
    },
    {
      id: "custom-tinnitus",
      name: "Tinnitus Custom Solution",
      image: placeholderImage,
      price: 32999,
      originalPrice: 37999,
      discount: 13,
      ratings: 267,
      description: "Custom-programmed solution specifically for tinnitus management.",
      category: "custom-solutions",
      brand: "Kullo",
      inStock: true,
      features: [
        "Sound therapy",
        "Custom programming",
        "Multiple profiles",
        "Sleep mode",
        "Tinnitus masking"
      ]
    },
    {
      id: "custom-industrial",
      name: "Industrial Custom Solution",
      image: placeholderImage,
      price: 39999,
      originalPrice: 44999,
      discount: 11,
      ratings: 189,
      description: "Heavy-duty custom hearing protection and communication solution for industrial use.",
      category: "custom-solutions",
      brand: "Kullo",
      inStock: true,
      features: [
        "Noise cancellation",
        "Radio integration",
        "Impact protection",
        "Extended battery",
        "Environmental sealing"
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </h1>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                      {(product.ratings / 100).toFixed(1)}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {product.ratings} reviews
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add
                  </button>
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
