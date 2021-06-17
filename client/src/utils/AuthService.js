import { Auth0Lock } from 'auth0-lock';
import jwtDecode from 'jwt-decode';
import appConfig from '../config/appConfig';

const lockOptions = {
  auth: {
    responseType: 'id_token token',
    autoParseHash: true,
    redirectUrl: appConfig.redirectUrl,
    sso: true,
    redirect: false
  },
  theme: {
    primaryColor: '#2E90C0'
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


  //
  // const expirationDate = getTokenExpirationDate();
  // const offsetSeconds = 0;
  // if(expirationDate === null) {
  //   return false;
  // }
  //
  // return !(expirationDate.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
};