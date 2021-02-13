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
    return { status: resp.status, text: resp.statusText, body };
  }
}
export default new Registration();