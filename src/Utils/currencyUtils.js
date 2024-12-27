// Current USD to INR conversion rate (as of December 2023)
const USD_TO_INR = 83.20;

// Format price in INR
export const formatIndianPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Convert USD to INR
export const convertUSDtoINR = (usdPrice) => {
  return Math.round(usdPrice * USD_TO_INR);
};

// Format and convert price from USD to INR
export const formatPrice = (price, currency = 'USD') => {
  if (currency === 'USD') {
    // If price is in USD, convert to INR first
    const inrPrice = convertUSDtoINR(price);
    return formatIndianPrice(inrPrice);
  }
  // If price is already in INR
  return formatIndianPrice(price);
};
