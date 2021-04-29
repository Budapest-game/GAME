import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import textContent from './textContent';
import { ThemeToggler } from '../themeToggler/themeToggler';
import { getCurrentTheme } from '../../utils/currentTheme';
import './navigation.css';
import { useAuthorisation } from '../../hooks/useAuthorization';

const Cls = cn('navigation');
const LINKS = [
  { to: '/authorization', text: textContent.auth, authenticated: true },
  { to: '/game', text: textContent.game },
  { to: '/leaderboard', text: textContent.leaderboard, private: true },
  { to: '/forum', text: textContent.forum, private: true },
  { to: '/profile', text: textContent.profile, private: true },
];

export interface NavigationProps {
  fetchCSS: (themeName: string) => void;
}

export default function Navigation(props: NavigationProps): JSX.Element {
  const { isAuth } = useAuthorisation();

  const navigationLinks = LINKS.filter((x) => {
    if (isAuth) {
      return !x.authenticated;
    }
    return !x.private;
  }).map((link) => { return <li key={link.to}><Link to={link.to}>{link.text}</Link></li>; });

  const memoizedOnToggle = useCallback(
    () => {
      props.fetchCSS(getCurrentTheme());
    },
    [props.fetchCSS],
  );

  return (
    <nav className={Cls()}>
      <ul>
        {navigationLinks}
      </ul>
      <ThemeToggler fetchNewTheme={memoizedOnToggle} />
    </nav>
  );
}
