import React from "react";
import saleImg1 from "../Assets/saleImg1.jpg"
import saleImg2 from "../Assets/saleImg2.jpg";
import saleImg3 from "../Assets/saleImg3.webp";
import saleImg4 from "../Assets/Wearable.jpg";
const SalesSection = () => {
  const products = [
    {
      id: 1,
      discount: "-40%",
      image: `${saleImg1}`, // Replace with real image URLs
      name: "HAVIT HV-G92 Gamepad",
      price: "$120",
      originalPrice: "$160",
      rating: 88,
    },
    {
      id: 2,
      discount: "-35%",
      image: `${saleImg2}`,
      name: "AK-900 Wired Keyboard",
      price: "$960",
      originalPrice: "$1160",
      rating: 75,
    },
    {
      id: 3,
      discount: "-30%",
      image: `${saleImg3}`,
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      originalPrice: "$400",
      rating: 99,
    },
    {
      id: 4,
      discount: "-25%",
      image: `${saleImg4}`,
      name: "Apple Watch Series 8",
      price: "$9975",
      originalPrice: "$400",
      rating: 99,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-red-500 font-bold text-4xl mb-6">Today's</h3>
          <h2 className="text-2xl font-bold">Flash Sales</h2>
        </div>
        {/* Countdown Timer */}
        <div className="flex space-x-4 text-center">
          {/* {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => (
            <div key={index}>
              <p className="text-5xl font-bold">30</p>
              <span className="text-sm">{unit}</span>
            </div>
          ))} */}
        </div>
      </div>

      {/* Products Section */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 relative group hover:shadow-lg"
            >
              {/* Discount Badge */}
              <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              {/* Product Details */}
              <div className="mt-4">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-red-500 font-bold">
                      {product.price}
                    </span>
                    <span className="text-gray-400 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  </div>
                  <span className="text-yellow-500 text-sm">{`⭐(${product.rating})`}</span>
                </div>
              </div>
              {/* Add to Cart Button */}
              <button className="mt-4 bg-black text-white text-sm w-full py-2 rounded hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Add To Cart
              </button>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default SalesSection;
