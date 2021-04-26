import React, { useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthorisation } from '../../hooks/useAuthorization';
import { Form } from '../../components/form/form';
import OAuth from '../../api/oauth/oauth';
import textContent from './textContent';
import { AuthorizationData } from '../../api/types';

interface AuthorizationProps{
  errorMessage: string | undefined,
  isAuthenticated: boolean
}

export default function Authorization(props: AuthorizationProps):JSX.Element {
  const { authUser } = useAuthorisation();

  if (props.isAuthenticated) {
    return <Redirect to='/game'/>;
  }

  const loginReq = (data: Record<string, string>):void => {
    authUser(data as unknown as AuthorizationData);
  };

  const getOauthToken = useCallback(():void => {
    OAuth.getToken().then((res) => {
      if (res.service_id) {
        const redirectUrl = process.env.NODE_ENV ? 'https://local.ya-praktikum.tech:5000/' : 'https://morning-chamber-87005.herokuapp.com/';
        // eslint-disable-next-line no-restricted-globals
        location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${redirectUrl}`;
      }
    });
  }, []);

  const formSettings = useMemo(() => {
    return {
      className: 'authorizationForm',
      formHeader: textContent.header,
      inputsInfo: [{
        name: 'login', value: '', placeholder: textContent.login, type: 'text', validate: ['required'],
      },
      {
        name: 'password', value: '', placeholder: textContent.password, type: 'password', validate: ['required'],
      },
      ],
      buttonsInfo: [
        {
          type: 'submit' as ('submit'),
          text: textContent.submit,
        },
        {
          type: 'button' as ('button'),
          text: textContent.yandex,
          className: 'oauth',
          onClick: getOauthToken,
        },
      ],
      redirLinkInfo: {
        text: textContent.link,
        href: '/registration',
      },
    };
  }, []);

  return <div className="authorizationPage">
      <Form {...formSettings} submit={loginReq} error={props.errorMessage}/>
      </div>;
}
