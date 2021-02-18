import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import RegistationApi from '../../api/reg/registration';
import { RegistrationData } from '../../api/types';
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
    if (history) history.push('/game');
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
    formHeader: 'Регистрация',
    inputsInfo: [{
      name: 'email', value: '', placeholder: 'Почта', type: 'text', validate: ['required', 'email'],
    }, {
      name: 'login', value: '', placeholder: 'Логин', type: 'text', validate: ['required'],
    }, {
      name: 'first_name', value: '', placeholder: 'Имя', type: 'text', validate: ['required'],
    },
    {
      name: 'second_name', value: '', placeholder: 'Фамилия', type: 'text', validate: ['required'],
    },
    {
      name: 'phone', value: '', placeholder: 'Телефон', type: 'text', validate: ['required', 'phone'],
    },
    {
      name: 'password', value: '', placeholder: 'Пароль', type: 'password', validate: ['required'],
    },
    {
      name: 'second_password', value: '', placeholder: 'Подтвердите пароль', type: 'password', validate: ['required'],
    },
    ],
    submitText: 'Зарегистрироваться',
    redirLinkInfo: {
      text: 'Войти',
      href: '/login',
    },
  };

  render():JSX.Element {
    return <div className="registrationPage">
      <Form {...this.formSettings} submit={this.regRequest} error={this.state.error}></Form>
      </div>;
  }
}
export default withRouter(Registration);
