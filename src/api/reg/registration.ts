import ApiBase from '../base';
import { RegistrationData } from '../types';

class Registration {
  public async create(data: RegistrationData) {
    const resp = await ApiBase.post('/auth/signup', data);
    let body;
    try {
      body = await resp.json();
    } catch (e) {
      body = '';
    }
    if (resp.status !== 200) {
      let errorMessage = resp.statusText;
      if (body && body.reason) errorMessage = body.reason;
      throw new Error(errorMessage);
    }
    return true;
  }
}
export default new Registration();
