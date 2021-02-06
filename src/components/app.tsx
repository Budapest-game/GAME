/* eslint object-curly-newline: 'off' */

import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './app.css';
import { Autorization } from './autorization';
import { Registration } from './registration';
import { Game } from './game';
import { Leaderboard } from './leaderboard';
import { Forum } from './forum';
import { Profile } from './profile';
import { Page404 } from './page404';
import { Page500 } from './page500';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/autorization">Авторизация</Link>
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
              </ul>
            </nav>

            <div>
              <Switch>
              <Route path="/autorization">
                  <Autorization />
                </Route>
                <Route path="/registration">
                  <Registration />
                </Route>
                <Route path="/game">
                  <Game />
                </Route>
                <Route path="/leaderboard">
                  <Leaderboard />
                </Route>
                <Route path="/forum">
                  <Forum />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/page404">
                  <Page404 />
                </Route>
                <Route path="/page500">
                  <Page500 />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
