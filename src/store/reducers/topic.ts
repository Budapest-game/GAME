import { TOPIC_INFO_IS_LOADING, TOPIC_INFO_LOAD_SUCCESS } from '../actions/topic';
import { TopicInfo } from '../../api/types';
import { TopicAction } from '../actionCreators/topic';

export interface TopicState {
  isLoading: boolean;
  info: TopicInfo | null;
}

const defaultForumState: TopicState = {
  isLoading: false,
  info: null,
};

export function topicReducer(
  state: TopicState = defaultForumState,
  action: TopicAction,
): TopicState {
  switch (action.type) {
    case TOPIC_INFO_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case TOPIC_INFO_LOAD_SUCCESS:
      return {
        ...state,
        info: action.payload.info,
      };

    default:
      return state;
  }
}
