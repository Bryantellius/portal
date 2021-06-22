import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setIsLoading,
  setError
} = appSlice.actions;

export default appSlice.reducer;

export const getIsLoading = state => state.isLoading;