import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, verifyCode, resendOTP } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
  isAdmin: false,
  isVerified: false
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      console.error('createUserAsync error:', error);
      return rejectWithValue(error.message || 'Failed to create account');
    }
  }
);

export const verifyCodeAsync = createAsyncThunk(
  'user/verifyCode',
  async ({ verificationCode }, { rejectWithValue }) => {
    try {
      const response = await verifyCode({ verificationCode });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to verify code');
    }
  }
);

export const resendOtpAsync = createAsyncThunk(
  'user/resendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendOTP(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to resend OTP');
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to login');
    }
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.isAdmin = false;
      state.isVerified = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'Failed to create account';
      })
      
      // Verify Code
      .addCase(verifyCodeAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyCodeAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.isVerified = true;
        state.error = null;
      })
      .addCase(verifyCodeAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'Failed to verify code';
      })
      
      // Resend OTP
      .addCase(resendOtpAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resendOtpAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(resendOtpAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'Failed to resend OTP';
      })
      
      // Login User
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.isAdmin = action.payload.role === 'ADMIN';
        state.isVerified = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'Failed to login';
      });
  },
});

export const { clearError, logout } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectIsVerified = (state) => state.auth.isVerified;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer;
