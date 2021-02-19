import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import { Navigation } from '../navigation/navigation';
import { Authorization } from '../../pages/authorization/authorization';
import Registration from '../../pages/registration/registration';
import { Game } from '../../pages/game/game';
import { Leaderboard } from '../../pages/leaderboard/leaderboard';
import { Forum } from '../../pages/forum/forum';
import { Profile } from '../../pages/profile/profile';
import { Page404 } from '../../pages/page404/page404';
import { Page500 } from '../../pages/page500/page500';
import { ControlsDemoPage } from '../../pages/controlsDemoPage/controlsDemoPage';

export default class App extends PureComponent {
  render() {
    return (
    <div className="app">
      <Router>
        <div>
          <Navigation />
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
              <Route path="/controlsDemoPage">
                <ControlsDemoPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
    );
  }
}
