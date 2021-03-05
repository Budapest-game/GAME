import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './navigation.css';

export class Navigation extends PureComponent {
  render() {
    const ClsNavigation = cn('navigation');
    return (
      <nav className={ClsNavigation()}>
        <ul>
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
            <Link to="/authorization">Авторизация</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
