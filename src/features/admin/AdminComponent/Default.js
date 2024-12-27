import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

const Default = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {pageName.charAt(0).toUpperCase() + pageName.slice(1)} Management Coming Soon
      </h2>
      <p className="text-gray-600 max-w-md">
        We're working hard to bring you a great {pageName} management experience. 
        This feature will be available soon!
      </p>
    </div>
  );
};

export default Default;