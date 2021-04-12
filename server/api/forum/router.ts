import { Router } from 'express';
import apiAuthChecker from '../../middlewares/apiAuthCheker';
import {
  isTopicCreationDataExist, isTopicDeletionDataExist,
  isTopicGetDataExist, istTopicUpdateDataExist,
  isCommentCreationDataExist, isCommentUpdateDataExist,
  isCommentRemoveDataExist, isReactionCreationDataExist,
  isReactionRemoveDataExist,
} from './helpers';
import TopicAPI from './topic';
import CommentApi from './comment';
import ReactionApi from './reaction';

export default function ForumAPIRoutes(router: Router): void {
  router.get('/forum/topic/all', [apiAuthChecker], TopicAPI.getAllTopics);
  router.post('/forum/topic', [apiAuthChecker, isTopicCreationDataExist], TopicAPI.createTopic);
  router.delete('/forum/topic/:topic', [apiAuthChecker, isTopicDeletionDataExist], TopicAPI.deleteTopic);
  router.get('/forum/topic/:topic', [apiAuthChecker, isTopicGetDataExist], TopicAPI.getTopic);
  router.post('/forum/topic/:topic', [apiAuthChecker, istTopicUpdateDataExist], TopicAPI.updateTopic);
  router.post('/forum/comment', [apiAuthChecker, isCommentCreationDataExist], CommentApi.createComment);
  router.post('/forum/comment/:comment', [apiAuthChecker, isCommentUpdateDataExist], CommentApi.updateComment);
  router.delete('/forum/comment/:comment', [apiAuthChecker, isCommentRemoveDataExist], CommentApi.removeComment);
  router.post('/forum/reaction/:comment', [apiAuthChecker, isReactionCreationDataExist], ReactionApi.createReaction);
  router.delete('/forum/reaction/:reaction', [apiAuthChecker, isReactionRemoveDataExist], ReactionApi.removeReaction);
}
