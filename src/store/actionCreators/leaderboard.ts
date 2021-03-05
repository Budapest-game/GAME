import { Action } from 'redux';
import { LEADERBOARD_INFO_IS_LOADING, LEADERBOARD_INFO_LOAD_SUCCESS } from '../actions/leaderboard';

export interface LeaderInfo {
  name: string,
  score: number,
  position: number,
  avatar: string,
}

export interface LeaderboardInfo {
  leaders: LeaderInfo[],
}

export interface LeaderboardInfoLoadingAction extends Action<typeof LEADERBOARD_INFO_IS_LOADING> {
  payload: {
    leaderboardIsLoading: boolean;
  }
}

export interface LeaderboardInfoLoadSuccessAction extends
Action<typeof LEADERBOARD_INFO_LOAD_SUCCESS> {
  payload: {
    leaderboardInfo: LeaderInfo[];
  }
}

export type LeaderboardAction = LeaderboardInfoLoadingAction | LeaderboardInfoLoadSuccessAction;

export function leaderboardInfoLoading(leaderboardIsLoading: boolean): LeaderboardInfoLoadingAction {
  return {
    type: LEADERBOARD_INFO_IS_LOADING,
    payload: {
      leaderboardIsLoading,
    },
  };
}

export function leaderboardInfoLoadSuccess(leaderboardInfo: LeaderInfo[]):
LeaderboardInfoLoadSuccessAction {
  return {
    type: LEADERBOARD_INFO_LOAD_SUCCESS,
    payload: {
      leaderboardInfo,
    },
  };
}
