declare namespace Express {
  export interface Response {
    renderBundle(): void;
  }

  export interface Request {
    isAuthenticated: boolean;
    user: undefined | UserInfo;
  }

  export interface UserInfo {
    id: number,
    'first_name': string,
    'second_name': string,
    'display_name': string,
    login: string,
    email: string,
    phone: string,
    avatar: string
  }
}
