import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiHeart, FiTruck, FiClock, FiGift, FiShoppingCart } from 'react-icons/fi';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartDiscount,
  selectAppliedCoupon,
  selectShippingStatus,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon
} from './cartSlice';
import { addToWishlist } from '../wishlist/wishlistSlice';
import NavBar from '../../pages/NavBar';

const VALID_COUPONS = {
  'WELCOME10': 10,
  'SAVE20': 20,
  'SPECIAL50': 50
};

const FREE_SHIPPING_THRESHOLD = 50;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const shippingCost = useSelector(selectCartShipping);
  const discountAmount = useSelector(selectCartDiscount);
  const totalAmount = useSelector(selectCartTotalAmount);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const { isFreeShipping, remainingForFreeShipping } = useSelector(selectShippingStatus);

  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  const steps = [
    { id: 1, name: 'Cart', status: 'current' },
    { id: 2, name: 'Shipping', status: 'upcoming' },
    { id: 3, name: 'Payment', status: 'upcoming' },
  ];

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleMoveToWishlist = (item) => {
    dispatch(addToWishlist(item));
    dispatch(removeFromCart(item.id || item._id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    setIsApplyingCoupon(true);

    // Simulate API call
    setTimeout(() => {
      const discountPercentage = VALID_COUPONS[couponCode.toUpperCase()];
      
      if (discountPercentage) {
        dispatch(applyCoupon({ code: couponCode.toUpperCase(), discountPercentage }));
        setCouponCode('');
      } else {
        setCouponError('Invalid coupon code');
      }
      
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Add some items to your cart to continue shopping.</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex items-center justify-center">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  {stepIdx !== steps.length - 1 && (
                    <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
                  )}
                </div>
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.status === 'current' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  <span className="text-sm font-medium">{step.id}</span>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{step.name}</div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Free Shipping Progress */}
        {!isFreeShipping && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Add ${remainingForFreeShipping.toFixed(2)} more to get free shipping!
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id || item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      ${(item.discountPrice || item.price).toFixed(2)}
                      {item.discountPrice && (
                        <span className="ml-2 text-sm line-through text-gray-400">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <FiClock className="inline-block mr-1" />
                      Estimated delivery: 2-4 business days
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuantityChange(item.id || item._id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
                      >
                        <FiMinus className="w-4 h-4" />
                      </motion.button>
                      <motion.span 
                        key={item.quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="w-8 text-center dark:text-white"
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuantityChange(item.id || item._id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
                      >
                        <FiPlus className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold dark:text-white">
                        ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMoveToWishlist(item)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <FiHeart className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveItem(item.id || item._id)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-4">
            {/* Coupon Code Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Have a Coupon?</h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{appliedCoupon.code}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {appliedCoupon.discountPercentage}% off
                    </p>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-red-500 hover:text-red-600 dark:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </motion.button>
                  </div>
                  {couponError && (
                    <p className="text-sm text-red-500">{couponError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount ({appliedCoupon.discountPercentage}% off)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  {isFreeShipping ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    <span>${shippingCost.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <FiTruck className="inline-block mr-1" />
                    {isFreeShipping ? 'Free shipping applied' : `Free shipping on orders over $${FREE_SHIPPING_THRESHOLD}`}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors mt-4 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span className="text-sm">({cartItems.length} items)</span>
                </motion.button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Shipping Information</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <FiTruck className="w-4 h-4" />
                  Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
                </p>
                <p className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  Estimated delivery: 2-4 business days
                </p>
                <p className="flex items-center gap-2">
                  <FiGift className="w-4 h-4" />
                  Gift wrapping available at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
