// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice';
import currencyReducer from './features/currency/currencySlice';
import denominationReducer from './features/denomination/denominationSlice';
import depositReducer from './features/deposit/depositSlice';
import { authApi } from '../services/authApi';
import { walletApi } from '../services/walletApi'; // Import walletApi from services

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [walletApi.reducerPath]: walletApi.reducer, 
      currency: currencyReducer,
      auth: authReducer,
      denomination: denominationReducer,
      deposit: depositReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, walletApi.middleware), // Add walletApi middleware
  });

  setupListeners(store.dispatch);

  return store;
};
