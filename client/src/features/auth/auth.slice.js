import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth0Lock } from 'auth0-lock';
import appConfig from '../../config/appConfig';
import userService from '../user/user.service';

import {
  getToken,
  getUser,
  setUser,
  setToken,
  isAuthenticated,
  isSecondaryAccount,
  removeUser,
  removeToken
} from './auth.helpers';
import authService from './auth.service';

export const initialState = {
  isLoading: true,
  error: null,
  isAuthenticated:
  isAuthenticated(),
  token:
  getToken(),
  user:
  getUser()
};

export const linkUserToApi = createAsyncThunk(
  'auth/linkUser',
  async (userData, thunkAPI) => {
    return await updateApiUser(userData);
  }
);

export const doLogin = createAsyncThunk(
  'auth/doLogin',
  async (_,thunkAPI) => {
    const { dispatch } = thunkAPI;

    return new Promise((resolve, reject) => {
      const lock = getAuth0Lock();
      lock.on('authenticated', async authResult => {
        const response = await updateApiUser(authResult);
        resolve({
          user: response,
          token: authResult.accessToken
        });
      });

      lock.on('authorization_error', err => {
        reject(err);
      });

      lock.checkSession({}, async (err, authResult) => {
        if (err) {
          lock.show();
          return reject(err);
        }

        if (authResult.accessToken &&
          isSecondaryAccount()) {
          const primaryAccountToken = localStorage.getItem('primary_account_access_token');
          localStorage.removeItem('primary_account_access_token');
          await authService.linkUserAccounts(primaryAccountToken, authResult.idToken);

          dispatch(updateToken(primaryAccountToken));
        } else {
          dispatch(updateToken(authResult.accessToken));
        }

        const userResult = await updateApiUser();
        resolve({
          user: userResult,
          token: authResult.accessToken
        });
      });
    });
  }
);

export const doLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const lock = getAuth0Lock();

    lock.logout();

    return await Promise.resolve();
  }
);

const getAuth0Lock = () => {
  const lockOptions = {
    auth: {
      responseType: 'token id_token',
      audience: appConfig.auth0ApiUrl,
      autoParseHash: true,
      redirectUrl: appConfig.serverUrl,
      params: {
        scope: 'openid profile email read:current_user update:current_user_identities'
      }
    },
    theme: {
      primaryColor: '#2E90C0',
      logo: 'https://i.imgur.com/Pb2iSR0.png'
    },
    languageDictionary: {
      title: 'TrueCoders Student Portal'
    },
    additionalSignUpFields: [{
      name: 'firstName',
      placeholder: 'John'
    }, {
      name: 'lastName',
      placeholder: 'Doe'
    }]
  };

  return new Auth0Lock(appConfig.auth0ClientId, appConfig.auth0Domain, lockOptions);
};

const updateApiUser = (userData = {}) => {
  const lock = getAuth0Lock();

  return new Promise((resolve, reject) => {
    lock.getUserInfo(getToken(), async (err, profile) => {
      if (err) {
        return reject(err);
      }

      let apiUser = await userService.httpGet(`/auth0/${ profile.sub }`);

      // if we don't have a user from the API, we need to create one and link it to auth0
      // via the `sub` property of the auth0 user profile
      if (!(apiUser && apiUser.firstName && apiUser.lastName)) {
        apiUser = await userService.httpPost('/link', {
          email: profile.email,
          auth0Id: profile.sub,
          avatarUrl: profile.picture,
          ...userData
        });
      }

      const mergedUser = {
        ...apiUser,
        ...userData,
        email: profile.email,
        avatarUrl: profile.picture,
        auth0Id: profile.sub
      };

      resolve(mergedUser);
    })
  });
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      setUser(action.payload);
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = true;
      setToken(state.token);
    },
    setLastLectureId: (state, action) => {
      state.user = {
        ...state.user,
        lastLectureId: action.payload
      };
    }
  },
  extraReducers: builder => {
    builder
    .addCase(doLogin.pending, state => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    })
    .addCase(doLogin.fulfilled, (state, action) => {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.isLoading = false;

      setUser(user);

      setToken(token);
    })
    .addCase(doLogin.rejected, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      removeUser();

      removeToken();
    })
    .addCase(linkUserToApi.pending, state => {
      state.isLoading = true;
      state.isAuthenticated = true;
    })
    .addCase(linkUserToApi.fulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;

      setUser(user);
    })
    .addCase(linkUserToApi.rejected, state => {
      state.isAuthenticated = true;
      state.isLoading = false;
    })
    .addCase(doLogout.fulfilled, state => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;

      removeUser();
      removeToken();
      state.error = null;
    });
  }
});

export const { setLastLectureId, updateUser, updateToken } = authSlice.actions;

export default authSlice.reducer;