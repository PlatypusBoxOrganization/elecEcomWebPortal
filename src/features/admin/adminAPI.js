// Mock data for development
const mockStats = {
  totalProducts: 120,
  totalOrders: 45,
  totalUsers: 850,
  totalRevenue: 45850,
  productGrowth: 12,
  orderGrowth: 8,
  userGrowth: 15,
  revenueGrowth: 10,
};

const mockActivity = [
  {
    id: 1,
    type: 'order',
    title: 'New order #1234',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 2,
    type: 'product',
    title: 'Product stock updated',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 3,
    type: 'user',
    title: 'New user registration',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: 'new',
  },
];

export function fetchDashboardStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockStats });
    }, 500);
  });
}

export function fetchRecentActivity() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockActivity });
    }, 500);
  });
}

// Products API
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          products: [
            {
              id: 1,
              name: 'iPhone 13',
              category: 'Smartphones',
              price: 79999,
              stock: 50,
              status: 'active',
            },
            {
              id: 2,
              name: 'Samsung TV',
              category: 'Electronics',
              price: 45999,
              stock: 30,
              status: 'active',
            },
            // Add more mock products
          ],
          total: 120,
        },
      });
    }, 500);
  });
}

export function addProduct(productData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: Math.floor(Math.random() * 1000),
          ...productData,
          status: 'active',
        },
      });
    }, 500);
  });
}

export function updateProduct(id, productData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id,
          ...productData,
        },
      });
    }, 500);
  });
}

export function deleteProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true, id } });
    }, 500);
  });
}

// Orders API
export function fetchOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          orders: [
            {
              id: 1,
              customerName: 'John Doe',
              total: 79999,
              status: 'pending',
              date: new Date().toISOString(),
            },
            // Add more mock orders
          ],
          total: 45,
        },
      });
    }, 500);
  });
}

// Users API
export function fetchUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          users: [
            {
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              role: 'user',
              status: 'active',
            },
            // Add more mock users
          ],
          total: 850,
        },
      });
    }, 500);
  });
}