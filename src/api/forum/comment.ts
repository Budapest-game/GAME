import { GameApi } from '../base';
import { createCommentData } from '../types';

class CommentAPI {
  public async create(data: createCommentData) {
    const resp = await GameApi.post('/forum/comment', data);
    if (resp.status === 200) return true;
    return false;
  }
}
export default new CommentAPI();
