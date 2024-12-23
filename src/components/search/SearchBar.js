import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Mock results
        const mockResults = [
          { id: 1, name: 'LCD Monitor', price: 650 },
          { id: 2, name: 'Gaming Headset', price: 150 },
          { id: 3, name: 'Wireless Mouse', price: 80 }
        ].filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 pr-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && (query || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((result) => (
                  <motion.li
                    key={result.id}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="p-3 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      navigate(`/productDetail/${result.id}`);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{result.name}</span>
                      <span className="text-red-500">${result.price}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : query ? (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
