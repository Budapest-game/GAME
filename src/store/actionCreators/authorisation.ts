import { Action } from 'redux';
import {
  AUTHORIZATION_REQUEST_SENT,
  AUTHORIZATION_SUCCESSFUL,
  AUTHORIZATION_FAILED,
  AUTHORIZATION_RESET_STATE,
  AUTHORIZATION_GET_USER_DATA,
} from '../actions/authorization';

export interface AuthorisationRequestSentAction extends Action<typeof AUTHORIZATION_REQUEST_SENT> {
  payload: {
    requestSent: boolean;
  }
}

export interface AuthorisationSuccessAction extends Action<typeof AUTHORIZATION_SUCCESSFUL> {
  payload: {
    requestSuccess: boolean;
  }
}

export interface AuthorisationFailedAction extends Action<typeof AUTHORIZATION_FAILED> {
  payload: {
    authorisationErrorMessage: string;
    requestSuccess: boolean;
  }
}

export interface AuthorisationResetStateAction extends Action<typeof AUTHORIZATION_RESET_STATE> {
  payload: {
    authorisationErrorMessage: string;
    requestSent: boolean;
    requestSuccess?: boolean;
  }
}

export interface AuthorizationGetUserDataAction extends Action<typeof AUTHORIZATION_GET_USER_DATA> {
  payload: {
    data: Record<string, string|number>
  }
}

export type AuthorisationAction = AuthorisationRequestSentAction
  | AuthorisationSuccessAction
  | AuthorisationFailedAction
  | AuthorisationResetStateAction
  | AuthorizationGetUserDataAction;

export function authorisationRequestSent(): AuthorisationRequestSentAction {
  return {
    type: AUTHORIZATION_REQUEST_SENT,
    payload: {
      requestSent: true,
    },
  };
}

export function authorisationSuccessful(): AuthorisationSuccessAction {
  return {
    type: AUTHORIZATION_SUCCESSFUL,
    payload: {
      requestSuccess: true,
    },
  };
}

export function authorisationFailed(errorMessage: string): AuthorisationFailedAction {
  return {
    type: AUTHORIZATION_FAILED,
    payload: {
      authorisationErrorMessage: errorMessage,
      requestSuccess: false,
    },
  };
}

export function authorisationResetState(): AuthorisationResetStateAction {
  return {
    type: AUTHORIZATION_RESET_STATE,
    payload: {
      authorisationErrorMessage: '',
      requestSent: false,
      requestSuccess: undefined,
    },
  };
}

export function authorisationGetUserData(data: Record<string, string|number>)
  :AuthorizationGetUserDataAction {
  return {
    type: AUTHORIZATION_GET_USER_DATA,
    payload: { data },
  };
}
