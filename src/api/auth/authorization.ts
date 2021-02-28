import ApiBase from '../base';
import { AuthorizationData } from '../types';

class Authorization {
  public async logIn(data: AuthorizationData) {
    const resp = await ApiBase.post('/auth/signin', data);
    if (resp.status !== 200) {
      let body;
      try {
        body = await resp.json();
      } catch {
        body = '';
      }
      let errorMessage = resp.statusText;
      if (body && body.reason) errorMessage = body.reason;
      throw new Error(errorMessage);
    }
    return true;
  }

  public async logOut() {
    const resp = await ApiBase.post('/auth/logout');
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return true;
  }
}
export default new Authorization();
