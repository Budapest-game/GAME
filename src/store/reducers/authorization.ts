import { AuthorisationAction } from '../actionCreators/authorisation';
import {
  AUTHORIZATION_STARTED,
  AUTHORIZATION_SUCCESSFUL,
  AUTHORIZATION_FAILED,
  AUTHORIZATION_RESET_STATE,
  AUTHORIZATION_GET_USER_DATA,
} from '../actions/authorization';

export interface AuthorizationState {
  requestSent: boolean;
  requestSuccess?: boolean;
  errorMessage: string;
  userData: Record<string, string|number>
}

const defaultAuthorizationState: AuthorizationState = {
  requestSent: false,
  requestSuccess: undefined,
  errorMessage: '',
  userData: {
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
  },
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
        userData: action.payload.data,
      };

    default:
      return state;
  }
}
