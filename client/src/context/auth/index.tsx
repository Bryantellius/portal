  import React, { createContext, useState, Component, useReducer, FunctionComponent, useContext } from "react";
  import { IAppUser } from "../../common/types";

  export interface IAuthState {
    user: IAppUser,
    token: string | null,
    role: string,
    setUser: Function,
    setToken: Function
  }
  let user = null;
  try {
    user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null
  } catch (err) {
    localStorage.removeItem('user');
  }

  const token = localStorage.getItem('token')

  export const initialAuthState: IAuthState = {
    user,
    token,
    role: user?.Role?.title,
    setUser: (user: IAppUser) => {
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch (err) {
        console.error(err)
        localStorage.removeItem('user')
      }
    },
    setToken: (token: string)  => {
      try {
        localStorage.setItem('token', token)
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token')
      }
    }
  }

  export const AuthContext = createContext(initialAuthState)

  export const useAuth = () => useContext(AuthContext)