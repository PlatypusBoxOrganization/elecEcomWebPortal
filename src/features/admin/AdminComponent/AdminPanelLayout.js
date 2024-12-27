import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { logout } from '../../auth/authSlice';
import { FiHome, FiBox, FiShoppingBag, FiUsers, FiLogOut, FiSettings } from 'react-icons/fi';

const AdminPanelLayout = () => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FiHome className="w-5 h-5" /> },
    { path: '/admin/products', label: 'Products', icon: <FiBox className="w-5 h-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <FiShoppingBag className="w-5 h-5" /> },
    { path: '/admin/users', label: 'Users', icon: <FiUsers className="w-5 h-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Admin Header */}
        <div className="p-6 bg-red-600 text-white">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm mt-1 opacity-90">Welcome, {user?.name || 'Admin'}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-6 py-4 flex items-center space-x-3 ${
                location.pathname === item.path
                  ? 'bg-red-50 text-red-600 border-r-4 border-red-600'
                  : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
              } transition-all duration-200`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-4 flex items-center space-x-3 text-gray-600 hover:bg-red-50 hover:text-red-600 mt-4 border-t transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Admin Info Footer */}
        <div className="absolute bottom-0 w-64 p-4 bg-gray-50 border-t text-sm text-gray-600">
          <p>PlatypusBox Admin</p>
          <p className="text-xs mt-1 opacity-75">Version 1.0.0</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLayout;