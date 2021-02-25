import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import UserApi from '../../api/user/user';
import { UserInfoUpdateData } from '../../api/types';

interface ChangeDataState extends RouteComponentProps {
  error?: null | string,
}

class ChangeData extends PureComponent<ChangeDataState> {
  state = {
    error: null,
    loading: true,
    user: {
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      email: '',
      phone: '',
    },
  }

  componentDidMount():void {
    UserApi.get().then((res) => {
      this.setState({ ...this.state, user: res, loading: false });
    });
  }

  formSettings = () => {
    return {
      className: 'changeDataForm',
      formHeader: 'Изменить данные',
      inputsInfo: [{
        name: 'first_name', value: this.state.user.first_name, placeholder: 'Имя', type: 'text', validate: ['required'],
      },
      {
        name: 'second_name', value: this.state.user.second_name, placeholder: 'Фамилия', type: 'text', validate: ['required'],
      },
      {
        name: 'display_name', value: this.state.user.display_name, placeholder: 'Ник', type: 'text', validate: ['required'],
      },
      {
        name: 'login', value: this.state.user.login, placeholder: 'Логин', type: 'text', validate: ['required'],
      },
      {
        name: 'email', value: this.state.user.email, placeholder: 'Почта', type: 'text', validate: ['required', 'email'],
      },
      {
        name: 'phone', value: this.state.user.phone, placeholder: 'Телефон', type: 'text', validate: ['required', 'phone'],
      },
      ],
      submitText: 'Сохранить',
      redirLinkInfo: {
        text: 'Страница пользователя',
        href: '/profile',
      },
    };
  };

  redirectToProfile = ():void => {
    const { history } = this.props;
    if (history) history.push('/profile');
  }

  changeData = (data: Record<string, string>) => {
    UserApi.changeInfo(data as unknown as UserInfoUpdateData).then(() => {
      this.redirectToProfile();
    }).catch(({ message }) => {
      this.setState({ error: message });
    });
  }

  render():JSX.Element {
    return <div className="changeDataPage">
      {
       this.state.loading ? <span>Загрузка</span>
         : <Form {...this.formSettings()} submit={this.changeData} error={this.state.error}/>
      }
      </div>;
  }
}
export default withRouter(ChangeData);
