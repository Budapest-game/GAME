import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';

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
      name: 'password', value: '', placeholder: 'Пароль', type: 'password', validate: ['required'],
    },
    {
      name: 'second_password', value: '', placeholder: 'Подтвердите пароль', type: 'password', validate: ['required'],
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
