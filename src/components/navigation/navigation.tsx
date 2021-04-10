import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import textContent from './textContent';
import { ApplicationState } from '../../index';
import { ThemeToggler } from '../themeToggler/themeToggler';
import { getCurrentTheme, toggleTheme } from '../../utils/currentTheme';
import './navigation.css';

const Cls = cn('navigation');
const LINKS = [
  { to: '/authorization', text: textContent.auth, authenticated: true },
  { to: '/game', text: textContent.game },
  { to: '/leaderboard', text: textContent.leaderboard, private: true },
  { to: '/forum', text: textContent.forum, private: true },
  { to: '/profile', text: textContent.profile, private: true },
];
export default function Navigation():JSX.Element {
  const isAuthenticated = useSelector((state:ApplicationState) => {
    return state.authorisation.isAuthenticated;
  });
  const navigationLinks = LINKS.filter((x) => {
    if (isAuthenticated) {
      return !x.authenticated;
    }
    return !x.private;
  }).map((link) => { return <li key={link.to}><Link to={link.to}>{link.text}</Link></li>; });

  return (
      <nav className={Cls()}>
        <ul>
          {navigationLinks}
        </ul>
        <ThemeToggler
            currentTheme={ getCurrentTheme() }
            onToggle={() => {
              toggleTheme();
              window.location.reload();
            }}
          />
      </nav>
  );
}
