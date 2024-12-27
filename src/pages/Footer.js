import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaArrowRight,
  FaHeadphones,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

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
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 - About & Subscribe */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaHeadphones className="text-2xl" />
            <h2 className="text-2xl font-bold">Kullo</h2>
          </div>
          <p className="text-sm text-gray-300">Your trusted partner in hearing healthcare, providing innovative solutions for better hearing.</p>
          <div className="space-y-2">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm">Subscribe for hearing health tips and exclusive offers</p>
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

        {/* Column 2 - Contact & Support */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Contact & Support</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <p>123 Hearing Care Lane,<br/>Mumbai, MH 400001</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-gray-400" />
              <p>+91 800-123-4567</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-400" />
              <p>care@kullo.com</p>
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 3 - Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
            <li><Link to="/services" className="hover:text-gray-300">Our Services</Link></li>
            <li><Link to="/hearing-test" className="hover:text-gray-300">Free Hearing Test</Link></li>
            <li><Link to="/locations" className="hover:text-gray-300">Service Centers</Link></li>
            <li><Link to="/faq" className="hover:text-gray-300">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>

        {/* Column 4 - Services */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-6">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/hearing-tests" className="hover:text-gray-300">Hearing Tests</Link></li>
            <li><Link to="/hearing-aids" className="hover:text-gray-300">Hearing Aids</Link></li>
            <li><Link to="/custom-fitting" className="hover:text-gray-300">Custom Fitting</Link></li>
            <li><Link to="/maintenance" className="hover:text-gray-300">Repairs & Maintenance</Link></li>
            <li><Link to="/accessories" className="hover:text-gray-300">Accessories</Link></li>
            <li><Link to="/support" className="hover:text-gray-300">Support & Care</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 text-center text-sm text-gray-400">
        <p> {new Date().getFullYear()} Kullo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;