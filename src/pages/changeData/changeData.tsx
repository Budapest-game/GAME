import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';

interface ChangeDataState extends RouteComponentProps {
  error?: null | string,
}

class ChangeData extends PureComponent<ChangeDataState> {
  state = {
    error: null,
  }

  formSettings = {
    className: 'changeDataForm',
    formHeader: 'Изменить данные',
    inputsInfo: [{
      name: 'first_name', value: '', placeholder: 'Имя', type: 'text', validate: ['required'],
    },
    {
      name: 'second_name', value: '', placeholder: 'Фамилия', type: 'text', validate: ['required'],
    },
    {
      name: 'login', value: '', placeholder: 'Логин', type: 'text', validate: ['required'],
    },
    {
      name: 'email', value: '', placeholder: 'Почта', type: 'text', validate: ['required', 'email'],
    },
    {
      name: 'phone', value: '', placeholder: 'Телефон', type: 'text', validate: ['required', 'phone'],
    },
    ],
    submitText: 'Сохранить',
    redirLinkInfo: {
      text: 'Страница пользователя',
      href: '/profile',
    },
  };

  render():JSX.Element {
    return <div className="changeDataPage">
        <Form {...this.formSettings} submit={() => { return true; }} error={this.state.error}/>
      </div>;
  }
}
export default withRouter(ChangeData);
