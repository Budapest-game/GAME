import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationData } from '../api/types';
import { ApplicationState } from '../store/reducers';
import { authorisation, logout } from '../store/actions/authorization';

type UserAuthorisationType = {
  authUser: (data:AuthorizationData) => void,
  logoutUser: () => void,
  isAuth: boolean,
  userAuthData:Express.UserInfo | undefined,
}

export function useAuthorisation():UserAuthorisationType {
  const dispatch = useDispatch();
  const user = useSelector((state:ApplicationState) => {
    return state.authorisation.user;
  });
  const authUser = useCallback(async (data:AuthorizationData) => {
    await dispatch(authorisation(data));
  }, [authorisation]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [logout]);

  return {
    authUser,
    logoutUser,
    isAuth: Boolean(user),
    userAuthData: user,
  };
}
