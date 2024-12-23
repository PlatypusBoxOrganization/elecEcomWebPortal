import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import Rating from '../../components/ui/Rating';
import Pagination from '../../components/ui/Pagination';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock results
        const mockResults = Array.from({ length: 12 }, (_, index) => ({
          id: index + 1,
          name: `Product ${index + 1}`,
          description: `Description for Product ${index + 1}`,
          price: Math.floor(Math.random() * 1000) + 50,
          rating: (Math.random() * 2 + 3).toFixed(1),
          image: 'https://via.placeholder.com/200',
        }));

        setResults(mockResults);
        setTotalPages(3); // Mock total pages
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, currentPage]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FaSearch className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">No search query provided</h2>
        <p className="text-gray-600">
          Please enter a search term to find products
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {results.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-500 font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                    <Rating value={parseFloat(product.rating)} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <FaSearch className="mx-auto text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">No results found</h2>
          <p className="text-gray-600">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
