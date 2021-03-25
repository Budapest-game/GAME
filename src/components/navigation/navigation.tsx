import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import textContent from './textContent';
import { ApplicationState } from '../../index';
import './navigation.css';

const Cls = cn('navigation');
const LINKS = [
  { to: '/authorization', text: textContent.auth, auhenticated: true },
  { to: '/registration', text: textContent.reg, auhenticated: true },
  { to: '/game', text: textContent.game },
  { to: '/leaderboard', text: textContent.leaderbord },
  { to: '/forum', text: textContent.forum, private: true },
  { to: '/profile', text: textContent.profile, private: true },
  { to: '/page404', text: textContent.page404 },
  { to: '/page500', text: textContent.page500 },
  { to: '/controls-demo', text: textContent.demo },
];
export default function Navigation():JSX.Element {
  const isAuthenticated = useSelector((state:ApplicationState) => {
    return state.auth.isAuthenticated;
  });
  const navigationLinks = LINKS.filter((x) => {
    if (isAuthenticated) {
      return !x.auhenticated;
    }
    return !x.private;
  }).map((link) => { return <li key={link.to}><Link to={link.to}>{link.text}</Link></li>; });

  return (
      <nav className={Cls()}>
        <ul>
          {navigationLinks}
        </ul>
      </nav>
  );
}
