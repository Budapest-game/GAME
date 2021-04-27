import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import {
  registrationRequestSent,
  registrationSuccessful,
  registrationFailed,
  registrationResetState,
} from '../actionCreators/registration';
import {
  authorisationGetUserData,
} from '../actionCreators/authorisation';
import { RegistrationData } from '../../api/types';
import RegistationApi from '../../api/reg/registration';
import User from '../../api/user/user';

export const REGISTRATION_REQUEST_SENT = 'REGISTRATION_REQUEST_SENT';
export const REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_RESET_STATE = 'REGISTRATION_RESET_STATE';

export function register(data: RegistrationData):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(registrationRequestSent());

    RegistationApi.create(data).then(() => {
      dispatch(registrationSuccessful());
      User.get().then((userData) => {
        dispatch(authorisationGetUserData(userData));
      });
    }).catch(({ message }) => {
      dispatch(registrationFailed(message));
    }).finally(() => {
      setTimeout(() => {
        dispatch(registrationResetState());
      }, 2000);
    });
  };
}
