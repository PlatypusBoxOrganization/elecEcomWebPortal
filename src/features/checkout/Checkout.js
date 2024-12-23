import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotalAmount, 
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartDiscount,
  selectAppliedCoupon,
  clearCart 
} from '../cart/cartSlice';
import { 
  FaCreditCard, 
  FaPaypal, 
  FaMoneyBillWave, 
  FaLock, 
  FaTruck, 
  FaBox, 
  FaArrowLeft,
  FaShieldAlt,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import NavBar from '../../pages/NavBar';

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: FaCreditCard },
  { id: 'paypal', name: 'PayPal', icon: FaPaypal },
  { id: 'cod', name: 'Cash on Delivery', icon: FaMoneyBillWave },
];

const steps = [
  { id: 1, name: 'Shipping', icon: FaTruck },
  { id: 2, name: 'Payment', icon: FaCreditCard },
  { id: 3, name: 'Review', icon: FaCheckCircle },
];

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validatePhone = (phone) => {
  return String(phone).match(/^\+?[\d\s-]{10,}$/);
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const shipping = useSelector(selectCartShipping);
  const discount = useSelector(selectCartDiscount);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const totalAmount = useSelector(selectCartTotalAmount);
  
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderProcessing, setOrderProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    saveInfo: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Shipping Information Validation
    if (currentStep === 1) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        errors.phone = 'Invalid phone number';
      }
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.state.trim()) errors.state = 'State is required';
      if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
      if (!formData.country.trim()) errors.country = 'Country is required';
    }

    // Payment Information Validation
    if (currentStep === 2 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) errors.cardExpiry = 'Card expiry is required';
      if (!formData.cardCvc.trim()) errors.cardCvc = 'CVC is required';
    }

    return errors;
  };

  const handleContinue = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep(prev => prev + 1);
    } else {
      setFormErrors(errors);
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setOrderProcessing(true);
      try {
        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/order-success');
      } catch (error) {
        toast.error('Failed to process order. Please try again.');
        setOrderProcessing(false);
      }
    } else {
      setFormErrors(errors);
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/cart');
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const renderFormField = (label, name, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent
          dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
          ${formErrors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
      />
      {formErrors[name] && (
        <p className="mt-1 text-sm text-red-500">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="hidden sm:block ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {step.name}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    currentStep > step.id 
                      ? 'bg-red-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderFormField('First Name', 'firstName')}
                    {renderFormField('Last Name', 'lastName')}
                    {renderFormField('Email', 'email', 'email')}
                    {renderFormField('Phone', 'phone', 'tel')}
                    {renderFormField('Address', 'address')}
                    {renderFormField('City', 'city')}
                    {renderFormField('State', 'state')}
                    {renderFormField('Postal Code', 'postalCode')}
                    {renderFormField('Country', 'country')}
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {paymentMethods.map(method => (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 ${
                          formData.paymentMethod === method.id
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-700'
                        }`}
                      >
                        <method.icon className="w-6 h-6 text-red-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      {renderFormField('Card Number', 'cardNumber', 'text', '1234 5678 9012 3456')}
                      <div className="grid grid-cols-2 gap-4">
                        {renderFormField('Expiry Date', 'cardExpiry', 'text', 'MM/YY')}
                        {renderFormField('CVC', 'cardCvc', 'text', '123')}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaShieldAlt className="w-5 h-5 text-green-500 mr-2" />
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order Review</h2>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain bg-white dark:bg-gray-600 rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Shipping Address
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.postalCode}<br />
                        {formData.country}
                      </p>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Payment Method
                      </h3>
                      <div className="flex items-center">
                        {paymentMethods.find(m => m.id === formData.paymentMethod)?.icon({ 
                          className: "w-6 h-6 text-red-500 mr-2" 
                        })}
                        <span className="text-gray-600 dark:text-gray-400">
                          {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={orderProcessing}
                    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {orderProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Order...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8"
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount ({appliedCoupon.discountPercentage}% off)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
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
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FaTruck className="w-4 h-4 mr-2" />
                  Estimated delivery: 2-4 business days
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FaLock className="w-4 h-4 mr-2" />
                  Secure checkout
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FaBox className="w-4 h-4 mr-2" />
                  Free returns within 30 days
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
