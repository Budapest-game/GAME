import { Action } from 'redux';
import { TOPIC_INFO_IS_LOADING, TOPIC_INFO_LOAD_SUCCESS } from '../actions/topic';
import { TopicInfo } from '../../api/types';

export interface TopicInfoLoadingAction extends Action<typeof TOPIC_INFO_IS_LOADING> {
  payload: {
    isLoading: boolean;
  }
}

export interface TopicInfoLoadSuccessAction extends Action<typeof TOPIC_INFO_LOAD_SUCCESS> {
  payload: {
    info: TopicInfo;
  }
}

export type TopicAction = TopicInfoLoadingAction | TopicInfoLoadSuccessAction;

export function topicInfoLoading(isLoading: boolean): TopicInfoLoadingAction {
  return {
    type: TOPIC_INFO_IS_LOADING,
    payload: {
      isLoading,
    },
  };
}

export function topicInfoLoadSuccess(info: TopicInfo): TopicInfoLoadSuccessAction {
  return {
    type: TOPIC_INFO_LOAD_SUCCESS,
    payload: {
      info,
    },
  };
}
