import { Auth0Lock } from 'auth0-lock';
import jwtDecode from 'jwt-decode';
import appConfig from '../config/appConfig';
import axios from 'axios'

const lockOptions = {
  auth: {
    responseType: 'token id_token',
    autoParseHash: true,
    audience: appConfig.auth0ApiUrl,
    redirectUrl: appConfig.serverUrl,
    params: {
      scope: 'openid email profile read:current_user update:current_user_identities'
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

export const lock = new Auth0Lock(appConfig.auth0ClientId, appConfig.auth0Domain, lockOptions);

export const login = () => {
  lock.show();
};

export const isAuthenticated = () => {
  return !isTokenExpired();
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.remoteItem('user');
};

export const getUser = () => {
  const profile = localStorage.getItem('user');

  return profile ? JSON.parse(profile) : {};
};

export const setUser = profile => {
  if (!profile) {
    throw new Error(`tried to set localStorage user to an invalid value: ${ profile }`);
  }
  localStorage.setItem('user', JSON.stringify(profile));
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = token => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getTokenExpirationDate = () => {
  const token = getToken();
  const decoded = jwtDecode(token);
  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};

export const isTokenExpired = () => {
  //todo: implement this correctly
  const token = getToken();
  return !token;
};

export const isSecondaryAccount = () => {
  return !!localStorage.getItem('primary_account_access_token');
};

export const linkToPrimaryAccount = async (primaryAccessToken, secondaryIdToken) => {
  lock.getUserInfo(primaryAccessToken, async (err, profile) => {
    const linkResult = await axios.post(`https://${appConfig.auth0Domain}/api/v2/users/${profile.sub}/identities`, {
      link_with: secondaryIdToken
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ primaryAccessToken }`
      }
    });

    console.log('LINK RESULT', linkResult);

    localStorage.removeItem('primary_account_access_token');
  });
};