import { RegistrationAction } from '../actionCreators/registration';
import {
  REGISTRATION_REQUEST_SENT,
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILED,
  REGISTRATION_RESET_STATE,
} from '../actions/registration';

export interface RegistrationState {
  requestSent: boolean;
  requestSuccess?: boolean;
  registrationErrorMessage: string;
}

const defaultRegistrationState: RegistrationState = {
  requestSent: false,
  requestSuccess: undefined,
  registrationErrorMessage: '',
};

export function registrationReducer(
  state: RegistrationState = defaultRegistrationState,
  action: RegistrationAction,
): RegistrationState {
  switch (action.type) {
    case REGISTRATION_REQUEST_SENT:
      return {
        ...state,
        requestSent: action.payload.requestSent,
      };

    case REGISTRATION_SUCCESSFUL:
      return {
        ...state,
        requestSuccess: action.payload.requestSuccess,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        requestSuccess: action.payload.requestSuccess,
        registrationErrorMessage: action.payload.registrationErrorMessage,
      };

    case REGISTRATION_RESET_STATE:
      return {
        ...state,
        requestSent: action.payload.requestSent,
        requestSuccess: action.payload.requestSuccess,
        registrationErrorMessage: action.payload.registrationErrorMessage,
      };

    default:
      return state;
  }
}
