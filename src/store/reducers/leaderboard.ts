import { LEADERBOARD_INFO_IS_LOADING, LEADERBOARD_INFO_LOAD_SUCCESS } from '../actions/leaderboard';
import { LeaderInfo, LeaderboardAction } from '../actionCreators/leaderboard';

export interface LeaderboardState {
  isLoading: boolean;
  info: LeaderInfo[];
}

const defaultLeaderboardState: LeaderboardState = {
  isLoading: false,
  info: [],
};

export function leaderboardReducer(
  state: LeaderboardState = defaultLeaderboardState,
  action: LeaderboardAction,
): LeaderboardState {
  switch (action.type) {
    case LEADERBOARD_INFO_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case LEADERBOARD_INFO_LOAD_SUCCESS:
      return {
        ...state,
        info: action.payload.info,
      };

    default:
      return state;
  }
}
