import React, { PureComponent } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import { RegistrationData } from '../../api/types';
import textContent from './textContent';
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

  redirectToGame = () => {
    const { history } = this.props;
    history.push('/game');
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
