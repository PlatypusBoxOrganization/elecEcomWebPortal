import React from 'react';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Rating = ({ value, total = 5, size = 'md', onRate, interactive = false }) => {
  const getStarIcon = (index) => {
    const remainder = value - index;
    if (remainder >= 1) return FaStar;
    if (remainder > 0) return FaStarHalf;
    return FaRegStar;
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const handleClick = (newRating) => {
    if (interactive && onRate) {
      onRate(newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: total }, (_, index) => {
        const StarIcon = getStarIcon(index);
        return (
          <motion.button
            key={index}
            whileHover={interactive ? { scale: 1.1 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => handleClick(index + 1)}
            className={`text-yellow-400 ${sizeClasses[size]} ${
              interactive ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <StarIcon />
          </motion.button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 text-gray-600">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
