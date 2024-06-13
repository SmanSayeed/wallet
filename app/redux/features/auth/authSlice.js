import { createSlice } from '@reduxjs/toolkit';
import { setCookie, removeCookie } from '@/app/utils/cookieUtils';

const initialState = {
  user: null,
  token: null,
  email: null,
  otpValidated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      if (token) setCookie('access_token', token, { expires: 7 });
      if (user) setCookie('user', JSON.stringify(user), { expires: 7 });
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.email = null;
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
    reset: (state) => initialState,
    initAuthState: (state) => {
      const user = getCookie('user');
      const token = getCookie('access_token');
      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
      } else {
        state.user = null;
        state.token = null;
        state.otpValidated = false;
      }
    },
  },
 
});

export const { setEmail, setCredentials, validateOtp, logout, setUser, setToken, reset, initAuthState } = authSlice.actions;
export default authSlice.reducer;