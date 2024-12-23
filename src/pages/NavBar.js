import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaSun, FaMoon, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSlice";
import { useTheme } from "../context/ThemeContext";
import { selectLoggedInUser } from "../features/auth/authSlice";

const NavBar = () => {
  const cartItems = useSelector(selectCartItems);
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(selectLoggedInUser);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-black text-white py-2 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm">
            Special Offer! Get 50% OFF on All Electronics and Free Express Delivery{" "}
            <a href="#" className="underline font-semibold">
              ShopNow
            </a>
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              Exclusive
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
              <Link to="/contact" className="hover:text-red-500 transition-colors">
                Contact
              </Link>
              <Link to="/about" className="hover:text-red-500 transition-colors">
                About
              </Link>
              {!user && (
                <Link to="/signup" className="hover:text-red-500 transition-colors">
                  Sign Up
                </Link>
              )}
            </div>

            {/* Search and Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className={`w-64 py-2 pl-4 pr-10 rounded-md ${
                      darkMode 
                        ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                    } focus:outline-none`}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FaSearch className="w-4 h-4 text-gray-400" />
                  </button>
                </form>
              </div>

              {/* Icons */}
              <Link 
                to={user ? "/profile" : "/login"} 
                className="hover:text-red-500 transition-colors"
                title={user ? "View Profile" : "Login"}
              >
                <FaUser className="w-6 h-6" />
              </Link>

              <Link to="/wishlist" className="hover:text-red-500 transition-colors">
                <FaHeart className="w-6 h-6" />
              </Link>

              <Link to="/cart" className="relative hover:text-red-500 transition-colors">
                <FaShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleDarkMode}
                className="hover:text-red-500 transition-colors"
              >
                {darkMode ? (
                  <FaSun className="w-6 h-6" />
                ) : (
                  <FaMoon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
                <Link to="/contact" className="hover:text-red-500 transition-colors">
                  Contact
                </Link>
                <Link to="/about" className="hover:text-red-500 transition-colors">
                  About
                </Link>
                {!user && (
                  <Link to="/signup" className="hover:text-red-500 transition-colors">
                    Sign Up
                  </Link>
                )}
                
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className={`w-full py-2 pl-4 pr-10 rounded-md ${
                      darkMode 
                        ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                    } focus:outline-none`}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FaSearch className="w-4 h-4 text-gray-400" />
                  </button>
                </form>

                {/* Mobile Icons */}
                <div className="flex items-center space-x-6 pt-4">
                  <Link 
                    to={user ? "/profile" : "/login"} 
                    className="hover:text-red-500 transition-colors"
                    title={user ? "View Profile" : "Login"}
                  >
                    <FaUser className="w-6 h-6" />
                  </Link>
                  
                  <Link to="/wishlist" className="hover:text-red-500 transition-colors">
                    <FaHeart className="w-6 h-6" />
                  </Link>

                  <Link to="/cart" className="relative hover:text-red-500 transition-colors">
                    <FaShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={toggleDarkMode}
                    className="hover:text-red-500 transition-colors"
                  >
                    {darkMode ? (
                      <FaSun className="w-6 h-6" />
                    ) : (
                      <FaMoon className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
