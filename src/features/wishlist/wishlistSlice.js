import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push(newItem);
        toast.success('Added to wishlist!');
      } else {
        toast.error('Item already in wishlist!');
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      toast.success('Removed from wishlist!');
    },

    clearWishlist: (state) => {
      state.items = [];
      toast.success('Wishlist cleared!');
    },

    moveToCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      toast.success('Moved to cart!');
    },

    toggleWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== newItem.id);
        toast.success('Removed from wishlist!');
      } else {
        state.items.push(newItem);
        toast.success('Added to wishlist!');
      }
    },
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist,
  moveToCart,
  toggleWishlist
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistItemCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (id) => (state) => 
  state.wishlist.items.some(item => item.id === id);

export default wishlistSlice.reducer;
