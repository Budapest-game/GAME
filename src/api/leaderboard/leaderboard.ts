import { PraktikumAPI } from '../base';
import { Leader } from '../types';
import { RATING_FIELD_NAME } from '../constants';
import responseParser from '../responseParser';

interface WrappedInfo{
  data: Leader
}

class Leaderboard {
  public async addLeader(data: Leader) {
    const resp = await PraktikumAPI.post('/leaderboard', { data, ratingFieldName: RATING_FIELD_NAME });
    const body = await responseParser<Record<string, string>>(resp);
    return body;
  }

  public async get() {
    const resp = await PraktikumAPI.post('/leaderboard/all', { ratingFieldName: RATING_FIELD_NAME, cursor: 0, limit: 10 });
    const body = await responseParser<WrappedInfo[]>(resp);
    return body;
  }
}
export default new Leaderboard();
