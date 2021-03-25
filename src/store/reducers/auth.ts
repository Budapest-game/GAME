export interface AuthState {
  isAuthenticated: boolean;
  user: Express.UserInfo | null;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export function authReducer(
  state: AuthState = defaultAuthState,
): AuthState {
  return state;
}
