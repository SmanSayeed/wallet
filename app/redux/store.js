import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
//   middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
});

export default store;
