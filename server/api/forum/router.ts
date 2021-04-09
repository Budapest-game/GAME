import { Router } from 'express';
import apiAuthChecker from '../../middlewares/apiAuthCheker';
import {
  checkTopicCreationData, checkTopicDeletionData,
  checkTopicGetData, checkTopicUpdateData,
} from './helpers';
import TopicAPI from './topic';

export default function ForumAPIRoutes(router: Router): void {
  router.get('/forum/topic/all', [apiAuthChecker], TopicAPI.getAllTopics);
  router.post('/forum/topic', [apiAuthChecker, checkTopicCreationData], TopicAPI.createTopic);
  router.delete('/forum/topic/:topic', [apiAuthChecker, checkTopicDeletionData], TopicAPI.deleteTopic);
  router.get('/forum/topic/:topic', [apiAuthChecker, checkTopicGetData], TopicAPI.getTopic);
  router.post('/forum/topic/:topic', [apiAuthChecker, checkTopicUpdateData], TopicAPI.updateTopic);
}
