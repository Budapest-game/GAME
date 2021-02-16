import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import Reg from '../../api/reg/registration';
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
      Reg.create(data as unknown as RegistrationData).then((resp) => {
        if (resp.status === 200) {
          this.redirectToGame();
        } else if (resp.body && resp.body.reason) {
          this.setState({ error: resp.body.reason });
        } else {
          this.setState({ error: resp.text });
        }
      });
    } else {
      this.setState({ error: 'Пароли не совпадают' });
    }
  }

  render():JSX.Element {
    const formSettings = {
      baseClass: 'registrationForm',
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
    return <div className="registrationPage">
      <Form {...formSettings} submit={this.regRequest} error={this.state.error}></Form>
      </div>;
  }
}
export default withRouter(Registration);
