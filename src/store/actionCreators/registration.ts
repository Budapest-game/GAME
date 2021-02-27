import { Action } from 'redux';
import {
  REGISTRATION_REQUEST_SENT,
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILED,
  REGISTRATION_RESET_STATE,
} from '../actions/registration';

export interface RegistrationRequestSentAction extends Action<typeof REGISTRATION_REQUEST_SENT> {
  requestSent: boolean;
}

export interface RegistrationSuccessAction extends Action<typeof REGISTRATION_SUCCESSFUL> {
  requestSuccess: boolean;
}

export interface RegistrationFailedAction extends Action<typeof REGISTRATION_FAILED> {
  requestSuccess: boolean;
  registrationErrorMessage: string;
}

export interface RegistrationResetStateAction extends Action<typeof REGISTRATION_RESET_STATE> {
  registrationErrorMessage: string;
  requestSent: boolean;
  requestSuccess?: boolean;
}

export type RegistrationAction = RegistrationRequestSentAction
  | RegistrationSuccessAction
  | RegistrationFailedAction
  | RegistrationResetStateAction;

export function registrationRequestSent(): RegistrationRequestSentAction {
  return {
    type: REGISTRATION_REQUEST_SENT,
    requestSent: true,
  };
}

export function registrationSuccessful(): RegistrationSuccessAction {
  return {
    type: REGISTRATION_SUCCESSFUL,
    requestSuccess: true,
  };
}

export function registrationFailed(errorMessage: string): RegistrationFailedAction {
  return {
    type: REGISTRATION_FAILED,
    registrationErrorMessage: errorMessage,
    requestSuccess: false,
  };
}

export function registrationResetState(): RegistrationResetStateAction {
  return {
    type: REGISTRATION_RESET_STATE,
    registrationErrorMessage: '',
    requestSent: false,
    requestSuccess: undefined,
  };
}
