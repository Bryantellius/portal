import { createSlice } from '@reduxjs/toolkit';
import * as authService from '../../utils/AuthService';

export const initialState = {
  isLoading: true,
  error: null,
  isAuthenticated: authService.isAuthenticated(),
  token: authService.getToken(),
  user: authService.getUser()
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuthenticated = true;

      authService.setUser(action.payload.user);
      authService.setToken(action.payload.token);
    },
    updateUserProfileSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      authService.setUser(action.payload);
    },
    loginError: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      authService.removeUser();
      authService.removeToken();
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.token = null;
      authService.removeUser();
      authService.removeToken();
    },
    getTokenSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = true;
      authService.setToken(state.token);
    },
    setLastLectureId: (state, action) => {
      state.user = {
        ...state.user,
        lastLectureId: action.payload
      };
    }
  }
});

export const { loginRequest, loginSuccess, loginError, logoutSuccess, setLastLectureId, updateUserProfileSuccess, getTokenSuccess } = authSlice.actions;

export default authSlice.reducer;