import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchProductByFilterAsync, selectAllProducts, selectFilters, setFilters } from '../features/product/productSlice';
import NavBar from './NavBar';
import Footer from './Footer';
import { FaStar, FaFilter } from 'react-icons/fa';

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const sort = searchParams.get('sort') || 'price_asc';
    const search = searchParams.get('search') || '';

    dispatch(fetchProductByFilterAsync({ category, page, limit, sort, search }));
  }, [dispatch, category, searchParams]);

  const filterOptions = {
    style: ['Behind-the-Ear (BTE)', 'In-the-Ear (ITE)', 'In-the-Canal (ITC)', 'Completely-in-Canal (CIC)'],
    batteryType: ['Rechargeable', 'Size 10', 'Size 13', 'Size 312', 'Size 675'],
    connectivity: ['Bluetooth', 'Wireless', '2.4 GHz', 'Made for iPhone', 'Made for Android'],
    features: ['Noise Cancellation', 'Speech Enhancement', 'Feedback Cancellation', 'Wind Noise Reduction', 'Tinnitus Management'],
    priceRange: [
      { min: 0, max: 10000, label: 'Under ₹10,000' },
      { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
      { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
      { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000' },
      { min: 100000, max: 500000, label: 'Above ₹1,00,000' },
    ],
  };

  const handleFilterChange = (filterType, value) => {
    let newFilters;
    if (filterType === 'priceRange') {
      newFilters = { ...filters, [filterType]: value };
    } else {
      const currentFilters = filters[filterType];
      if (currentFilters.includes(value)) {
        newFilters = {
          ...filters,
          [filterType]: currentFilters.filter(item => item !== value),
        };
      } else {
        newFilters = {
          ...filters,
          [filterType]: [...currentFilters, value],
        };
      }
    }
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {category ? category.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, l => l.toUpperCase()) : 'All Products'}
          </h1>

          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FaFilter className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block">
            <div className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType} className="pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                    {filterType.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {options.map((option) => {
                      const value = typeof option === 'object' ? option : { label: option, value: option };
                      return (
                        <div key={value.label} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters[filterType].includes(value.value || value.label)}
                            onChange={() => handleFilterChange(filterType, value.value || value.label)}
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400 focus:ring-red-500 dark:focus:ring-red-400"
                          />
                          <label className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                            {value.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product._id} className="group relative">
                  <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                    <div className="mt-1 flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.floor(product.ratings)
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                        ({product.reviews?.length || 0})
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                      {product.discountPercentage > 0 && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 line-through">
                          ₹{(product.price * (1 + product.discountPercentage/100)).toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;
