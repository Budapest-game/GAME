import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from './form';

const emptyFn = () => {
  // empty
};
const testFormNonValidData = {
  className: 'authorizationForm',
  formHeader: 'Вход',
  inputsInfo: [{
    name: 'login', value: '', placeholder: 'Логин', type: 'text', validate: ['required'],
  },
  {
    name: 'password', value: '', placeholder: 'Пароль', type: 'password', validate: ['required'],
  },
  ],
  redirLinkInfo: {
    text: 'Нет аккаунта?',
    href: '/registration',
  },
  buttonsInfo: [
    {
      type: 'submit' as ('submit'),
      text: 'Авторизация',
    },
  ],
};
const testFormValidData = {
  className: 'authorizationForm',
  formHeader: 'Вход',
  inputsInfo: [{
    name: 'login', value: '123', placeholder: 'Логин', type: 'text', validate: ['required'],
  },
  {
    name: 'password', value: '123', placeholder: 'Пароль', type: 'password', validate: ['required'],
  },
  ],
  redirLinkInfo: {
    text: 'Нет аккаунта?',
    href: '/registration',
  },
  buttonsInfo: [
    {
      type: 'submit' as ('submit'),
      text: 'Авторизация',
    },
  ],
};
describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const error = null;
    const {
      container,
      getByPlaceholderText,
      getByText,
    } = render(<Form {...testFormNonValidData} submit={emptyFn}
                                   error={error} />);
    expect(container.firstChild).toHaveClass('form');
    expect(getByPlaceholderText('Логин')).toBeInTheDocument();
    expect(getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(getByText('Авторизация')).toBeInTheDocument();
  });

  it('Отображение сообщения об ошибке', () => {
    const error = 'new Error message';
    const { getByText } = render(<Form {...testFormNonValidData} submit={emptyFn}
                                   error={error} />);
    expect(getByText(error)).toBeInTheDocument();
  });

  it('Невалидная форма при submit не возвращает onChange', () => {
    const error = null;
    let submitRes = null;
    const submitHandler = (data: Record<string, string>) => {
      submitRes = data;
    };
    const { getByText } = render(<Form {...testFormNonValidData} submit={submitHandler}
                                   error={error} />);
    fireEvent.click(getByText('Авторизация'));
    expect(submitRes).toBe(null);
  });

  it('Валидная форма при submit возвращает в onChange данные из инпутов', () => {
    const error = null;
    let submitRes = null;
    const submitHandler = (data: Record<string, string>) => {
      submitRes = data;
    };
    const { getByText } = render(<Form {...testFormValidData} submit={submitHandler}
                                   error={error} />);

    fireEvent.click(getByText('Авторизация'));
    expect(submitRes).toEqual({ login: '123', password: '123' });
  });
});
