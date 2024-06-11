import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authApi } from '@/app/lib/ApiEndpoint';

const initialState = {
  user: null,
  token: null,
  otpValidated: false,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(authApi.login, credentials);
  return response.data;
});

export const validateOtp = createAsyncThunk('auth/validateOtp', async (otpData, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.post(`${authApi.validateOtp}`, otpData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpValidated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(validateOtp.fulfilled, (state) => {
        state.otpValidated = true;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
