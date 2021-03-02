import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import textContent from './textContent'
interface ChangePasswordState extends RouteComponentProps {
  error?: null | string,
}

class ChangePassword extends PureComponent<ChangePasswordState> {
  state = {
    error: null,
  }

  formSettings = {
    className: 'changeDataForm',
    formHeader: 'Изменить пароль',
    inputsInfo: [{
      name: 'password', value: '', placeholder: textContent.password, type: 'password', validate: ['required'],
    },
    {
      name: 'second_password', value: '', placeholder: textContent.second_password, type: 'password', validate: ['required'],
    },
    ],
    submitText: 'Сохранить',
    redirLinkInfo: {
      text: 'Страница пользователя',
      href: '/profile',
    },
  };

  render():JSX.Element {
    return <div className="changePasswordPage">
      <Form {...this.formSettings} submit={() => { return true; }} error={this.state.error}/>
      </div>;
  }
}
export default withRouter(ChangePassword);