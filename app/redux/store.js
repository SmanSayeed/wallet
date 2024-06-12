import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import logger from 'redux-logger';
import Env from '../lib/Env';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware:[

  ],
  devTools:Env.NODE_ENV !== 'production'
//   middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
});

export default store;
