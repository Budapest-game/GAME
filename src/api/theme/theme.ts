import { GameApi } from '../base';
import { ThemeResponse } from '../types';
import responseParser from '../responseParser';

class Theme {
  public async get(name: string) {
    const resp = await GameApi.get(`/theme/${name}`);
    const body = await responseParser<ThemeResponse>(resp);
    return body.theme;
  }
}
export default new Theme();
