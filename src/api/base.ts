import { BASE_API_URL } from './constants';
import { postData, putData } from './types';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}
enum CREDS {
  INC = 'include'
}
enum MODS {
  CORS = 'cors'
}
const DEFAULTS = {
  mode: MODS.CORS,
  credentials: CREDS.INC,
};
const JSON_HEADERS = {
  headers: {
    'Content-Type': 'application/json',
  },
};
class ApiBase {
  apiBase: string;

  constructor(basePath = '') {
    this.apiBase = basePath;
  }

  public post(url:string, data?:postData) {
    const settings: RequestInit = {
      method: METHODS.POST,
      ...JSON_HEADERS,
      ...DEFAULTS,
    };
    if (data) settings.body = JSON.stringify(data);
    return fetch(`${this.apiBase}${url}`, settings);
  }

  public get(url:string) {
    const settings: RequestInit = {
      method: METHODS.GET,
      ...DEFAULTS,
    };
    return fetch(`${this.apiBase}${url}`, settings);
  }

  public put(url: string, data: putData) {
    const settings: RequestInit = {
      method: METHODS.PUT,
      ...JSON_HEADERS,
      ...DEFAULTS,
      body: JSON.stringify(data),
    };
    return fetch(`${this.apiBase}${url}`, settings);
  }

  public putFile(url: string, data: FormData) {
    const settings: RequestInit = {
      method: METHODS.PUT,
      ...DEFAULTS,
      body: data,
    };
    return fetch(`${this.apiBase}${url}`, settings);
  }

  public delete(url: string) {
    const settings: RequestInit = {
      method: METHODS.DELETE,
      ...DEFAULTS,
    };
    return fetch(`${this.apiBase}${url}`, settings);
  }
}
export const PraktikumAPI = new ApiBase(BASE_API_URL);
export const GameApi = new ApiBase('');
