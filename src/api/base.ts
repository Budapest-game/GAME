import { BASE_API_URL } from './constants';
import { RegistrationData, AuthorizationData } from './types';

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
type postData = RegistrationData | AuthorizationData;
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
}
export default new ApiBase();
