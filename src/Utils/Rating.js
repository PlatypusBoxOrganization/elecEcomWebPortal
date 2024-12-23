import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <span key={rating}>
            {value >= rating ? (
              <FaStar className="text-yellow-400 w-4 h-4" />
            ) : value >= rating - 0.5 ? (
              <FaStarHalfAlt className="text-yellow-400 w-4 h-4" />
            ) : (
              <FaRegStar className="text-gray-300 dark:text-gray-600 w-4 h-4" />
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>}
    </div>
  );
};

export default Rating;
