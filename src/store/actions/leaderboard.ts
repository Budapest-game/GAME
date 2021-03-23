import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { leaderboardInfoLoading, leaderboardInfoLoadSuccess } from '../actionCreators/leaderboard';
import { info } from './leaderboardFakeData';

export const LEADERBOARD_INFO_IS_LOADING = 'LEADERBOARD_INFO_IS_LOADING';
export const LEADERBOARD_INFO_LOAD_SUCCESS = 'LEADERBOARD_INFO_LOAD_SUCCESS';

export function fetchLeaderboardInfo(/* url: string */):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(leaderboardInfoLoading(true));

    // fetch data from server

    setTimeout(() => {
      dispatch(leaderboardInfoLoading(false));
      dispatch(leaderboardInfoLoadSuccess(info));
    }, 2000);
  };
}
