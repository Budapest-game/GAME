import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { forumReducer } from './forum';
import { registrationReducer } from './registration';
import { leaderboardReducer } from './leaderboard';
import { authReducer } from './auth';

const createRootReducer = (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    forum: forumReducer,
    registration: registrationReducer,
    leaderboard: leaderboardReducer,
    auth: authReducer,
  });
};
export default createRootReducer;
