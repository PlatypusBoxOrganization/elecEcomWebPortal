import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser, verifyCode, resendOTP } from "./authAPI";
// , signOut, checkAuth
const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  error: null,
  isVerified: false,
  verificationError: null,
  otpResent: false, // To track if OTP has been resent
  otpError: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const verifyCodeAsync = createAsyncThunk(
  "auth/verifyCode",
  async (verificationCode, { rejectWithValue }) => {
    try {
      const response = await verifyCode({verificationCode});
      if (!response.data.success) {
        // If the success flag is false, reject with the error message
        return rejectWithValue(response.data.message);
      }
      return response.data; // This will resolve successfully if success is true
    } catch (error) {
      // Handle any error that occurs during the API call
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const resendOtpAsync = createAsyncThunk(
  "auth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendOTP(email); // Pass email to the API function
      return response; // Return the success data
    } catch (error) {
      return rejectWithValue(error.message || "Failed to resend OTP");
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      // Call the API function
      const response = await loginUser(loginInfo);
      return response.data; // Pass data to the fulfilled action
    } catch (error) {
      if (error && error.error) {
        return rejectWithValue({ error: error }); // Use API error message
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
      .addCase(verifyCodeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyCodeAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isVerified = true;
        state.verificationError = null;
      })
      .addCase(verifyCodeAsync.rejected, (state, action) => {
        state.status = "idle";
        state.isVerified = false;
        state.verificationError = action.payload; // Error message from the backend
      })
      .addCase(resendOtpAsync.pending, (state) => {
        state.status = "loading";
        state.otpResent = false;
        state.otpError = null;
      })
      .addCase(resendOtpAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otpResent = true;
        state.otpError = null;
      })
      .addCase(resendOtpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.otpError = action.payload || "Failed to resend OTP";
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
      });
  },
});
export const {} = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
