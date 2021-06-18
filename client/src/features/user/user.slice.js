import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/user`);
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/user/${ userId }`);
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.put(`/user/${ user.id }`, user);
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, thunkAPI) => {
    const apiClient = new ApiClient();
    await apiClient.delete(`/user/${ userId }`);
    return userId;
  }
);

export const initialState = {
  users: [],
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action)  => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user: updatedUser } = action.payload;
        state.users = [
          ...state.users.filter(user => user.id !== updatedUser.id),
          updatedUser
        ];
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const usersWithoutDeletedUser = state.users.filter(user => user.id !== action.payload);

        state.users = [
          ...usersWithoutDeletedUser
        ];
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export default userSlice.reducer;