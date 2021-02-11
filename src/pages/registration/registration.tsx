import React, { PureComponent } from 'react';
import { Form } from '../../components/form/form';

export class Registration extends PureComponent {
  render():JSX.Element {
    const formSettings = {
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
    return <Form {...formSettings}></Form>;
  }
}
