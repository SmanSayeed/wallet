import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  denominations: [],
};

const denominationSlice = createSlice({
  name: 'denomination',
  initialState,
  reducers: {
    setDenominations(state, action) {
      state.denominations = action.payload;
    },
  },
});

export const { setDenominations } = denominationSlice.actions;
export default denominationSlice.reducer;