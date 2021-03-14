import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import AuthorizationApi from '../../api/auth/authorization';
import { AuthorizationData } from '../../api/types';
import textContent from './textContent';

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
    submitText: textContent.submit,
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
