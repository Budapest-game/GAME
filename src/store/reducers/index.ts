import { combineReducers } from 'redux';
import { forumReducer } from './forum';
import { registrationReducer } from './registration';
import { leaderboardReducer } from './leaderboard';

const rootReducer = combineReducers({
  forum: forumReducer,
  registration: registrationReducer,
  leaderboard: leaderboardReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;
