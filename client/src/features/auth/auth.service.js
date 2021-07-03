import ApiService from '../../utils/apiService';
import appConfig from '../../config/appConfig';
import { Auth0Lock } from 'auth0-lock';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { presetPrimaryColors } from '@ant-design/colors';

class AuthService extends ApiService {
  constructor(auth0) {
    super('auth');
  }

  async linkUserAccounts (primaryUserSub, primaryUserAccessToken, secondaryUserIdToken) {
    return await axios.post(`${ appConfig.auth0.apiUrl }users/${ primaryUserSub }/identities`, {
      link_with: secondaryUserIdToken
    }, {

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ primaryUserAccessToken }`
      }
    });
  }

  async updateUserContactInfo (auth0Sub, contactInfo) {
    await axios.patch(`${ appConfig.auth0.apiUrl}users/${ `${auth0Sub}`}`, {
      user_metadata: {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        discordUsername: contactInfo.discordUsername
      }
    },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ appConfig.auth0.managementApiToken }`
        }
      }
    );

    return await this.updateApiUser(auth0Sub, contactInfo);
  }

  async updateApiUser (auth0Sub, userData) {
    return await this.apiClient.put(`/auth/${ auth0Sub }`, userData);
  }

  async getApiUser (auth0Sub) {
    return await this.apiClient.get(`/auth/${ auth0Sub }`);
  }

  isAuthenticated () {
    return !this.isTokenExpired();
  }


  async getLinkedAccounts () {
    const token = this.getToken();
    const user = this.getLocalUser();
    const linkResult = await axios.get(`${ appConfig.auth0.apiUrl }users/oauth2|discord|158299438811578371/identities`, {}
    , {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ token }`
      }
    });
  }

  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getLocalUser () {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : {};
  }

  setLocalUser (profile) {
    if (!profile) {
      throw new Error(`tried to set localStorage user to an invalid value: ${ profile }`);
    }

    localStorage.setItem('user', JSON.stringify(profile));
  }

  removeLocalUser () {
    localStorage.removeItem('user');
  }

  getToken () {
    return localStorage.getItem('token');
  }

  setToken (token) {
    localStorage.setItem('token', token);
  }

  setUserToken (idToken) {
    localStorage.setItem('idToken', idToken);
  }

  removeToken () {
    localStorage.removeItem('token');
  }

  getTokenExpirationDate () {
    const token = this.getToken();
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired () {
    //todo: implement this correctly
    const token = this.getToken();
    return !token;
  }

  isSecondaryAccount () {
    return !!localStorage.getItem('primary_account_access_token')
  }

  getPrimaryAccountAccessToken () {
    return localStorage.getItem('primary_account_access_token')
  }

  setPrimaryAccountAccessToken (accessToken) {
    localStorage.setItem('primary_account_access_token', accessToken);
  }

  getPrimaryAccountUserId () {
    return localStorage.getItem('primary_account_user_id');
  }

  setPrimaryAccountUserId (userId) {
    localStorage.setItem('primary_account_user_id', userId);
  }
}

const authService = new AuthService();
export default authService;