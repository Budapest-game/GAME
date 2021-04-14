import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { forumReducer, ForumState } from './forum';
import { registrationReducer, RegistrationState } from './registration';
import { leaderboardReducer, LeaderboardState } from './leaderboard';
import { authorizationReducer, AuthorizationState } from './authorization';
import { topicReducer, TopicState } from './topic';

const createRootReducer = (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    forum: forumReducer,
    topic: topicReducer,
    registration: registrationReducer,
    leaderboard: leaderboardReducer,
    authorisation: authorizationReducer,
  });
};
export default createRootReducer;

export interface ApplicationState{
  forum: ForumState,
  topic: TopicState,
  registration: RegistrationState,
  leaderboard: LeaderboardState,
  authorisation: AuthorizationState,
}
