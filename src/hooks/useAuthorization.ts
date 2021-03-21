import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationData } from '../api/types';
import { ApplicationState } from '../store/reducers';
import { authorisation, getUser } from '../store/actions/authorization';

type UserAuthorisationType = {
  authUser: (data:AuthorizationData) => void,
  getUserData: () => void,
  isAuth: boolean,
  userAuthData:Record<string, string|number>|undefined,
  isAuthLoading:boolean,
}

export function useAuthorisation():UserAuthorisationType {
  const [userAuthData, setUserData] = useState<Record<string, string|number>>();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const authUser = useCallback((data:AuthorizationData) => {
    setIsAuthLoading(true);
    dispatch(authorisation(data));
    const errorMessage = useSelector((state:ApplicationState) => {
      return state.authorisation.errorMessage;
    });
    const requestSuccess = useSelector((state:ApplicationState) => {
      return state.authorisation.requestSuccess;
    });
    if (errorMessage !== '' && requestSuccess) {
      setIsAuthLoading(false);
    }
  }, [authorisation]);

  const getUserData = useCallback(() => {
    dispatch(getUser());
    const userData = useSelector((state:ApplicationState) => {
      return state.authorisation.userData;
    });
    setUserData(userData);
  }, [getUser]);

  return {
    authUser,
    getUserData,
    isAuth: Boolean(userAuthData),
    userAuthData,
    isAuthLoading,
  };
}
