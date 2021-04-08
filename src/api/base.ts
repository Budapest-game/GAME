import { BASE_API_URL } from './constants';
import {
  RegistrationData, AuthorizationData,
  UserPassUpdateData, UserInfoUpdateData, LeaderboardData,
  GetLeaders, OAuthInterface,
} from './types';

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
type postData = RegistrationData | AuthorizationData
  | LeaderboardData | GetLeaders | OAuthInterface;
type putData = UserPassUpdateData | UserInfoUpdateData
class ApiBase {
  public post(url:string, data?:postData) {
    const settings: RequestInit = {
      method: METHODS.POST,
      ...JSON_HEADERS,
      ...DEFAULTS,
    };
    if (data) settings.body = JSON.stringify(data);
    return fetch(`${BASE_API_URL}${url}`, settings);
  }

  public get(url:string) {
    const settings: RequestInit = {
      method: METHODS.GET,
      ...DEFAULTS,
    };
    return fetch(`${BASE_API_URL}${url}`, settings);
  }

  public put(url: string, data: putData) {
    const settings: RequestInit = {
      method: METHODS.PUT,
      ...JSON_HEADERS,
      ...DEFAULTS,
      body: JSON.stringify(data),
    };
    return fetch(`${BASE_API_URL}${url}`, settings);
  }

  public putFile(url: string, data: FormData) {
    const settings: RequestInit = {
      method: METHODS.PUT,
      ...DEFAULTS,
      body: data,
    };
    return fetch(`${BASE_API_URL}${url}`, settings);
  }
}
export default new ApiBase();
