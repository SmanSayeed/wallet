import { removeCookie, setCookie } from '@/app/utils/cookieUtils';
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
      setCookie('access_token', token, { expires: 7 }); 
      setCookie('user', JSON.stringify(user), { expires: 7 }); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpValidated = false;
      removeCookie('access_token');
      removeCookie('user');
    },
    validateOtp: (state) => {
      state.otpValidated = true;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setCredentials, validateOtp, logout,setUser,setToken,reset } = authSlice.actions;
export default authSlice.reducer;
