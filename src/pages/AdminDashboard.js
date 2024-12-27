import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { 
  fetchDashboardStatsAsync, 
  fetchRecentActivityAsync,
  selectAdminStats,
  selectRecentActivity,
  selectAdminStatus 
} from '../features/admin/adminSlice';
import { formatDistanceToNow } from 'date-fns';
import { FiBox, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const stats = useSelector(selectAdminStats);
  const recentActivity = useSelector(selectRecentActivity);
  const status = useSelector(selectAdminStatus);

  useEffect(() => {
    dispatch(fetchDashboardStatsAsync());
    dispatch(fetchRecentActivityAsync());
  }, [dispatch]);

  // Redirect if not admin
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      growth: stats.productGrowth,
      icon: <FiBox className="w-8 h-8 text-blue-500" />,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.orderGrowth,
      icon: <FiShoppingBag className="w-8 h-8 text-green-500" />,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      growth: stats.userGrowth,
      icon: <FiUsers className="w-8 h-8 text-purple-500" />,
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: <FiDollarSign className="w-8 h-8 text-yellow-500" />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-800 bg-yellow-100';
      case 'completed':
        return 'text-green-800 bg-green-100';
      case 'new':
        return 'text-blue-800 bg-blue-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  if (status === 'loading') {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <p className={`text-sm mt-2 ${card.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {card.growth >= 0 ? '↑' : '↓'} {Math.abs(card.growth)}% from last month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">
                  {activity.timestamp ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) : 'Just now'}
                </p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(activity.status)}`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
