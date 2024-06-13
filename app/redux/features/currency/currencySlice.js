import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencies: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencies(state, action) {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencies } = currencySlice.actions;
export default currencySlice.reducer;