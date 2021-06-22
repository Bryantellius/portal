import jwtDecode from 'jwt-decode';

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
