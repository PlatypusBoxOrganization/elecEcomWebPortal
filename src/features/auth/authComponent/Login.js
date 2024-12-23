import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SUI from "../../../Assets/side-image.png"
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTheme } from '../../../context/ThemeContext';

const Login = () => {
  const { darkMode } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const [showPassword, setShowPassword] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } }
  };

  // Define reusable styles
  const inputStyles =
    "block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-500 dark:focus:ring-red-500 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 transition-colors duration-200";
  const labelStyles = "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-200";

  // Form fields configuration
  const formFields = [
    {
      id: "email",
      label: "Email address",
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
      placeholder: "Enter your password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters"
        }
      },
    },
  ];

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      >
        <div className="max-w-6xl w-full space-y-8 flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* Left side - Image */}
          <motion.div 
            variants={formVariants}
            className="hidden lg:block lg:w-1/2 relative"
          >
            <img
              src={SUI}
              alt="Login illustration"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Right side - Form */}
          <motion.div 
            variants={formVariants}
            className="w-full lg:w-1/2 px-8 py-12 lg:px-12"
          >
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200">
                Welcome Back!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                Please sign in to your account
              </p>
            </div>

            <form
              className="mt-8 space-y-6"
              noValidate
              onSubmit={handleSubmit((data) =>
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                )
              )}
            >
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
                    {field.id === 'password' && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 transition-colors duration-200"
                      >
                        {showPassword ? (
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300 transition-colors duration-200">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 transition-colors duration-200"
                >
                  <p className="text-sm text-red-600 dark:text-red-400">{error.message || error.error}</p>
                </motion.div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors duration-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
                    <span className="ml-2">Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook logo" />
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
