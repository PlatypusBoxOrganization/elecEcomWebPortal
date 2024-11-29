import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  selectAllProducts,
  selectProductListStatus,
  fetchAllProductAsync,
} from "../features/product/productSlice";
import ProductCard from "../features/product/productComponent/ProductCard";
// const products = [
//   {
//     id: 1,
//     name: "Breed Dry Dog Food",
//     price: "$100",
//     rating: 3.5,
//     reviews: 35,
//     image: "dog-food.png", // Replace with the image URL or path
//     isNew: false,
//   },
//   {
//     id: 2,
//     name: "CANON EOS DSLR Camera",
//     price: "$360",
//     rating: 4.5,
//     reviews: 95,
//     image: "camera.png",
//     isNew: false,
//   },
//   {
//     id: 3,
//     name: "ASUS FHD Gaming Laptop",
//     price: "$700",
//     rating: 5,
//     reviews: 325,
//     image: "laptop.png",
//     isNew: false,
//   },
//   {
//     id: 4,
//     name: "Curology Product Set",
//     price: "$500",
//     rating: 4.5,
//     reviews: 145,
//     image: "curology.png",
//     isNew: false,
//   },
//   {
//     id: 5,
//     name: "Kids Electric Car",
//     price: "$960",
//     rating: 4.5,
//     reviews: 65,
//     image: "car.png",
//     isNew: true,
//   },
//   {
//     id: 6,
//     name: "Jr. Zoom Soccer Cleats",
//     price: "$1160",
//     rating: 4.5,
//     reviews: 35,
//     image: "cleats.png",
//     isNew: true,
//   },
//   {
//     id: 7,
//     name: "GP11 Shooter USB Gamepad",
//     price: "$660",
//     rating: 4.5,
//     reviews: 55,
//     image: "gamepad.png",
//     isNew: true,
//   },
//   {
//     id: 8,
//     name: "Quilted Satin Jacket",
//     price: "$660",
//     rating: 4.5,
//     reviews: 55,
//     image: "jacket.png",
//     isNew: false,
//   },
// ];
  
const OurProducts = () => {
      const dispatch = useDispatch();
      const products = useSelector(selectAllProducts);
      useEffect(() => {
        // const pagination = { _page: page, _limit: 10 };
        dispatch(fetchAllProductAsync());
      }, [dispatch]);
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-red-500 font-bold text-4xl mb-6">Our Products </h3>
            <h2 className="text-2xl font-bold">Explore Our Product</h2>
          </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default OurProducts;
