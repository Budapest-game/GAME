import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import { Navigation } from '../navigation/navigation';
import { GameDescription } from '../gameDescription/gameDescription';
import Authorization from '../../pages/authorization/authorization';
import Registration from '../../pages/registration';
import { Game } from '../../pages/game/game';
import Leaderboard from '../../pages/leaderboard';
import Forum from '../../pages/forum';
import Profile from '../../pages/profile/profile';
import ChangePassword from '../../pages/changePassword/changePassword';
import ChangeData from '../../pages/changeData/changeData';
import { Page404 } from '../../pages/page404/page404';
import { Page500 } from '../../pages/page500/page500';
import { ControlsDemo } from '../../pages/controlsDemo/controlsDemo';

export default class App extends PureComponent {
  render() {
    return (
    <div className="app">
        <div>
          <Navigation />
          <div>
                <Route exact path="/" component={GameDescription}/>
                <Route path="/authorization" component={Authorization}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/game" component={Game}/>
                <Route path="/leaderboard" component={Leaderboard}/>
                <Route path="/forum" component={Forum}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/change-password" component={ChangePassword}/>
                <Route path="/change-data" component={ChangeData}/>
                <Route path="/page404" component={Page404}/>
                <Route path="/page500" component={Page500}/>
                <Route path="/controls-demo" component={ControlsDemo}/>
          </div>
        </div>
    </div>
    );
  }
}
