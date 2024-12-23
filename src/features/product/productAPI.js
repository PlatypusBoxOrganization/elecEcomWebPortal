// Product mock data
const mockProducts = [
  // Gaming
  {
    _id: 'havit-g92',
    name: 'HAVIT HV-G92 Gamepad',
    brand: 'HAVIT',
    price: 160,
    discountPrice: 120,
    discountPercentage: 40,
    rating: 4.5,
    numReviews: 88,
    stock: 50,
    category: 'Gaming',
    images: [{ url: 'https://example.com/havit-g92.jpg' }],
    description: 'Professional gaming controller with precise controls and ergonomic design',
    features: [
      'Ergonomic Design',
      'Dual Vibration',
      'USB Wired Connection',
      'Compatible with PC & PS3'
    ],
    specs: {
      'Connection': 'USB Wired',
      'Compatible': 'PC, PS3',
      'Cable Length': '2m',
      'Weight': '200g'
    }
  },
  // Accessories
  {
    _id: 'ak900',
    name: 'AK-900 Wired Keyboard',
    brand: 'AK',
    price: 1160,
    discountPrice: 960,
    discountPercentage: 35,
    rating: 4.2,
    numReviews: 75,
    stock: 30,
    category: 'Accessories',
    images: [{ url: 'https://example.com/ak900.jpg' }],
    description: 'Compact wireless keyboard with comfortable typing experience',
    features: [
      'Wireless Connection',
      'Compact Design',
      'Long Battery Life',
      'Multi-device Support'
    ],
    specs: {
      'Type': 'Mechanical',
      'Switch': 'Blue Switch',
      'Battery': '3000mAh',
      'Connection': 'Bluetooth 5.0'
    }
  },
  // Monitors
  {
    _id: 'gaming-monitor',
    name: 'IPS LCD Gaming Monitor',
    brand: 'ViewSonic',
    price: 400,
    discountPrice: 370,
    discountPercentage: 30,
    rating: 4.8,
    numReviews: 99,
    stock: 15,
    category: 'Monitors',
    images: [{ url: 'https://example.com/gaming-monitor.jpg' }],
    description: '24" Full HD gaming monitor with 180Hz refresh rate',
    features: [
      '180Hz Refresh Rate',
      'Full HD Resolution',
      '1ms Response Time',
      'AMD FreeSync'
    ],
    specs: {
      'Screen Size': '24 inch',
      'Resolution': '1920x1080',
      'Panel': 'IPS',
      'Ports': 'HDMI, DisplayPort'
    }
  },
  // SmartWatch
  {
    _id: 'galaxy-watch5',
    name: 'Galaxy Watch 5 Pro',
    brand: 'Samsung',
    price: 800,
    discountPrice: 650,
    discountPercentage: 25,
    rating: 4.7,
    numReviews: 95,
    stock: 25,
    category: 'SmartWatch',
    images: [{ url: 'https://example.com/galaxy-watch5.jpg' }],
    description: 'Advanced smartwatch with comprehensive health tracking',
    features: [
      'Health Tracking',
      'GPS Navigation',
      'Water Resistant',
      'Long Battery Life'
    ],
    specs: {
      'Display': 'Super AMOLED',
      'Battery': '590mAh',
      'OS': 'Wear OS',
      'Sensors': 'Heart Rate, SpO2'
    }
  },
  // Add more products...
];

// Helper functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function filterProducts(products, category, sort, search) {
  let filtered = [...products];

  // Apply category filter
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      break;
    case 'price-desc':
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      filtered.sort((a, b) => b.numReviews - a.numReviews);
      break;
    default:
      break;
  }

  return filtered;
}

// API functions
export async function fetchProductById(id) {
  await delay(500);
  return mockProducts.find(p => p._id === id);
}

export async function fetchAllProduct() {
  await delay(500);
  return mockProducts;
}

export async function fetchProductsByFilter(category, page = 1, limit = 10, sort = 'rating', search = '') {
  await delay(500);

  const filtered = filterProducts(mockProducts, category, sort, search);
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const products = filtered.slice(startIndex, endIndex);

  return {
    products,
    totalItems,
    currentPage: page,
    totalPages,
  };
}

export async function createProduct(productData) {
  await delay(500);
  const newProduct = {
    _id: Date.now().toString(),
    ...productData,
  };
  mockProducts.push(newProduct);
  return newProduct;
}

export async function updateProduct(productData) {
  await delay(500);
  const index = mockProducts.findIndex(p => p._id === productData._id);
  if (index !== -1) {
    mockProducts[index] = { ...mockProducts[index], ...productData };
    return mockProducts[index];
  }
  throw new Error('Product not found');
}
