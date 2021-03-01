import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class Navigation extends PureComponent {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/authorization">Авторизация</Link>
          </li>
          <li>
            <Link to="/registration">Регистрация</Link>
          </li>
          <li>
            <Link to="/game">Игра</Link>
          </li>
          <li>
            <Link to="/leaderboard">Таблица лидеров</Link>
          </li>
          <li>
            <Link to="/forum">Форум</Link>
          </li>
          <li>
            <Link to="/profile">Профиль</Link>
          </li>
          <li>
            <Link to="/page404">Страница 404</Link>
          </li>
          <li>
            <Link to="/page500">Страница 500</Link>
          </li>
          <li>
            <Link to="/controls-demo">Демо страница с контролами</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
