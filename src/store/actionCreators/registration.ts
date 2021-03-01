import { Action } from 'redux';
import {
  REGISTRATION_REQUEST_SENT,
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILED,
  REGISTRATION_RESET_STATE,
} from '../actions/registration';

export interface RegistrationRequestSentAction extends Action<typeof REGISTRATION_REQUEST_SENT> {
  payload: {
    requestSent: boolean;
  }
}

export interface RegistrationSuccessAction extends Action<typeof REGISTRATION_SUCCESSFUL> {
  payload: {
    requestSuccess: boolean;
  }
}

export interface RegistrationFailedAction extends Action<typeof REGISTRATION_FAILED> {
  payload: {
    registrationErrorMessage: string;
    requestSuccess: boolean;
  }
}

export interface RegistrationResetStateAction extends Action<typeof REGISTRATION_RESET_STATE> {
  payload: {
    registrationErrorMessage: string;
    requestSent: boolean;
    requestSuccess?: boolean;
  }
}

export type RegistrationAction = RegistrationRequestSentAction
  | RegistrationSuccessAction
  | RegistrationFailedAction
  | RegistrationResetStateAction;

export function registrationRequestSent(): RegistrationRequestSentAction {
  return {
    type: REGISTRATION_REQUEST_SENT,
    payload: {
      requestSent: true,
    },
  };
}

export function registrationSuccessful(): RegistrationSuccessAction {
  return {
    type: REGISTRATION_SUCCESSFUL,
    payload: {
      requestSuccess: true,
    },
  };
}

export function registrationFailed(errorMessage: string): RegistrationFailedAction {
  return {
    type: REGISTRATION_FAILED,
    payload: {
      registrationErrorMessage: errorMessage,
      requestSuccess: false,
    },
  };
}

export function registrationResetState(): RegistrationResetStateAction {
  return {
    type: REGISTRATION_RESET_STATE,
    payload: {
      registrationErrorMessage: '',
      requestSent: false,
      requestSuccess: undefined,
    },
  };
}
