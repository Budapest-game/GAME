import { combineReducers } from 'redux';
import { forumReducer } from './forum';

const rootReducer = combineReducers({
  forum: forumReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;
