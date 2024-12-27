import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardStats, fetchRecentActivity, fetchProducts, addProduct, updateProduct, deleteProduct } from './adminAPI';

const initialState = {
  stats: {
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    productGrowth: 0,
    orderGrowth: 0,
    userGrowth: 0,
    revenueGrowth: 0,
  },
  recentActivity: [],
  products: [],
  totalProducts: 0,
  status: 'idle',
  error: null,
};

export const fetchDashboardStatsAsync = createAsyncThunk(
  'admin/fetchStats',
  async () => {
    const response = await fetchDashboardStats();
    return response.data;
  }
);

export const fetchRecentActivityAsync = createAsyncThunk(
  'admin/fetchActivity',
  async () => {
    const response = await fetchRecentActivity();
    return response.data;
  }
);

export const fetchProductsAsync = createAsyncThunk(
  'admin/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  'admin/addProduct',
  async (productData) => {
    const response = await addProduct(productData);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, productData }) => {
    const response = await updateProduct(id, productData);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'admin/deleteProduct',
  async (id) => {
    const response = await deleteProduct(id);
    return { id, ...response.data };
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStatsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStatsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecentActivityAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecentActivityAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivityAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
        state.totalProducts += 1;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = state.products.filter(p => p.id !== action.payload.id);
        state.totalProducts -= 1;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;

export const selectAdminStats = (state) => state.admin.stats;
export const selectRecentActivity = (state) => state.admin.recentActivity;
export const selectAdminStatus = (state) => state.admin.status;
export const selectAdminError = (state) => state.admin.error;

export const selectProducts = (state) => state.admin.products;
export const selectTotalProducts = (state) => state.admin.totalProducts;

export default adminSlice.reducer;
