import { Action } from 'redux';
import { FORUM_INFO_IS_LOADING, FORUM_INFO_LOAD_SUCCESS } from '../actions/forum';

export interface ForumThemeInfo {
  name: string,
  postsCount: number,
}

export interface ForumInfo {
  name: string,
  themes: ForumThemeInfo[],
}

export interface ForumInfoLoadingAction extends Action<typeof FORUM_INFO_IS_LOADING> {
  isLoading: boolean;
}

export interface ForumInfoLoadSuccessAction extends Action<typeof FORUM_INFO_LOAD_SUCCESS> {
  forumInfo: ForumInfo[];
}

export type ForumAction = ForumInfoLoadingAction | ForumInfoLoadSuccessAction;

export function forumInfoLoading(isLoading: boolean): ForumInfoLoadingAction {
  return {
    type: FORUM_INFO_IS_LOADING,
    isLoading,
  };
}

export function forumInfoLoadSuccess(forumInfo: ForumInfo[]): ForumInfoLoadSuccessAction {
  return {
    type: FORUM_INFO_LOAD_SUCCESS,
    forumInfo,
  };
}
