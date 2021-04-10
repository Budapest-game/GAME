import { PraktikumAPI } from '../base';
import { RegistrationData } from '../types';

class Registration {
  public async create(data: RegistrationData) {
    const resp = await PraktikumAPI.post('/auth/signup', data);
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
export default new Registration();
