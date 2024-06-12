import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  otpValidated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    validateOtp: (state) => {
      state.otpValidated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpValidated = false;
    },
  },
});

export const { setCredentials, validateOtp, logout } = authSlice.actions;
export default authSlice.reducer;
