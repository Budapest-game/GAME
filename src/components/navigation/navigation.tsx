import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { Authorization } from '../../pages/authorization/authorization';
import { Registration } from '../../pages/registration/registration';
import { Game } from '../../pages/game/game';
import { Leaderboard } from '../../pages/leaderboard/leaderboard';
import { Forum } from '../../pages/forum/forum';
import { Profile } from '../../pages/profile/profile';
import { Page404 } from '../../pages/page404/page404';
import { Page500 } from '../../pages/page500/page500';

export class Navigation extends PureComponent {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
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
              </ul>
            </nav>

            <div>
              <Switch>
              <Route path="/authorization">
                  <Authorization />
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
