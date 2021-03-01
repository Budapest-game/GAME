import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { forumInfoLoading, forumInfoLoadSuccess } from '../actionCreators/forum';
import { forumInfo } from './forumFakeData';

export const FORUM_INFO_IS_LOADING = 'FORUM_INFO_IS_LOADING';
export const FORUM_INFO_LOAD_SUCCESS = 'FORUM_INFO_LOAD_SUCCESS';

export function fetchForumInfo(/* url: string */):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(forumInfoLoading(true));

    // fetch data from server

    setTimeout(() => {
      dispatch(forumInfoLoading(false));
      dispatch(forumInfoLoadSuccess(forumInfo));
    }, 3000);
  };
}
