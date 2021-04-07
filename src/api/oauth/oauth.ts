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
    const body = await responseParser<Record<string, string>>(resp);
    return body;
  }
}
export default new OAuth();
