import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import clientConfig from '../config/appConfig';
import AuthService from './authService';
const authService = new AuthService();

type ApiClientConfig = {
  apiUsername: string,
  apiPassword: string
};

class ApiClient {
  client: AxiosInstance;

  constructor (config?: ApiClientConfig) {
    this.client = axios.create({
      baseURL: clientConfig.apiRoot,
      timeout: clientConfig.apiTimeout || 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
        ? JSON.parse(<string>localStorage.getItem('user'))
        : undefined;

    if (
      savedToken !== undefined
      && savedUser !== undefined
    ) {
      this.persistAuth(<string>savedToken, savedUser);
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

  async authenticate (email: string, password: string) {
    const credentials = {
      email: email,
      password: password
    };

    const authResponse = await this.post('/auth/login', credentials);

    if (authResponse && authResponse.token) {
      this.persistAuth(authResponse.token, authResponse.user);
    }

    return authResponse.data;
  }

  async get (url: string, config?: AxiosRequestConfig) {

    const response = await this.client.get(url, config);

    return response.data;
  }

  async put (url: string, data: any, config?: AxiosRequestConfig) {
    const response = await this.client.put(url, data, config);

    return response.data;
  }

  async post (url: string, data: any, config?: AxiosRequestConfig) {
    const response = await this.client.post(url, data, config);

    return response.data;
  }

  async delete (url: string, config?: AxiosRequestConfig) {
    const response = await this.client.delete(url, config);

    return response.data;
  }

  async options (url: string, config?: AxiosRequestConfig) {
    const response = await this.client.options(url, config);

    return response.data;
  }

  persistAuth(accessToken: string, user: any) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    this.client.defaults.headers.common['Authorization'] = `Bearer ${ this.accessToken }`;
  }

  async handleAuthError (error: AxiosError) {
    switch (error.response?.status) {
      case 401:
      case 403:
        authService.logout();
        throw new Error('You are not logged in.')
      default:
        throw new Error('Unknown error in api call')
    }
  }

  initInterceptors () {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response, 
      (error: any) => this.handleAuthError(error)
    );
  }
}

export default ApiClient;