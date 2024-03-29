import { AuthorisationAction } from '../actionCreators/authorisation';
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

export interface AuthorizationState {
  requestSent?: boolean;
  requestSuccess?: boolean;
  errorMessage?: string;
  logoutRequestSent?: boolean;
  logoutRequestSuccess?: boolean;
  logoutErrorMessage?: string;
  isAuthenticated: boolean;
  user: Express.UserInfo | undefined;
}

const defaultAuthorizationState: AuthorizationState = {
  requestSent: false,
  requestSuccess: undefined,
  errorMessage: '',
  isAuthenticated: false,
  logoutRequestSent: false,
  logoutRequestSuccess: undefined,
  logoutErrorMessage: '',
  user: undefined,
};

export function authorizationReducer(
  state: AuthorizationState = defaultAuthorizationState,
  action: AuthorisationAction,
): AuthorizationState {
  switch (action.type) {
    case AUTHORIZATION_STARTED:
      return {
        ...state,
        requestSent: action.payload.requestSent,
      };

    case AUTHORIZATION_SUCCESSFUL:
      return {
        ...state,
        requestSuccess: action.payload.requestSuccess,
      };

    case AUTHORIZATION_FAILED:
      return {
        ...state,
        requestSuccess: action.payload.requestSuccess,
        errorMessage: action.payload.errorMessage,
        isAuthenticated: false,
        user: undefined,
      };

    case AUTHORIZATION_RESET_STATE:
      return {
        ...state,
        requestSent: false,
        requestSuccess: undefined,
        errorMessage: '',
      };

    case AUTHORIZATION_GET_USER_DATA:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
      };

    case LOGOUT_STARTED:
      return {
        ...state,
        logoutRequestSent: action.payload.requestSent,
      };

    case LOGOUT_SUCCESSFUL:
      return {
        ...state,
        logoutRequestSuccess: action.payload.requestSuccess,
        isAuthenticated: false,
        user: undefined,
      };

    case LOGOUT_FAILED:
      return {
        ...state,
        logoutRequestSuccess: action.payload.requestSuccess,
        logoutErrorMessage: action.payload.errorMessage,
        isAuthenticated: false,
        user: undefined,
      };

    case LOGOUT_RESET_STATE:
      return {
        ...state,
        logoutRequestSent: false,
        logoutRequestSuccess: undefined,
        logoutErrorMessage: '',
        isAuthenticated: false,
        user: undefined,
      };

    default:
      return state;
  }
}
