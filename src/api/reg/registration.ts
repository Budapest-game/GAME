import ApiBase from '../base';

class Registration {
  async create(data: Record<string, string>) {
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
