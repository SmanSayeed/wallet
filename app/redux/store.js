// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice';
import { authApi } from '../services/authApi';
import { walletApi } from '../services/walletApi'; // Import walletApi from services

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [walletApi.reducerPath]: walletApi.reducer, // Add walletApi reducer to the store
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, walletApi.middleware), // Add walletApi middleware
  });

  setupListeners(store.dispatch);

  return store;
};
