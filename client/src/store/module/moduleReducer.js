import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  modules: []
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    setModules(state, action) {
      state.modules = action.payload;
    }
  }
});

export const {
  setModules
} = moduleSlice.actions;

const moduleReducer = moduleSlice.reducer;
export default moduleReducer;