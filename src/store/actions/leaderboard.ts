import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { leaderboardInfoLoading, leaderboardInfoLoadSuccess, LeaderInfo } from '../actionCreators/leaderboard';
import Leaderboard from '../../api/leaderboard/leaderboard';

export const LEADERBOARD_INFO_IS_LOADING = 'LEADERBOARD_INFO_IS_LOADING';
export const LEADERBOARD_INFO_LOAD_SUCCESS = 'LEADERBOARD_INFO_LOAD_SUCCESS';

export function fetchLeaderboardInfo():
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(leaderboardInfoLoading(true));
    Leaderboard.get().then((info) => {
      const leaders = info.map((x, index) => {
        const { data } = x;
        data.position = index + 1;
        return data;
      });
      dispatch(leaderboardInfoLoading(false));
      dispatch(leaderboardInfoLoadSuccess(leaders as unknown as LeaderInfo[]));
    });
  };
}
