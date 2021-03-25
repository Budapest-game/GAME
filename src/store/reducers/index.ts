import { combineReducers } from 'redux';
import { forumReducer } from './forum';
import { registrationReducer } from './registration';
import { leaderboardReducer } from './leaderboard';
import { authorizationReducer } from './authorization';

const rootReducer = combineReducers({
  forum: forumReducer,
  registration: registrationReducer,
  leaderboard: leaderboardReducer,
  authorisation: authorizationReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;
