import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, createUserAsync } from "../authSlice";
import SUI from "../../../Assets/side-image.png";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTheme } from '../../../context/ThemeContext';

const Signup = () => {
  const { darkMode } = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } }
  };

  // Define reusable styles
  const inputStyles =
    "block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-500 dark:focus:ring-red-500 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors duration-200";
  const labelStyles = "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-200";

  // Form fields configuration
  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      validation: { 
        required: "Name is Required",
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters"
        }
      },
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      },
    },
    {
      id: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Create a password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters"
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          message: "Password must contain at least one letter and one number"
        }
      },
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm your password",
      validation: {
        required: "Please confirm your password",
        validate: (value) => value === watch('password') || "Passwords do not match"
      },
    },
  ];

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        createUserAsync({
          email: data.email,
          password: data.password,
          addresses: [],
          role: "user",
          name: data.name,
        })
      ).unwrap();

      if (response?.error) {
        setErrorMessage("You are already registered. Please login.");
        setSuccessMessage("");
      } else {
        setSuccessMessage("Signup successful! Please verify your account.");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred during signup. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      >
        <div className="max-w-6xl w-full space-y-8 flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* Left side - Form */}
          <motion.div 
            variants={formVariants}
            className="w-full lg:w-1/2 px-8 py-12 lg:px-12"
          >
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200">
                Create an Account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Please fill in your details to get started
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className={labelStyles}>
                    {field.label}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id={field.id}
                      {...register(field.id, field.validation)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className={inputStyles}
                    />
                    {(field.id === 'password' || field.id === 'confirmPassword') && (
                      <button
                        type="button"
                        onClick={() => field.id === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 transition-colors duration-200"
                      >
                        {(field.id === 'password' ? showPassword : showConfirmPassword) ? (
                          <AiOutlineEyeInvisible className="h-5 w-5" />
                        ) : (
                          <AiOutlineEye className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>
                  {errors[field.id]?.message && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 transition-colors duration-200"
                    >
                      {errors[field.id].message}
                    </motion.p>
                  )}
                </div>
              ))}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 transition-colors duration-200"
                >
                  <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md bg-green-50 dark:bg-green-900/30 p-4 transition-colors duration-200"
                >
                  <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
                </motion.div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Right side - Image */}
          <motion.div 
            variants={formVariants}
            className="hidden lg:block lg:w-1/2 relative"
          >
            <img
              src={SUI}
              alt="Signup illustration"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Signup;
