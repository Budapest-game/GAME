import { combineReducers } from 'redux';
import { forumReducer } from './forum';
import { registrationReducer } from './registration';

const rootReducer = combineReducers({
  forum: forumReducer,
  registration: registrationReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;
