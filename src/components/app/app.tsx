import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import Navigation from '../navigation';
import { GameDescription } from '../gameDescription/gameDescription';
import Authorization from '../../pages/authorization/authorization';
import Registration from '../../pages/registration';
import Game from '../../pages/game';
import Leaderboard from '../../pages/leaderboard';
import Forum from '../../pages/forum';
import Profile from '../../pages/profile/profile';
import ChangePassword from '../../pages/changePassword/changePassword';
import ChangeData from '../../pages/changeData/changeData';
import { Page404 } from '../../pages/page404/page404';
import { Page500 } from '../../pages/page500/page500';
import { ControlsDemo } from '../../pages/controlsDemo/controlsDemo';
import OAuth from '../../api/oauth/oauth';
import PrivateRoute from '../privateRoute/privateRoute';
import AuthenticatedRoute from '../authenticatedRoute/authenticatedRoute';
import newTopic from '../../pages/newTopic/newTopic';
import Topic from '../../pages/Topic';

import { getCurrentTheme } from '../../utils/currentTheme';

export interface AppProps {
  themeCSS: string;
  fetchCSS: (themeName: string) => void;
}

export default class App extends PureComponent<AppProps> {
  componentDidMount() {
    this.props.fetchCSS(getCurrentTheme());
  }

  render() {
    // Убрал мок window, тк не получилось заставить его нормально работать
    if (typeof window !== 'undefined') {
      const { search } = window.location;
      const params = new URLSearchParams(search);
      const code = params.get('code');
      if (code) {
        OAuth.logIn({ code });
      }
    }

    return (
      <>
        <style>{ this.props.themeCSS }</style>

        <div className="app">
          <div className="wrap">
            <Navigation />
            <div className="wrap">
                <Route exact path="/" component={GameDescription}/>
                <AuthenticatedRoute path="/authorization" component={Authorization} redirectTo="/"/>
                <AuthenticatedRoute path="/registration" component={Registration} redirectTo="/"/>
                <Route path="/game" component={Game}/>
                <Route path="/leaderboard" component={Leaderboard}/>
                <PrivateRoute path="/forum" component={Forum} redirectTo="/authorization"/>
                <PrivateRoute path="/topic/:topicId" component={Topic} redirectTo="/authorization"/>
                <PrivateRoute path="/create-topic" component={newTopic} redirectTo="/authorization"/>
                <PrivateRoute path="/profile" component={Profile} redirectTo="/authorization"/>
                <PrivateRoute path="/change-password" component={ChangePassword } redirectTo="/authorization"/>
                <PrivateRoute path="/change-data" component={ChangeData} redirectTo="/authorization"/>
                <Route path="/page404" component={Page404}/>
                <Route path="/page500" component={Page500}/>
                <Route path="/controls-demo" component={ControlsDemo}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}
