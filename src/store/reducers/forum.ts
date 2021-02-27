import { FORUM_INFO_IS_LOADING, FORUM_INFO_LOAD_SUCCESS } from '../actions/forum';
import { ForumInfo, ForumAction } from '../actionCreators/forum';

export interface ForumState {
  isLoading: boolean;
  forumInfo: ForumInfo[];
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
        isLoading: action.isLoading,
      };

    case FORUM_INFO_LOAD_SUCCESS:
      return {
        ...state,
        forumInfo: action.forumInfo,
      };

    default:
      return state;
  }
}
