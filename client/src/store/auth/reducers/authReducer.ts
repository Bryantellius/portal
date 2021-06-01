import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppUser } from '../../../common/types';

export interface IUserState {
  user: IAppUser | null,
  token: string | null
}

export const initialState: IUserState = {
  user: null,
  token: null
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAppUser | null>) {
       state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setLastLectureId (state, action: PayloadAction<number>) {
      state.user = {
        ...state.user,
        lastLectureId: action.payload
      } as IAppUser
    }
  }
});

export const {
  setUser,
  setToken,
  setLastLectureId
} = userSlice.actions;

const authReducer = userSlice.reducer;
export default authReducer;