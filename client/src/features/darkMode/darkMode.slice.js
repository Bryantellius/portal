import { createSlice } from '@reduxjs/toolkit';

export const initialState = false;

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode(state, action) {
      state = !state;
    }
  }
});

export const {
  toggleDarkMode
} = darkModeSlice.actions;

export default darkModeSlice.reducer;