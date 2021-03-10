import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import {
  authorisationRequestSent,
  authorisationSuccessful,
  authorisationFailed,
  authorisationResetState,
  authorisationGetUserData,
} from '../actionCreators/authorisation';
import { AuthorizationData } from '../../api/types';
import Authorization from '../../api/auth/authorization';
import User from '../../api/user/user';

export const AUTHORIZATION_REQUEST_SENT = 'AUTHORIZATION_REQUEST_SENT';
export const AUTHORIZATION_SUCCESSFUL = 'AUTHORIZATION_SUCCESSFUL';
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';
export const AUTHORIZATION_RESET_STATE = 'AUTHORIZATION_RESET_STATE';
export const AUTHORIZATION_GET_USER_DATA = 'AUTHORIZATION_GET_USER_DATA';

export function authorisation(data: AuthorizationData):
  ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(authorisationRequestSent());

    Authorization.logIn(data).then(() => {
      dispatch(authorisationSuccessful());
      User.get().then((userData) => {
        dispatch(authorisationGetUserData(userData));
      });
    }).catch(({ message }) => {
      dispatch(authorisationFailed(message));
    }).finally(() => {
      setTimeout(() => {
        dispatch(authorisationResetState());
      }, 3000);
    });
  };
}
