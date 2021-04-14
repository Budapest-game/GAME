import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationData } from '../api/types';
import { ApplicationState } from '../store/reducers';
import { authorisation, getUser } from '../store/actions/authorization';

type UserAuthorisationType = {
  authUser: (data:AuthorizationData) => void,
  isAuth: boolean,
  userAuthData:Express.UserInfo | undefined,
  isAuthLoading:boolean,
}

export function useAuthorisation():UserAuthorisationType {
  const [userAuthData, setUserData] = useState<Express.UserInfo>();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const errorMessage = useSelector((state:ApplicationState) => {
    return state.authorisation.errorMessage;
  });
  const requestSuccess = useSelector((state:ApplicationState) => {
    return state.authorisation.requestSuccess;
  });
  const userData = useSelector((state:ApplicationState) => {
    return state.authorisation.user;
  });

  const authUser = useCallback((data:AuthorizationData) => {
    dispatch(authorisation(data));
    if (errorMessage !== '' && requestSuccess) {
      dispatch(getUser());
      setUserData(userData);
    }
    setIsAuthLoading(false);
  }, [authorisation]);

  return {
    authUser,
    isAuth: Boolean(userAuthData),
    userAuthData,
    isAuthLoading,
  };
}
