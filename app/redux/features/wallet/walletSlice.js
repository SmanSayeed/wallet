// redux/features/wallet/walletSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { walletApi } from '@/app/services/walletApi';

const initialState = {
  wallets: [],
  selectedWallet: null,
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setSelectedWallet: (state, action) => {
      state.selectedWallet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(walletApi.endpoints.getWallets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(walletApi.endpoints.getWallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload;
      })
      .addCase(walletApi.endpoints.getWallets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(walletApi.endpoints.createWallet.fulfilled, (state, action) => {
        state.wallets.push(action.payload);
      })
      .addCase(walletApi.endpoints.getWalletById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(walletApi.endpoints.getWalletById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedWallet = action.payload;
      })
      .addCase(walletApi.endpoints.getWalletById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedWallet } = walletSlice.actions;
export default walletSlice.reducer;
