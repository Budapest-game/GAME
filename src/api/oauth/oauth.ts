import ApiBase from '../base';
import { OAuthInterface } from '../types';
import responseParser from '../responseParser';

class OAuth {
  public async getToken() {
    const resp = await ApiBase.get('/oauth/yandex/service-id');
    const body = await responseParser<Record<string, string>>(resp);
    return body;
  }

  public async logIn(data:OAuthInterface) {
    const resp = await ApiBase.post('/oauth/yandex', data);
    if (resp.status !== 200) {
      let errorMessage = resp.statusText;
      let body;
      try {
        body = await resp.json();
      } catch {
        body = '';
      }
      if (body && body.reason) errorMessage = body.reason;
      throw new Error(errorMessage);
    }
    return true;
  }
}
export default new OAuth();
