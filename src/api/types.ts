export type postData = RegistrationData | AuthorizationData
| LeaderboardData | GetLeaders | OAuthInterface | createTopicData
| updateTopicData | createCommentData;

export type putData = UserPassUpdateData | UserInfoUpdateData;
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

export interface OAuthInterface{
  'code': string,
}

export interface createTopicData{
  name: string,
  content: string,
}

export interface updateTopicData{
    name? : string,
    content?:string
}

export interface TopicInfo{
  topicId: number
  name: string,
  content: string,
  comments: CommentInfo[],
  userId: number,
}
export interface CommentInfo{
  commentId: number,
  content: string,
  replies: ReplyInfo[],
  replyTo: null | number,
  topicId: number,
  userId: number,
  reactions: reaction[],
}
export interface reaction{
  reactionId: number,
  reactionType: string
}
export interface ReplyInfo{
  commentId: number,
  content: string,
  topicId: number,
  userId: number,
}

export interface createCommentData{
  topicId: string,
  content: string,
  replyTo: string | null
}
export interface ThemeResponse {
  id: string;
  theme: string;
}

export interface UserThemeResponse{
  themeId: string,
  userId: number,
  theme: ThemeResponse
}
