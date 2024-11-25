import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser} from "./authAPI";
// , signOut, checkAuth 
const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  error: null,
 
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// export const loginUserAsync = createAsyncThunk(
//   "auth/loginUser",
//   async (loginInfo, { rejectWithValue }) => {
//     try {
//       const response = await loginUser(loginInfo);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      // Call the API function
      const response = await loginUser(loginInfo);
      return response.data; // Pass data to the fulfilled action
    } catch (error) {
      if (error && error.error) {
        return rejectWithValue({ error: error}); // Use API error message
      }
      return rejectWithValue({ error: "Unexpected error occurred" }); // Fallback error message
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
   
  },
});
export const {} = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;


export default authSlice.reducer;
