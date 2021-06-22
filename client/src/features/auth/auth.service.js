import ApiService from '../../utils/apiService';
import appConfig from '../../config/appConfig';
import { Auth0Lock } from 'auth0-lock';
import axios from 'axios';
import { getToken } from './auth.helpers';

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

class AuthService extends ApiService {
  constructor() {
    super('');

    this.lock = new Auth0Lock(
      appConfig.auth0ClientId,
      appConfig.auth0Domain,
      lockOptions
    );
  }

  linkUserAccounts = async (primaryAccessToken, secondaryIdToken) => {
    return new Promise((resolve, reject) => {
      this.lock.getUserInfo(primaryAccessToken, async (err, profile) => {
        if (err) {
          return reject(err);
        }

        const linkResult = await axios.post(`https://${appConfig.auth0Domain}/api/v2/users/${profile.sub}/identities`, {
          link_with: secondaryIdToken
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ primaryAccessToken }`
          }
        });

        resolve(linkResult);

        localStorage.removeItem('primary_account_access_token');
      });
    });
  }

  updateApiUser (userData = {}) {
    return new Promise((resolve, reject) => {
      this.lock.getUserInfo(getToken(), async (err, profile) => {
        if (err) {
          return reject(err);
        }

        let apiUser = await this.apiClient.get(`/user/auth0/${ profile.sub }`);

        // if we don't have a user from the API, we need to create one and link it to auth0
        // via the `sub` property of the auth0 user profile
        if (!(apiUser && apiUser.firstName && apiUser.lastName)) {
          apiUser = await this.apiClient.post('/user/link', {
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
  }

  login () {
    this.lock.show();
  }
}

const authService = new AuthService();
export default authService;