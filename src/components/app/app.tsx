import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import { Navigation } from '../navigation/navigation';
import Authorization from '../../pages/authorization/authorization';
import Registration from '../../pages/registration';
import { Game } from '../../pages/game/game';
import { Leaderboard } from '../../pages/leaderboard/leaderboard';
import Forum from '../../pages/forum';
import Profile from '../../pages/profile/profile';
import ChangePassword from '../../pages/changePassword/changePassword';
import ChangeData from '../../pages/changeData/changeData';
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
              <Route path="/authorization" component={Authorization}/>
              <Route path="/registration" component={Registration}/>
              <Route path="/game" component={Game}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/forum" component={Forum}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/changePassword" component={ChangePassword}/>
              <Route path="/changeData" component={ChangeData}/>
              <Route path="/page404" component={Page404}/>
              <Route path="/page500" component={Page500}/>
              <Route path="/controlsDemoPage" component={ControlsDemoPage}/>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
    );
  }
}
