import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import NavBar from './NavBar';

// Import images
import computing from "../Assets/Computing.webp";
import gaming from "../Assets/Gaming.webp";
import audio from "../Assets/Audio.webp";
import homeAutomation from "../Assets/HomeAutomation.webp";
import wearable from "../Assets/Wearable.jpg";
import ps5 from "../Assets/ps5.png";
import speakers from "../Assets/speakers.png";
import phone from "../Assets/phone.jpg";

// Product data
const allProducts = {
  'iphone-15-pro': {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, featuring titanium design and advanced camera system.',
    price: 129999,
    rating: 4.9,
    reviews: 485,
    category: 'Phones',
    stock: 15,
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    images: [phone, phone, phone, phone],
    features: [
      'A17 Pro chip',
      '48MP camera system',
      'Titanium design',
      'Action button'
    ],
    relatedProducts: [
      {
        id: 'samsung-s23-ultra',
        name: 'Samsung Galaxy S23 Ultra',
        price: 124999,
        rating: 4.8,
        reviews: 425,
        image: phone
      }
    ]
  },
  'samsung-s23-ultra': {
    id: 'samsung-s23-ultra',
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Premium Android flagship with S Pen and advanced camera capabilities.',
    price: 124999,
    rating: 4.8,
    reviews: 425,
    category: 'Phones',
    stock: 12,
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    images: [phone, phone, phone, phone],
    features: [
      '200MP camera',
      'S Pen included',
      'Snapdragon 8 Gen 2',
      '5000mAh battery'
    ],
    relatedProducts: [
      {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        price: 129999,
        rating: 4.9,
        reviews: 485,
        image: phone
      }
    ]
  },
  'pixel-8-pro': {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    description: 'Google\'s latest flagship with advanced AI features and exceptional camera capabilities.',
    price: 106999,
    rating: 4.7,
    reviews: 325,
    category: 'Phones',
    stock: 8,
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    images: [phone, phone, phone, phone],
    features: [
      'Tensor G3 chip',
      'AI photography',
      '7 years of updates',
      'Temperature sensor'
    ],
    relatedProducts: [
      {
        id: 'oneplus-11',
        name: 'OnePlus 11',
        price: 56999,
        rating: 4.8,
        reviews: 385,
        image: phone
      }
    ]
  },
  'oneplus-11': {
    id: 'oneplus-11',
    name: 'OnePlus 11',
    description: 'Flagship killer with Hasselblad cameras and powerful performance.',
    price: 56999,
    rating: 4.8,
    reviews: 385,
    category: 'Phones',
    stock: 20,
    colors: ['Titan Black', 'Eternal Green'],
    images: [phone, phone, phone, phone],
    features: [
      'Snapdragon 8 Gen 2',
      'Hasselblad cameras',
      '100W charging',
      'AMOLED display'
    ],
    relatedProducts: [
      {
        id: 'pixel-8-pro',
        name: 'Google Pixel 8 Pro',
        price: 106999,
        rating: 4.7,
        reviews: 325,
        image: phone
      }
    ]
  },
  'macbook-pro-m2': {
    id: 'macbook-pro-m2',
    name: 'MacBook Pro M2',
    description: 'Latest MacBook Pro with M2 chip, featuring groundbreaking performance and incredible battery life.',
    price: 1299,
    rating: 4.9,
    reviews: 230,
    category: 'Computers',
    stock: 10,
    colors: ['Space Gray', 'Silver'],
    images: [computing, computing, computing, computing],
    features: [
      'M2 Pro or M2 Max chip',
      'Up to 96GB unified memory',
      'Up to 22 hours battery life',
      'Liquid Retina XDR display'
    ],
    relatedProducts: [
      {
        id: 'dell-xps-15',
        name: 'Dell XPS 15',
        price: 1499,
        rating: 4.8,
        reviews: 180,
        image: computing
      }
    ]
  },
  'dell-xps-15': {
    id: 'dell-xps-15',
    name: 'Dell XPS 15',
    description: 'Premium Windows Laptop with stunning 4K display and powerful performance.',
    price: 1499,
    rating: 4.8,
    reviews: 180,
    category: 'Computers',
    stock: 15,
    colors: ['Platinum Silver', 'Frost White'],
    images: [computing, computing, computing, computing],
    features: [
      '12th Gen Intel Core processors',
      'NVIDIA RTX graphics',
      '15.6-inch 4K OLED display',
      'Up to 64GB RAM'
    ],
    relatedProducts: [
      {
        id: 'macbook-pro-m2',
        name: 'MacBook Pro M2',
        price: 1299,
        rating: 4.9,
        reviews: 230,
        image: computing
      }
    ]
  },
  'ps5-console': {
    id: 'ps5-console',
    name: 'PlayStation 5 Console',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
    price: 49999,
    rating: 4.9,
    reviews: 495,
    category: 'Gaming',
    stock: 10,
    colors: ['White', 'Black'],
    images: [ps5, ps5, ps5, ps5],
    features: [
      'Ultra-high speed SSD',
      '4K-TV Gaming',
      'Ray Tracing',
      'HDR Technology'
    ],
    relatedProducts: [
      {
        id: 'xbox-series-x',
        name: 'Xbox Series X',
        price: 49999,
        rating: 4.8,
        reviews: 380,
        image: gaming
      }
    ]
  },
  'sony-wh1000xm5': {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling with Auto NC Optimizer, exceptional sound quality, and crystal-clear hands-free calling.',
    price: 29999,
    rating: 4.8,
    reviews: 465,
    category: 'Audio',
    stock: 15,
    colors: ['Black', 'Silver'],
    images: [audio, audio, audio, audio],
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Multipoint connection',
      'Hi-Res Audio certified'
    ],
    relatedProducts: [
      {
        id: 'airpods-max',
        name: 'AirPods Max',
        price: 59900,
        rating: 4.7,
        reviews: 320,
        image: audio
      }
    ]
  },
  'gaming-pc': {
    id: 'gaming-pc',
    name: 'Gaming PC',
    description: 'High-end gaming desktop with the latest RTX graphics and powerful processor.',
    price: 1999,
    rating: 4.7,
    reviews: 120,
    category: 'Gaming',
    stock: 8,
    colors: ['Black', 'White'],
    images: [gaming, gaming, gaming, gaming],
    features: [
      'RTX 4080 Graphics',
      'Intel i9 processor',
      '32GB DDR5 RAM',
      '2TB NVMe SSD'
    ],
    relatedProducts: [
      {
        id: 'ps5-console',
        name: 'PlayStation 5',
        price: 499,
        rating: 4.9,
        reviews: 450,
        image: ps5
      }
    ]
  },
  'premium-speakers': {
    id: 'premium-speakers',
    name: 'Premium Speakers',
    description: 'Wireless surround sound system with crystal clear audio and deep bass.',
    price: 299,
    rating: 4.8,
    reviews: 200,
    category: 'Audio',
    stock: 20,
    colors: ['Black', 'White', 'Silver'],
    images: [speakers, speakers, speakers, speakers],
    features: [
      '360° Spatial Audio',
      'Wireless connectivity',
      'Voice assistant support',
      'Multi-room audio'
    ],
    relatedProducts: [
      {
        id: 'noise-cancelling-headphones',
        name: 'Noise-Cancelling Headphones',
        price: 249,
        rating: 4.7,
        reviews: 150,
        image: audio
      }
    ]
  },
  'noise-cancelling-headphones': {
    id: 'noise-cancelling-headphones',
    name: 'Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation.',
    price: 249,
    rating: 4.7,
    reviews: 150,
    category: 'Audio',
    stock: 25,
    colors: ['Black', 'Silver', 'Blue'],
    images: [audio, audio, audio, audio],
    features: [
      'Active noise cancellation',
      '40-hour battery life',
      'Hi-Res Audio certified',
      'Multi-device pairing'
    ],
    relatedProducts: [
      {
        id: 'premium-speakers',
        name: 'Premium Speakers',
        price: 299,
        rating: 4.8,
        reviews: 200,
        image: speakers
      }
    ]
  },
  'smart-hub': {
    id: 'smart-hub',
    name: 'Smart Hub',
    description: 'Central control for your smart home with voice control and automation.',
    price: 149,
    rating: 4.6,
    reviews: 90,
    category: 'Smart Home',
    stock: 30,
    colors: ['White', 'Black'],
    images: [homeAutomation, homeAutomation, homeAutomation, homeAutomation],
    features: [
      'Voice control',
      'Multi-device support',
      'Energy monitoring',
      'Automation routines'
    ],
    relatedProducts: [
      {
        id: 'smart-security',
        name: 'Smart Security System',
        price: 399,
        rating: 4.8,
        reviews: 110,
        image: homeAutomation
      }
    ]
  },
  'smart-security': {
    id: 'smart-security',
    name: 'Smart Security System',
    description: 'Complete home security solution with 24/7 monitoring and mobile alerts.',
    price: 399,
    rating: 4.8,
    reviews: 110,
    category: 'Smart Home',
    stock: 12,
    colors: ['White', 'Black'],
    images: [homeAutomation, homeAutomation, homeAutomation, homeAutomation],
    features: [
      '4K security cameras',
      '24/7 monitoring',
      'Motion detection',
      'Mobile alerts'
    ],
    relatedProducts: [
      {
        id: 'smart-hub',
        name: 'Smart Hub',
        price: 149,
        rating: 4.6,
        reviews: 90,
        image: homeAutomation
      }
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = allProducts[id];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Product not found</h1>
            <p className="text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity,
      color: product.colors[selectedColor]
    }));
    toast.success('Added to cart!');
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  return (
    <div className="dark:bg-gray-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 bg-gray-100 dark:bg-gray-800
                    ${selectedImage === index ? 'border-red-500' : 'border-transparent'}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold dark:text-white">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviews} Reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-red-500 dark:text-red-400">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-semibold dark:text-white">Key Features:</h3>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">{feature}</li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold dark:text-white">Colors:</h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2
                      ${selectedColor === index ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-sm font-semibold">
              <span className={product.stock > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  disabled={!product.stock}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x dark:border-gray-600 dark:text-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  disabled={!product.stock}
                >
                  +
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.stock}
                className={`flex-1 py-3 px-6 rounded-lg
                  flex items-center justify-center space-x-2
                  ${product.stock > 0 
                    ? 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400'}`}
              >
                <FaShoppingCart />
                <span>Buy Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 border dark:border-gray-600 rounded-lg hover:border-red-500 dark:hover:border-red-400
                  hover:text-red-500 dark:hover:text-red-400 transition-colors text-gray-600 dark:text-gray-300"
              >
                <FaHeart />
              </motion.button>
            </div>

            {/* Free Delivery Section */}
            <div className="space-y-4 pt-6 border-t dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <span className="font-semibold dark:text-white">Free Delivery</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Enter your postal code for delivery availability</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold dark:text-white">Return Delivery</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Free 30 Days Delivery Returns. Details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -5 }}
                onClick={() => handleRelatedProductClick(relatedProduct.id)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">{relatedProduct.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(relatedProduct.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      ({relatedProduct.reviews})
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-500 dark:text-red-400">
                    ${relatedProduct.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
