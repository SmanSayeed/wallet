import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  depositList: []
};

const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    addDeposit: (state, action) => {
      // Check if the item already exists in the deposit list
      const exists = state.depositList.find(
        (deposit) => deposit.pivot_id === action.payload.pivot_id
      );
      if (!exists) {
        state.depositList.push(action.payload);
      }
    },
    removeDeposit: (state, action) => {
      state.depositList = state.depositList.filter(
        (deposit) => deposit.id !== action.payload
      );
    },
    clearDeposits: (state) => {
      state.depositList = [];
    }
  }
});

export const { addDeposit, removeDeposit, clearDeposits } = depositSlice.actions;
export default depositSlice.reducer;
