import { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { AuthorizationData } from '../api/types';
import { authorisation, getUser } from '../store/actions/authorization';

type UserAuthorisationType = {
  authUser: (data:AuthorizationData) => void,
  getUserData: () => void,
  isAuth: boolean,
  userAuthData:Record<string, string|number>|undefined,
  isAuthLoading:boolean,
}

export function useAuthorisation():UserAuthorisationType {
  const [isAuth, setIsAuth] = useState(false);
  const [userAuthData, setUserData] = useState<Record<string, string|number>>();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();
  const state = store.getState();

  const authUser = (data:AuthorizationData):void => {
    setIsAuthLoading(true);
    // тут асинхронный вызов, как из него получить промис?
    dispatch(authorisation(data));
    if (state.authorisation.authorisationErrorMessage === '') {
      setIsAuth(state.authorisation.requestSuccess);
      setIsAuthLoading(false);
    }
  };

  const getUserData = ():void => {
    // Тот же вопрос, тоже асинхронщина, как после кк выполнения положить данные в setUserData?
    dispatch(getUser());
    const { userData } = store.getState().authorisation;
    setUserData(userData);
  };

  return {
    authUser,
    getUserData,
    isAuth,
    userAuthData,
    isAuthLoading,
  };
}
