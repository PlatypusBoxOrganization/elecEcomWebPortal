import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../Utils/Rating"; 
const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <>
     <Link
        to={`/productDetail/${product._id}`}
        key={product._id}
        className="group"
      >
        {!product.deleted && (
          <div className="pro ">
            <div className="w-full aspect-h-1 aspect-w-2 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-4 xl:aspect-w-7">
              <img
                src={`/images/${product.images[0].url}`} // Ensure the URL is correctly constructed
                alt={product.name}
                className="h-full w-full object-contain bg-white group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <div className="Price align-items flex flex-row">
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.discountPrice}
              </p>
              <p className="mt-1 text-lg pl-3 font-medium text-gray-500 line-through">
                {product.price}Rs
              </p>
              <p className="mt-1 text-lg pl-3 font-medium text-green-500">
                {product.discountPercentage}%
              </p>
            </div>

            <div className="mt-2 Rating flex inline-flex justify-between">
              <p>{product.rating}</p>
              <Rating value={product.rating} />
              <p className="mt-0 pl-3 text-sm text-gray-700">
                from {product.numReviews} Reviews
              </p>
            </div>
            <div className="outOfStock">
              {product.stock <= 0 && (
                <p className="mt-0 pt-4 text-lg text-red-700">Out Of Stock</p>
              )}
            </div>
          </div>
        )}
      </Link> 
    
    </>
  );
};

export default ProductCard;
