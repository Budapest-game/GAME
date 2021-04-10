import { GameApi } from '../base';
import responseParser from '../responseParser';
import { createTopicData, updateTopicData, TopicInfo } from '../types';

class TopicAPI {
  public async create(data: createTopicData) {
    const resp = await GameApi.post('/forum/topic', data);
    if (resp.status === 200) return true;
    return false;
  }

  public async update(id: number, data: updateTopicData) {
    const resp = await GameApi.post(`/forum/topic/${id}`, data);
    if (resp.status === 200) return true;
    return false;
  }

  public async delete(topicId: number) {
    const resp = await GameApi.delete(`/forum/topic/${topicId}`);
    if (resp.status === 200) return true;
    return false;
  }

  public async get(id: number) {
    const resp = await GameApi.get(`/forum/topic/${id}`);
    const body = await responseParser<TopicInfo>(resp);
    return body;
  }

  public async getAll() {
    const resp = await GameApi.get('/forum/topic/all');
    const body = await responseParser<TopicInfo[]>(resp);
    return body;
  }
}
export default new TopicAPI();
