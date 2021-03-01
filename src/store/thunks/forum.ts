import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { forumInfoLoading, forumInfoLoadSuccess, ForumInfo } from '../actionCreators/forum';

const forumsInfo: ForumInfo[] = [
  {
    name: 'Раздел 1',
    themes: [
      {
        name: 'Тема 1',
        postsCount: 40,
      },
      {
        name: 'Тема 2',
        postsCount: 32,
      },
      {
        name: 'Тема 3',
        postsCount: 2,
      },
    ],
  },
  {
    name: 'Раздел 2',
    themes: [
      {
        name: 'Тема 1',
        postsCount: 0,
      },
      {
        name: 'Тема 2',
        postsCount: 32,
      },
      {
        name: 'Тема 3',
        postsCount: 1,
      },
    ],
  },
];

export function fetchForumInfo(/* url: string */):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(forumInfoLoading(true));

    // fetch data from server

    setTimeout(() => {
      dispatch(forumInfoLoading(false));
      dispatch(forumInfoLoadSuccess(forumsInfo));
    }, 3000);
  };
}
