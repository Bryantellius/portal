import axios from 'axios';
import clientConfig from '../config/appConfig';

export default class ApiClient {
  constructor () {
    this.client = axios.create({
      baseURL: clientConfig.apiRoot,
      timeout: clientConfig.apiTimeout || 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const savedToken = localStorage.getItem('token');

    if (savedToken !== undefined) {
      this.persistAuth(savedToken);
    }

    this.initInterceptors();
  }

  get isAuthenticated () {
    return this.accessToken !== undefined
      && this.user !== undefined;
  }

  get accessToken () {
    return localStorage.getItem('token');
  }

  get user () {
    const userJSON = localStorage.getItem('user');
    if (!userJSON) return null;
    return JSON.parse(userJSON);
  }

  async authenticate (email, password) {
    const credentials = {
      email: email,
      password: password
    };

    const authResponse = await this.post('/auth/login', credentials);

    if (authResponse && authResponse.token) {
      this.persistAuth(authResponse.token);
    }

    return authResponse?.data;
  }

  async get (url, config) {

    const response = await this.client.get(url, config);

    return response?.data;
  }

  async put (url, data, config) {
    const response = await this.client.put(url, data, config);

    return response?.data;
  }

  async post (url, data, config) {
    const response = await this.client.post(url, data, config);

    return response?.data;
  }

  async delete (url, config) {
    const response = await this.client.delete(url, config);

    return response?.data;
  }

  async options (url, config) {
    const response = await this.client.options(url, config);

    return response?.data;
  }

  persistAuth (accessToken) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${ accessToken }`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${ accessToken }`;
  }

  async handleAuthError (error) {
    switch (error.response?.status) {
      case 401:
      case 403:
        console.error(error);
        //todo: handle this the right way
        break;
      default:
        // throw new Error('Unknown error in api call')
        break;
    }
  }

  initInterceptors () {
    this.client.interceptors.response.use(
      response => response,
      error => this.handleAuthError(error)
    );
  }
};