import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import {
  registrationRequestSent,
  registrationSuccessful,
  registrationFailed,
  registrationResetState,
} from '../actionCreators/registration';
import { RegistrationData } from '../../api/types';
import RegistationApi from '../../api/reg/registration';

export function register(data: RegistrationData):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    dispatch(registrationRequestSent());

    RegistationApi.create(data).then(() => {
      dispatch(registrationSuccessful());
    }).catch(({ message }) => {
      dispatch(registrationFailed(message));
    }).finally(() => {
      setTimeout(() => {
        dispatch(registrationResetState());
      }, 2000);
    });
  };
}
