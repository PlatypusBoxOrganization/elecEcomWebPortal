import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectProductById } from '../features/product/productSlice';
import NavBar from './NavBar';
import Footer from './Footer';
import { FaStar, FaShippingFast, FaShieldAlt, FaClock } from 'react-icons/fa';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <NavBar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600 dark:border-red-400"></div>
        </div>
      </div>
    );
  }

  const features = [
    { name: 'Free Shipping', description: 'Across India', icon: FaShippingFast },
    { name: 'Warranty', description: product.specifications?.warranty || '1 Year', icon: FaShieldAlt },
    { name: '45-Day Trial', description: 'Risk-free trial period', icon: FaClock },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image Gallery */}
          <div className="aspect-h-4 aspect-w-3 rounded-lg bg-gray-100 dark:bg-gray-800">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg bg-gray-100 dark:bg-gray-800 ${
                    selectedImage === index ? 'ring-2 ring-red-600 dark:ring-red-400' : ''
                  }`}
                >
                  <img src={image} alt="" className="h-24 w-full object-cover object-center" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
            
            {/* Price */}
            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                ₹{product.price.toLocaleString()}
                {product.discountPercentage > 0 && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                    ₹{(product.price * (1 + product.discountPercentage/100)).toLocaleString()}
                  </span>
                )}
              </p>
            </div>

            {/* Ratings */}
            <div className="mt-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.floor(product.ratings)
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="border-l border-gray-200 dark:border-gray-700 pl-4">
                    <feature.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Description</h3>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Specifications</h3>
              <div className="mt-4 space-y-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <dt className="font-medium text-gray-900 dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                      <dd className="mt-2 text-sm text-gray-500 dark:text-gray-400">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-10 flex">
              <button
                type="button"
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 dark:bg-red-500 px-8 py-3 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 sm:w-full"
              >
                Add to Cart
              </button>
            </div>

            {/* Book Consultation */}
            <div className="mt-4">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-red-600 dark:border-red-400 bg-white dark:bg-gray-900 px-8 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
