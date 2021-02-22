import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import AuthorizationApi from '../../api/auth/authorization';
import { AuthorizationData } from '../../api/types';
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
    if (history) history.push('/game');
  }

  loginReq = (data: Record<string, string>):void => {
    AuthorizationApi.logIn(data as unknown as AuthorizationData).then(() => {
      this.redirectToGame();
    }).catch(({ message }) => {
      this.setState({ error: message });
    });
  }

  formSettings = {
    className: 'authorizationForm',
    formHeader: 'Вход',
    inputsInfo: [{
      name: 'login', value: '', placeholder: 'Логин', type: 'text', validate: ['required'],
    },
    {
      name: 'password', value: '', placeholder: 'Пароль', type: 'password', validate: ['required'],
    },
    ],
    submitText: 'Авторизация',
    redirLinkInfo: {
      text: 'Нет аккаунта?',
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
