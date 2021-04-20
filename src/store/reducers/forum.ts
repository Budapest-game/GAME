import { FORUM_INFO_IS_LOADING, FORUM_INFO_LOAD_SUCCESS } from '../actions/forum';
import { TopicInfo } from '../../api/types';
import { ForumAction } from '../actionCreators/forum';

export interface ForumState {
  isLoading: boolean;
  forumInfo: TopicInfo[];
}

const defaultForumState: ForumState = {
  isLoading: false,
  forumInfo: [],
};

export function forumReducer(
  state: ForumState = defaultForumState,
  action: ForumAction,
): ForumState {
  switch (action.type) {
    case FORUM_INFO_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case FORUM_INFO_LOAD_SUCCESS:
      return {
        ...state,
        forumInfo: action.payload.forumInfo,
      };

    default:
      return state;
  }
}
