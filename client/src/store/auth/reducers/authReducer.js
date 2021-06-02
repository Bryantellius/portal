import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
       state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLastLectureId (state, action) {
      state.user = {
        ...state.user,
        lastLectureId: action.payload
      };
    }
  }
});

export const {
  setUser,
  setToken,
  setLastLectureId
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;