import ApiBase from '../base';
import { AuthorizationData } from '../types';

class Authorization {
  public async logIn(data: AuthorizationData) {
    const resp = await ApiBase.post('/auth/signin', data);
    let body;
    try {
      body = await resp.json();
    } catch (e) {
      body = '';
    }
    return { status: resp.status, text: resp.statusText, body };
  }

  public async logOut() {
    const resp = await ApiBase.post('/auth/logout');
    return { status: resp.status, text: resp.statusText };
  }
}
export default new Authorization();
