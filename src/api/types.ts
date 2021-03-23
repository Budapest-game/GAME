export interface RegistrationData{
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'password': string,
  'phone': string
}
export interface AuthorizationData{
  'login': string,
  'password': string
}
export interface UserInfoUpdateData{
  'first_name': string,
  'second_name': string,
  'display_name': string,
  'login': string,
  'email': string,
  'phone': string
}

export interface UserPassUpdateData{
  'oldPassword': string,
  'newPassword': string
}

export interface Leader{
  'id': number,
  'name': string,
  'budapestScore': number,
  'avatar': string,
  'position'?: number
}
export interface LeaderboardData{
  'data': Leader,
  'ratingFieldName': string
}

export interface GetLeaders{
  'ratingFieldName': string,
  'cursor': number,
  'limit': number
}
