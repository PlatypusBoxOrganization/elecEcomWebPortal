import React from "react";
import NavBar from "./NavBar";
import CategorySection from "../Utils/CategorySection";
import SalesSection from "../Utils/SalesSection";
import BestSelling from "../Utils/BestSelling";
import NewArrivals from "../Utils/NewArrivals";
import FeatureComponent from "../Utils/FeatureComponent";
import DealsSlider from "../Utils/DealsSlider";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <NavBar />

      {/* Deals Slider */}
      <div className="mb-8">
        <DealsSlider />
      </div>

      {/* Hero Section with Sales */}
      <div className="mb-12">
        <SalesSection />
      </div>

      {/* Categories */}
      <div className="mb-12">
        <CategorySection />
      </div>

      {/* Best Selling Products */}
      <div className="mb-12">
        <BestSelling />
      </div>

      {/* New Arrivals */}
      <div className="mb-12">
        <NewArrivals />
      </div>

      {/* Featured Products */}
      <div>
        <FeatureComponent />
      </div>
    </div>
  );
};

export default HomePage;
