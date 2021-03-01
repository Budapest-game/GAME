import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
<<<<<<< HEAD
import textContent from './textContent';
=======
import UserApi from '../../api/user/user';
import { UserInfoUpdateData } from '../../api/types';
>>>>>>> S6T41: Добавить API для изменения профиля пользователя (#17)

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

<<<<<<< HEAD
  formSettings = {
    className: 'changeDataForm',
    formHeader: textContent.header,
    inputsInfo: [{
      name: 'first_name', value: '', placeholder: textContent.first_name, type: 'text', validate: ['required'],
    },
    {
      name: 'second_name', value: '', placeholder: textContent.second_name, type: 'text', validate: ['required'],
    },
    {
      name: 'login', value: '', placeholder: textContent.login, type: 'text', validate: ['required'],
    },
    {
      name: 'email', value: '', placeholder: textContent.email, type: 'text', validate: ['required', 'email'],
    },
    {
      name: 'phone', value: '', placeholder: textContent.phone, type: 'text', validate: ['required', 'phone'],
    },
    ],
    submitText: textContent.submit,
    redirLinkInfo: {
      text: textContent.link,
      href: '/profile',
    },
=======
  componentDidMount():void {
    UserApi.get().then((res) => {
      this.setState({ user: res, loading: false });
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
>>>>>>> S6T41: Добавить API для изменения профиля пользователя (#17)
  };

  redirectToProfile = ():void => {
    const { history } = this.props;
    history.push('/profile');
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
