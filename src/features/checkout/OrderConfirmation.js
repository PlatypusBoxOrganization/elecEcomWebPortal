import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaShoppingBag, FaHome } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCart } from '../cart/cartSlice';

const OrderConfirmation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { orderNumber, total, items } = location.state || {
    orderNumber: Math.floor(100000 + Math.random() * 900000),
    total: 0,
    items: []
  };

  React.useEffect(() => {
    // Clear cart after successful order
    dispatch(clearCart());
  }, [dispatch]);

  const steps = [
    { icon: FaBox, text: 'Order Received', delay: 0.2 },
    { icon: FaTruck, text: 'Processing', delay: 0.4 },
    { icon: FaShoppingBag, text: 'Ready for Delivery', delay: 0.6 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-green-500 text-7xl mb-6 flex justify-center"
        >
          <FaCheckCircle />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-4"
        >
          Thank You for Your Order!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Your order #{orderNumber} has been placed successfully
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center space-x-8 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.delay }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 text-2xl mb-2">
                <step.icon />
              </div>
              <span className="text-sm text-gray-600">{step.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </motion.div>
            ))}
            <div className="flex justify-between font-semibold text-lg pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            <FaBox className="mr-2" />
            Track Order
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
