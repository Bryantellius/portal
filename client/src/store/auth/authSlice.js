import { createSlice } from '@reduxjs/toolkit';
import * as authService from '../../utils/AuthService';

export const initialState = {
  isLoading: false,
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
      state.user = null;
      state.token = null;
      authService.removeUser();
      authService.removeToken();
    },
    setLastLectureId: (state, action) => {
      state.user = {
        ...state.user,
        lastLectureId: action.payload
      };
    }
  }
});

export const { loginRequest, loginSuccess, loginError, logoutSuccess, setLastLectureId } = authSlice.actions;

export default authSlice.reducer;