import { Action } from 'redux';
import { FORUM_INFO_IS_LOADING, FORUM_INFO_LOAD_SUCCESS } from '../actions/forum';
import { TopicInfo } from '../../api/types';

export interface ForumInfoLoadingAction extends Action<typeof FORUM_INFO_IS_LOADING> {
  payload: {
    isLoading: boolean;
  }
}

export interface ForumInfoLoadSuccessAction extends Action<typeof FORUM_INFO_LOAD_SUCCESS> {
  payload: {
    forumInfo: TopicInfo[];
  }
}

export type ForumAction = ForumInfoLoadingAction | ForumInfoLoadSuccessAction;

export function forumInfoLoading(isLoading: boolean): ForumInfoLoadingAction {
  return {
    type: FORUM_INFO_IS_LOADING,
    payload: {
      isLoading,
    },
  };
}

export function forumInfoLoadSuccess(forumInfo: TopicInfo[]): ForumInfoLoadSuccessAction {
  return {
    type: FORUM_INFO_LOAD_SUCCESS,
    payload: {
      forumInfo,
    },
  };
}
