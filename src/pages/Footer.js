import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import QrCode from '../Assets/QrCode.png';
import GooglePlay from '../Assets/GooglePlay.png';
import AppStore from '../Assets/AppStore.png';

const Footer = () => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implement subscription logic
    setEmail('');
  };

  return (
    <footer className={`${darkMode ? 'bg-black text-white' : 'bg-black text-white'} py-16`}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Column 1 - Subscribe */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Exclusive</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">Subscribe</h3>
            <p className="text-sm">Get 10% off your first order</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border border-white/20 rounded px-4 py-2 text-sm focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <FaArrowRight className="text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Column 2 - Support */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Support</h3>
          <div className="space-y-2 text-sm">
            <p>111 Bijoy sarani, Dhaka,</p>
            <p>DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
        </div>

        {/* Column 3 - Account */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/profile" className="hover:text-gray-300">My Account</Link></li>
            <li><Link to="/login" className="hover:text-gray-300">Login / Register</Link></li>
            <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-gray-300">Wishlist</Link></li>
            <li><Link to="/shop" className="hover:text-gray-300">Shop</Link></li>
          </ul>
        </div>

        {/* Column 4 - Quick Link */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gray-300">Terms Of Use</Link></li>
            <li><Link to="/faq" className="hover:text-gray-300">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>

        {/* Column 5 - Download App */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Download App</h3>
          <div className="space-y-4">
            <p className="text-xs text-gray-400">Save $3 with App New User Only</p>
            <div className="flex space-x-4">
              <div className="w-24 h-24">
                <img src={QrCode} alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2">
                <a href="#" className="block w-32">
                  <img src={GooglePlay} alt="Get it on Google Play" className="w-full" />
                </a>
                <a href="#" className="block w-32">
                  <img src={AppStore} alt="Download on the App Store" className="w-full" />
                </a>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
              <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 text-center text-sm text-gray-400">
        <p> 2022 ElecShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;