import { PayloadAction } from '@reduxjs/toolkit';
import authReducer, { initialState, setUser, setToken } from './authReducer';

describe('auth reducer', () => {
  test('should return initial state if no known action is provided', () => {
    expect(authReducer(undefined, {} as PayloadAction)).toEqual(initialState);
  });

  test('should set user when action is setUser', () => {
    const user = {
      id: 1,
      firstName: 'test',
      lastName: 'user',
      email: 'test@test.com',
      lastLectureId: 1
    };
    
    const expectedState = {
      ...initialState,
      user
    };

    expect(authReducer(undefined, setUser(user))).toEqual(expectedState);
  });

  test('should set token when action is setToken', () => {
    const token = '123';
    const expectedState = {
      ...initialState,
      token
    };

    expect(authReducer(undefined, setToken(token))).toEqual(expectedState);
  });
});