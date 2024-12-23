import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const TAX_RATE = 0.1; // 10% tax rate
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 10;

const initialState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  tax: 0,
  shippingCost: 0,
  totalAmount: 0,
  appliedCoupon: null,
  discountAmount: 0,
};

// Utility functions
const calculateTotals = (items) => {
  const subtotal = items.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  return {
    subtotal,
    tax,
    shippingCost,
    totalAmount: subtotal + tax + shippingCost
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const itemId = newItem.id || newItem._id; // Handle both id formats
      const existingItem = state.items.find(item => (item.id || item._id) === itemId);

      try {
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.totalPrice = (existingItem.discountPrice || existingItem.price) * existingItem.quantity;
          toast.success('Item quantity updated!');
        } else {
          // Ensure consistent ID format
          const itemToAdd = {
            ...newItem,
            id: itemId, // Use a single id field
            quantity: 1,
            totalPrice: newItem.discountPrice || newItem.price,
            stockQuantity: newItem.stockQuantity || 99, // Default stock if not provided
          };
          state.items.push(itemToAdd);
          toast.success('Added to cart!');
        }

        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      } catch (error) {
        toast.error('Failed to add item to cart');
        console.error('Error adding item to cart:', error);
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      try {
        const itemToRemove = state.items.find(item => (item.id || item._id) === itemId);
        if (itemToRemove) {
          state.items = state.items.filter(item => (item.id || item._id) !== itemId);
          state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
          const totals = calculateTotals(state.items);
          Object.assign(state, totals);
          toast.success('Item removed from cart!');
        }
      } catch (error) {
        toast.error('Failed to remove item from cart');
        console.error('Error removing item from cart:', error);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      try {
        const item = state.items.find(item => (item.id || item._id) === id);
        
        if (item) {
          if (quantity <= 0) {
            state.items = state.items.filter(i => (i.id || i._id) !== id);
            toast.success('Item removed from cart!');
          } else {
            const maxQuantity = item.stockQuantity || 99;
            item.quantity = Math.min(Math.max(1, quantity), maxQuantity);
            item.totalPrice = (item.discountPrice || item.price) * item.quantity;
            
            if (quantity > maxQuantity) {
              toast.error(`Only ${maxQuantity} items available in stock`);
            }
          }

          state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
          const totals = calculateTotals(state.items);
          Object.assign(state, totals);
        }
      } catch (error) {
        toast.error('Failed to update quantity');
        console.error('Error updating quantity:', error);
      }
    },

    clearCart: (state) => {
      try {
        state.items = [];
        state.totalQuantity = 0;
        state.subtotal = 0;
        state.tax = 0;
        state.shippingCost = 0;
        state.totalAmount = 0;
        state.appliedCoupon = null;
        state.discountAmount = 0;
        toast.success('Cart cleared!');
      } catch (error) {
        toast.error('Failed to clear cart');
        console.error('Error clearing cart:', error);
      }
    },

    applyCoupon: (state, action) => {
      const { code, discountPercentage } = action.payload;
      try {
        if (state.appliedCoupon) {
          toast.error('A coupon is already applied');
          return;
        }

        state.appliedCoupon = {
          code,
          discountPercentage
        };

        // Calculate discount
        state.discountAmount = (state.subtotal * discountPercentage) / 100;
        state.totalAmount = state.subtotal + state.tax + state.shippingCost - state.discountAmount;
        toast.success(`Coupon ${code} applied successfully!`);
      } catch (error) {
        toast.error('Failed to apply coupon');
        console.error('Error applying coupon:', error);
      }
    },

    removeCoupon: (state) => {
      try {
        if (state.appliedCoupon) {
          state.appliedCoupon = null;
          state.discountAmount = 0;
          const totals = calculateTotals(state.items);
          Object.assign(state, totals);
          toast.success('Coupon removed successfully!');
        }
      } catch (error) {
        toast.error('Failed to remove coupon');
        console.error('Error removing coupon:', error);
      }
    },
  },
});

// Action creators
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  applyCoupon,
  removeCoupon
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartShipping = (state) => state.cart.shippingCost;
export const selectCartDiscount = (state) => state.cart.discountAmount;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectAppliedCoupon = (state) => state.cart.appliedCoupon;
export const selectIsCartEmpty = (state) => state.cart.items.length === 0;
export const selectShippingStatus = (state) => ({
  isFreeShipping: state.cart.subtotal >= FREE_SHIPPING_THRESHOLD,
  remainingForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - state.cart.subtotal)
});

export default cartSlice.reducer;
