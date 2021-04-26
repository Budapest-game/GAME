import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import {
  authorisationInProgress,
  authorisationSuccessful,
  authorisationFailed,
  authorisationResetState,
  authorisationGetUserData,
  logoutInProgress,
  logoutSuccessful,
  logoutFailed,
  logoutResetState,
} from '../actionCreators/authorisation';
import { AuthorizationData } from '../../api/types';
import Authorization from '../../api/auth/authorization';
import User from '../../api/user/user';

export const AUTHORIZATION_STARTED = 'AUTHORIZATION_STARTED';
export const AUTHORIZATION_SUCCESSFUL = 'AUTHORIZATION_SUCCESSFUL';
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';
export const AUTHORIZATION_RESET_STATE = 'AUTHORIZATION_RESET_STATE';
export const AUTHORIZATION_GET_USER_DATA = 'AUTHORIZATION_GET_USER_DATA';
export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_RESET_STATE = 'LOGOUT_RESET_STATE';

export function authorisation(data: AuthorizationData):
  ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return async (dispatch: Dispatch) => {
    dispatch(authorisationInProgress());
    try {
      await Authorization.logIn(data);
      dispatch(authorisationSuccessful());
      const userData = await User.get();
      dispatch(authorisationGetUserData(userData));
    } catch ({ message }) {
      dispatch(authorisationFailed(message));
    }
    setTimeout(() => {
      dispatch(authorisationResetState());
    }, 3000);
  };
}

export function logout():
  ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(logoutInProgress());
    Authorization.logOut().then(() => {
      dispatch(logoutSuccessful());
    }).catch(({ message }) => {
      dispatch(logoutFailed(message));
    }).finally(() => {
      setTimeout(() => {
        dispatch(logoutResetState());
      }, 3000);
    });
  };
}
