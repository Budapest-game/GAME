import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import textContent from './textContent';

export class Navigation extends PureComponent {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/authorization">{textContent.auth}</Link>
          </li>
          <li>
            <Link to="/registration">{textContent.reg}</Link>
          </li>
          <li>
            <Link to="/game">{textContent.game}</Link>
          </li>
          <li>
            <Link to="/leaderboard">{textContent.leaderbord}</Link>
          </li>
          <li>
            <Link to="/forum">{textContent.forum}</Link>
          </li>
          <li>
            <Link to="/profile">{textContent.profile}</Link>
          </li>
          <li>
            <Link to="/page404">{textContent.page404}</Link>
          </li>
          <li>
            <Link to="/page500">{textContent.page500}</Link>
          </li>
          <li>
            <Link to="/controls-demo">{textContent.demo}</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
