import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { topicInfoLoading, topicInfoLoadSuccess } from '../actionCreators/topic';
import TopicAPI from '../../api/forum/topic';

export const TOPIC_INFO_IS_LOADING = 'FORUM_INFO_IS_LOADING';
export const TOPIC_INFO_LOAD_SUCCESS = 'FORUM_INFO_LOAD_SUCCESS';

export function fetchTopicInfo(id: number):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(topicInfoLoading(true));
    TopicAPI.get(id).then((topic) => {
      dispatch(topicInfoLoading(false));
      dispatch(topicInfoLoadSuccess(topic));
    });
  };
}
