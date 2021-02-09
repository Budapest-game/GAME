import React, { PureComponent } from 'react';
import './form.css';
export class Registration extends PureComponent {
  signup(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.signup}>
        <h1>Регистрация</h1>
        <label>
          <span>Почта</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <label>
          <span>Логин</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <label>
          <span>Имя</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <label>
          <span>Фамилия</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <label>
          <span>Телефон</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <label>
          <span>Пароль</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <label>
          <span>Подтвердите пароль</span>
          <input type="text" placeholder="Почта"/>
        </label>
        <div>
          <button type="submit">Зарегистрироваться</button>
        </div>
        <p>
          <a href="/login">Войти</a>
       </p>
      </form>
    );
  }
}
