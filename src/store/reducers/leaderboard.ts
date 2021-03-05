import { LEADERBOARD_INFO_IS_LOADING, LEADERBOARD_INFO_LOAD_SUCCESS } from '../actions/leaderboard';
import { LeaderInfo, LeaderboardAction } from '../actionCreators/leaderboard';

export interface LeaderboardState {
  leaderboardIsLoading: boolean;
  leaderboardInfo: LeaderInfo[];
}

const defaultLeaderboardState: LeaderboardState = {
  leaderboardIsLoading: false,
  leaderboardInfo: [],
};

export function leaderboardReducer(
  state: LeaderboardState = defaultLeaderboardState,
  action: LeaderboardAction,
): LeaderboardState {
  switch (action.type) {
    case LEADERBOARD_INFO_IS_LOADING:
      return {
        ...state,
        leaderboardIsLoading: action.payload.leaderboardIsLoading,
      };

    case LEADERBOARD_INFO_LOAD_SUCCESS:
      return {
        ...state,
        leaderboardInfo: action.payload.leaderboardInfo,
      };

    default:
      return state;
  }
}
