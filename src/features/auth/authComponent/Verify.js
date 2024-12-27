import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && isResending) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResending(false);
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [timer, isResending]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = otp.join('');
    if (verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      // Here you'll integrate with your backend
      console.log('Verification code:', verificationCode);
      
      // Simulating success for now
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('Invalid verification code');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleResendOTP = () => {
    if (isResending) return;
    
    setIsResending(true);
    // Here you'll integrate resend OTP functionality
    console.log('Resending OTP...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {email ? (
              <>We've sent a code to {email}</>
            ) : (
              <>Please enter the verification code sent to your email</>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-md bg-red-50 p-4 flex items-center"
              >
                <FiX className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-md bg-green-50 p-4 flex items-center"
              >
                <FiCheck className="h-5 w-5 text-green-400 mr-2" />
                <p className="text-sm text-green-600">Verification successful!</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2 justify-center">
            {otp.map((data, index) => (
              <motion.input
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-300 focus:border-red-500 focus:ring-red-500 spin-button-none"
              />
            ))}
          </div>

          <div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Verify Email
            </motion.button>
          </div>

          <div className="text-center">
            <button
              type="button"
              disabled={isResending}
              onClick={handleResendOTP}
              className={`text-sm ${
                isResending 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-red-600 hover:text-red-500'
              }`}
            >
              {isResending 
                ? `Resend code in ${timer}s` 
                : "Didn't receive the code? Resend"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Verify;
