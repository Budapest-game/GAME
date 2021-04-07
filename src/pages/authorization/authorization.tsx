import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import AuthorizationApi from '../../api/auth/authorization';
import OAuth from '../../api/oauth/oauth';
import { AuthorizationData } from '../../api/types';
import textContent from './textContent';
import './authorization.css';

interface AuthorizationState extends RouteComponentProps {
  error?: null | string;
}

class Authorization extends PureComponent<AuthorizationState> {
  state = {
    error: null,
  }

  redirectToGame = () => {
    const { history } = this.props;
    history.push('/game');
  }

  loginReq = (data: Record<string, string>):void => {
    AuthorizationApi.logIn(data as unknown as AuthorizationData).then(() => {
      this.redirectToGame();
    }).catch(({ message }) => {
      this.setState({ error: message });
    });
  }

  getOauthToken = ():void => {
    OAuth.getToken().then((res) => {
      if (res.service_id) {
        const redirectUrl = process.env.NODE_ENV ? 'https://local.ya-praktikum.tech:5000/' : 'https://morning-chamber-87005.herokuapp.com/';
        // eslint-disable-next-line no-restricted-globals
        location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${redirectUrl}`;
      }
    });
  }

  formSettings = {
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
        onClick: this.getOauthToken,
      },
    ],
    redirLinkInfo: {
      text: textContent.link,
      href: '/registration',
    },
  };

  render():JSX.Element {
    return <div className="authorizationPage">
      <Form {...this.formSettings} submit={this.loginReq} error={this.state.error}/>
      </div>;
  }
}
export default withRouter(Authorization);
