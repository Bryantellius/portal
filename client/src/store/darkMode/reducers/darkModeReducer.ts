import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = false;

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode(state, action: PayloadAction<boolean>) {
      state = !state;
    }
  }
});

export const {
  toggleDarkMode
} = darkModeSlice.actions;

const darkModeReducer = darkModeSlice.reducer;
export default darkModeReducer;