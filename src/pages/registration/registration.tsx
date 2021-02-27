import React, { PureComponent } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import { RegistrationData } from '../../api/types';
import './registration.css';

interface RegistrationState {
  error: null | string;
}

interface RegistrationFormData extends RegistrationData {
  'second_password': string;
}

interface RegistrationPageProps extends RouteComponentProps {
  requestSent: boolean;
  requestSuccess?: boolean;
  errorMessage: string;
  register: (data: RegistrationData) => void;
}

class Registration extends PureComponent<RegistrationPageProps, RegistrationState> {
  constructor(props: RegistrationPageProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  regRequest = (_data: Record<string, string>): void => {
    this.setState({ error: null });

    const data = _data as unknown as RegistrationFormData;

    if (data.password === data.second_password) {
      this.props.register(data);
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
      href: '/authorization',
    },
  };

  render(): JSX.Element {
    let registrationError = null;

    if (this.props.requestSent) {
      if (this.props.requestSuccess) {
        return <Redirect to='/game'/>;
      }

      if (this.props.requestSuccess === false) {
        registrationError = this.props.errorMessage;
      } else {
        return <>Loading...</>;
      }
    }

    return <div className="registrationPage">
      <Form
        {...this.formSettings}
        submit={this.regRequest}
        error={this.state.error || registrationError}
      />
      </div>;
  }
}
export default withRouter(Registration);
