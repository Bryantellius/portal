import { createSlice } from '@reduxjs/toolkit';
import authService from './auth.service';

export const initialState = {
  isLoading: true,
  error: null,
  isAuthenticated: authService.isAuthenticated(),
  token: authService.getToken(),
  user: authService.getLocalUser(),
  redirectTo: '/dashboard'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const auth0Id = state.sub || state.auth0Id;

      if (auth0Id === action.payload?.auth0Id) {
        state.user = {
          ...state.user,
          ...action.payload
        }
      } else {
        state.user = action.payload;
      }

      state.isAuthenticated = true;
      state.isLoading = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = true;
    },
    setLastLectureId: (state, action) => {
      state.user = {
        ...state.user,
        lastLectureId: action.payload
      };
    }
  }
});

export const { setLastLectureId, updateUser, updateToken } = authSlice.actions;

export default authSlice.reducer;