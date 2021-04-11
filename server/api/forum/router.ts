import { Router } from 'express';
import apiAuthChecker from '../../middlewares/apiAuthCheker';
import {
  isTopicCreationDataExist, isTopicDeletionDataExist,
  isTopicGetDataExist, istTopicUpdateDataExist,
} from './helpers';
import TopicAPI from './topic';

export default function ForumAPIRoutes(router: Router): void {
  router.get('/forum/topic/all', [apiAuthChecker], TopicAPI.getAllTopics);
  router.post('/forum/topic', [apiAuthChecker, isTopicCreationDataExist], TopicAPI.createTopic);
  router.delete('/forum/topic/:topic', [apiAuthChecker, isTopicDeletionDataExist], TopicAPI.deleteTopic);
  router.get('/forum/topic/:topic', [apiAuthChecker, isTopicGetDataExist], TopicAPI.getTopic);
  router.post('/forum/topic/:topic', [apiAuthChecker, istTopicUpdateDataExist], TopicAPI.updateTopic);
}
