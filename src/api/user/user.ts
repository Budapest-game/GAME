import { PraktikumAPI } from '../base';
import responseParser from '../responseParser';
import { UserInfoUpdateData, UserPassUpdateData } from '../types';

class User {
  public async get() {
    const resp = await PraktikumAPI.get('/auth/user');
    const body = await responseParser<Express.UserInfo>(resp);
    return body;
  }

  public async changeInfo(data: UserInfoUpdateData) {
    const resp = await PraktikumAPI.put('/user/profile', data);
    const body = await responseParser<Record<string, string>>(resp);
    return body;
  }

  public async changeAvatar(data: FormData) {
    const resp = await PraktikumAPI.putFile('/user/profile/avatar', data);
    const body = await responseParser<Record<string, string>>(resp);
    return body;
  }

  public async changePassword(data: UserPassUpdateData) {
    const resp = await PraktikumAPI.put('/user/password', data);
    const body = await responseParser<Record<string, string>>(resp);
    return body;
  }
}
export default new User();
