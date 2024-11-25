import React from "react";
import { useNavigate } from "react-router-dom";
import {
  mobile,
  camera,
  desktop,
  clock,
  headphone,
  gamepad,
} from "../Utils/Icon";

const CategorySection = () => {
  const navigate = useNavigate();

  // List of categories with Heroicons
  const categories = [
    { id: 1, name: "Phones", icon: mobile, route: "/category/phones" },
    { id: 2, name: "Computers", icon: desktop, route: "/category/computers" },
    { id: 3, name: "SmartWatch", icon: clock, route: "/category/smartwatch" },
    { id: 4, name: "Camera", icon: camera, route: "/category/camera" },
    {
      id: 5,
      name: "HeadPhones",
      icon: headphone,
      route: "/category/headphones",
    },
    { id: 6, name: "Gaming", icon: gamepad, route: "/category/gaming" },
  ];

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-red-500 text-3xl mb-5 font-bold">Categories</h3>
        <h2 className="text-2xl font-bold">Browse By Category</h2>
      </div>

      {/* Category Cards */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.route)}
              className="border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-red-500 transition-all duration-300"
            >
              <div
                className="p-4 rounded-full "
              >
                {/* Heroicon */}
                <category.icon className="h-8 w-8" />
              </div>
              <p className="mt-2 font-semibold">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {/* <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
          <i className="fas fa-chevron-right"></i>
        </button> */}
      </div>
    </section>
  );
};

export default CategorySection;
