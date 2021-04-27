import { GameApi } from '../base';
import { ThemeResponse, UserThemeResponse } from '../types';
import responseParser from '../responseParser';

class Theme {
  public async get(name: string) {
    const resp = await GameApi.get(`/theme/${name}`);
    const body = await responseParser<ThemeResponse>(resp);
    return body;
  }

  public async set(name: string) {
    const resp = await GameApi.post(`/theme/${name}`);
    if (resp.status === 200) return true;
    return false;
  }

  public async getUserTheme() {
    const resp = await GameApi.get('/theme');
    const body = await responseParser<UserThemeResponse>(resp);
    return body;
  }
}
export default new Theme();
