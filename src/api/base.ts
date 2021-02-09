import { BASE_API_URL } from './constants';
import { RegistrationData } from './types';


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
  public post(url:string, data:RegistrationData) {
    const settings: RequestInit = {
      method: METHODS.POST,
      ...JSON_HEADERS,
      ...DEFAULTS,
      body: JSON.stringify(data),
    };
    return fetch(`${BASE_API_URL}${url}`, settings);
  }
}
export default new ApiBase();
