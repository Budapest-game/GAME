import { Action } from 'redux';
import {
  AUTHORIZATION_STARTED,
  AUTHORIZATION_SUCCESSFUL,
  AUTHORIZATION_FAILED,
  AUTHORIZATION_RESET_STATE,
  AUTHORIZATION_GET_USER_DATA,
  LOGOUT_STARTED,
  LOGOUT_SUCCESSFUL,
  LOGOUT_FAILED,
  LOGOUT_RESET_STATE,
} from '../actions/authorization';

export interface AuthorisationStartAction extends Action<typeof AUTHORIZATION_STARTED> {
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
    errorMessage: string;
    requestSuccess: boolean;
  }
}

export interface AuthorisationResetStateAction extends Action<typeof AUTHORIZATION_RESET_STATE> {
  payload: {
    errorMessage: string;
    requestSent: boolean;
    requestSuccess?: boolean;
  }
}

export interface LogoutStartAction extends Action<typeof LOGOUT_STARTED> {
  payload: {
    requestSent: boolean;
  }
}

export interface LogoutSuccessAction extends Action<typeof LOGOUT_SUCCESSFUL> {
  payload: {
    requestSuccess: boolean;
  }
}

export interface LogoutFailedAction extends Action<typeof LOGOUT_FAILED> {
  payload: {
    errorMessage: string;
    requestSuccess: boolean;
  }
}

export interface LogoutResetStateAction extends Action<typeof LOGOUT_RESET_STATE> {
  payload: {
    errorMessage: string;
    requestSent: boolean;
    requestSuccess?: boolean;
  }
}

export interface AuthorizationGetUserDataAction extends Action<typeof AUTHORIZATION_GET_USER_DATA> {
  payload: {
    data: Express.UserInfo
  }
}

export type AuthorisationAction = AuthorisationStartAction
  | AuthorisationSuccessAction
  | AuthorisationFailedAction
  | AuthorisationResetStateAction
  | AuthorizationGetUserDataAction
  | LogoutStartAction
  | LogoutSuccessAction
  | LogoutFailedAction
  | LogoutResetStateAction;

export function authorisationInProgress(): AuthorisationStartAction {
  return {
    type: AUTHORIZATION_STARTED,
    payload: {
      requestSent: true,
    },
  };
}

export function logoutInProgress(): LogoutStartAction {
  return {
    type: LOGOUT_STARTED,
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
export function logoutSuccessful(): LogoutSuccessAction {
  return {
    type: LOGOUT_SUCCESSFUL,
    payload: {
      requestSuccess: true,
    },
  };
}
export function authorisationFailed(errorMessage: string): AuthorisationFailedAction {
  return {
    type: AUTHORIZATION_FAILED,
    payload: {
      errorMessage,
      requestSuccess: false,
    },
  };
}
export function logoutFailed(errorMessage: string): LogoutFailedAction {
  return {
    type: LOGOUT_FAILED,
    payload: {
      errorMessage,
      requestSuccess: false,
    },
  };
}
export function logoutResetState(): LogoutResetStateAction {
  return {
    type: LOGOUT_RESET_STATE,
    payload: {
      errorMessage: '',
      requestSent: false,
      requestSuccess: undefined,
    },
  };
}
export function authorisationResetState(): AuthorisationResetStateAction {
  return {
    type: AUTHORIZATION_RESET_STATE,
    payload: {
      errorMessage: '',
      requestSent: false,
      requestSuccess: undefined,
    },
  };
}

export function authorisationGetUserData(data: Express.UserInfo)
  :AuthorizationGetUserDataAction {
  return {
    type: AUTHORIZATION_GET_USER_DATA,
    payload: { data },
  };
}
