import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import RegistationApi from '../../api/reg/registration';
import { RegistrationData } from '../../api/types';
import textContent from './textContent';
import './registration.css';

interface RegistrationState extends RouteComponentProps {
  error?: null | string;
}

class Registration extends PureComponent<RegistrationState> {
  state = {
    error: null,
  }

  redirectToGame = () => {
    const { history } = this.props;
    history.push('/game');
  }

  regRequest = (data: Record<string, string>):void => {
    if (data.password === data.second_password) {
      RegistationApi.create(data as unknown as RegistrationData).then(() => {
        this.redirectToGame();
      }).catch(({ message }) => {
        this.setState({ error: message });
      });
    } else {
      this.setState({ error: 'Пароли не совпадают' });
    }
  }

  formSettings = {
    className: 'registrationForm',
    formHeader: textContent.header,
    inputsInfo: [{
      name: 'email', value: '', placeholder: textContent.email, type: 'text', validate: ['required', 'email'],
    }, {
      name: 'login', value: '', placeholder: textContent.login, type: 'text', validate: ['required'],
    }, {
      name: 'first_name', value: '', placeholder: textContent.first_name, type: 'text', validate: ['required'],
    },
    {
      name: 'second_name', value: '', placeholder: textContent.second_name, type: 'text', validate: ['required'],
    },
    {
      name: 'phone', value: '', placeholder: textContent.phone, type: 'text', validate: ['required', 'phone'],
    },
    {
      name: 'password', value: '', placeholder: textContent.password, type: 'password', validate: ['required'],
    },
    {
      name: 'second_password', value: '', placeholder: textContent.second_password, type: 'password', validate: ['required'],
    },
    ],
    submitText: textContent.submit,
    redirLinkInfo: {
      text: textContent.link,
      href: '/authorization',
    },
  };

  render():JSX.Element {
    return <div className="registrationPage">
      <Form {...this.formSettings} submit={this.regRequest} error={this.state.error}/>
      </div>;
  }
}
export default withRouter(Registration);
