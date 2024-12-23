import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectTotalItems,
  selectProductListStatus,
  fetchProductByFilterAsync,
} from "../productSlice";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { FaSortAmountDown } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMobileAlt, 
  FaLaptop, 
  FaHeadphones, 
  FaGamepad,
  FaCamera,
  FaTablet
} from "react-icons/fa";

const sortOptions = [
  { name: "Most Popular", value: "rating", current: true },
  { name: "Price: Low to High", value: "price_asc", current: false },
  { name: "Price: High to Low", value: "price_desc", current: false },
  { name: "Newest First", value: "newest", current: false },
];

const categories = [
  {
    id: 1,
    name: "Phones",
    icon: FaMobileAlt,
    color: "bg-blue-100 text-blue-600",
    filter: "phones"
  },
  {
    id: 2,
    name: "Laptops",
    icon: FaLaptop,
    color: "bg-purple-100 text-purple-600",
    filter: "laptops"
  },
  {
    id: 3,
    name: "Audio",
    icon: FaHeadphones,
    color: "bg-green-100 text-green-600",
    filter: "audio"
  },
  {
    id: 4,
    name: "Gaming",
    icon: FaGamepad,
    color: "bg-red-100 text-red-600",
    filter: "gaming"
  },
  {
    id: 5,
    name: "Cameras",
    icon: FaCamera,
    color: "bg-yellow-100 text-yellow-600",
    filter: "cameras"
  },
  {
    id: 6,
    name: "Tablets",
    icon: FaTablet,
    color: "bg-pink-100 text-pink-600",
    filter: "tablets"
  }
];

function ProductSection() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(
      fetchProductByFilterAsync({
        page: currentPage,
        limit: itemsPerPage,
        sort: selectedSort.value,
        search: searchQuery,
        category: selectedCategory?.filter
      })
    );
  }, [dispatch, currentPage, selectedSort, searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory?.id === category.id ? null : category);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category)}
                className={`${category.color} ${
                  selectedCategory?.id === category.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                } p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all`}
              >
                <category.icon className="text-2xl" />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearch}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaSortAmountDown className="text-gray-400" />
                <span className="text-sm text-gray-700">{selectedSort.name}</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            onClick={() => handleSortChange(option)}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } ${
                              selectedSort.value === option.value
                                ? "text-blue-600"
                                : "text-gray-700"
                            } group flex w-full items-center px-4 py-2 text-sm`}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear category filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="relative min-h-[400px]">
          {status === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ThreeDots color="#4F46E5" height={50} width={50} />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ${product.discountPrice}
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalItems > itemsPerPage && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSection;
