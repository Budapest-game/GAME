import { useState, useEffect } from 'react';
import { AuthorizationData } from '../api/types';
import Authorization from '../api/auth/authorization';
import User from '../api/user/user';

type UserAuthorisationType = {
  authUser: (data:AuthorizationData) => void,
  isAuth: boolean,
  userData:Record<string, string|number>|undefined,
  isAuthLoading:boolean,
}

export function useAuthorisation():UserAuthorisationType {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<Record<string, string|number>>();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const authUser = (data:AuthorizationData):void => {
    setIsAuthLoading(true);
    Authorization.logIn(data).then((res) => {
      setIsAuth(res);
      setIsAuthLoading(false);
    });
  };

  useEffect(() => {
    if (isAuth) {
      User.get().then((res) => {
        setUserData(res);
      });
    }
  });

  return {
    authUser,
    isAuth,
    userData,
    isAuthLoading,
  };
}
