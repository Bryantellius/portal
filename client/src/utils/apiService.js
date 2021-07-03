import ApiClient from './apiClient';

export default class ApiService {
  constructor (apiRoot = '/') {
    this.apiClient = new ApiClient();
    this.apiRoot = apiRoot;
  }

  async fetchAll () {
    return await this.httpGet();
  }

  async fetchById (id) {
    return await this.httpGet(`/${ id }`);
  }

  async update (id, model) {
    return await this.httpPut(`/${ id }`, model);
  }

  async create (model) {
    return await this.httpPost('', model);
  }

  async upsert (model) {
    return !!model.id
      ? await this.update(model.id, model)
      : await this.create(model);
  }

  async delete (id) {
    return await this.apiClient.delete(`/${ id }`);
  }

  httpGet (path = '', relativePath = true) {
    return this.apiClient.get(relativePath ? this.getRelativeUrl(path) : path);
  }

  httpPost (path = '', data, relativePath = true) {
    return this.apiClient.post(relativePath ? this.getRelativeUrl(path) : path, data);
  }

  httpPut (path = '', data, relativePath = true) {
    return this.apiClient.put(relativePath ? this.getRelativeUrl(path) : path, data);
  }

  httpDelete (path = '', relativePath = true) {
    return this.apiClient.delete(relativePath ? this.getRelativeUrl(path) : path);
  }

  getRelativeUrl(apiPath) {
    return this.apiRoot + apiPath;
  }
};