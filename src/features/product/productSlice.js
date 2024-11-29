import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProduct,
  fetchProductById,
  fetchProductsByFilter,
} from "./productAPI";
// fetchAllProducts,
const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: {},
  error: null,
  loading: false,
};

//FETCH PRODUCT BY GIVEN ID
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
     console.log("Fetched Product:", response.data);  
    return response.data.product;
  }
);

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async (id) => {
    const response = await fetchAllProduct(id);
    return response.data;
  }
);
//ASYNCTHUNK FOR PRODUCT UPDATION
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({ category, page, limit, sort }) => {
    const response = await fetchProductsByFilter(category, page, limit, sort);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    //it will free the product placed in the state
    // clearSelectedProduct: (state) => {
    //   state.selectedProduct = null;
    // },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })

      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        console.log("Action Payload:", action.payload); // Debug log
        state.status = "idle";
        state.products = action.payload?.products || [];
        state.totalItems = action.payload?.totalItems || 0;
      })
      .addCase(fetchProductByFilterAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export default productSlice.reducer;
