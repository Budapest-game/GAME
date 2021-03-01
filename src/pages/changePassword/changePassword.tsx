import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import UserApi from '../../api/user/user';
import { UserPassUpdateData } from '../../api/types';

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
      name: 'oldPassword', value: '', placeholder: 'Старый пароль', type: 'password', validate: ['required'],
    },
    {
      name: 'newPassword', value: '', placeholder: 'Новый пароль', type: 'password', validate: ['required'],
    },
    ],
    submitText: 'Сохранить',
    redirLinkInfo: {
      text: 'Страница пользователя',
      href: '/profile',
    },
  };

  redirectToProfile = ():void => {
    const { history } = this.props;
    if (history) history.push('/profile');
  }

  changePassword = (data: Record<string, string>) => {
    UserApi.changePassword(data as unknown as UserPassUpdateData).then(() => {
      this.redirectToProfile();
    }).catch(({ message }) => {
      this.setState({ error: message });
    });
  }

  render():JSX.Element {
    return <div className="changePasswordPage">
      <Form {...this.formSettings} submit={this.changePassword} error={this.state.error}/>
      </div>;
  }
}
export default withRouter(ChangePassword);
