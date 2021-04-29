import React, { useCallback } from 'react';
import { useAuthorisation } from '../../hooks/useAuthorization';
import { getCurrentTheme, setCurrentTheme } from '../../utils/currentTheme';
import { useCurrentTheme } from '../../hooks/useCurrentTheme';
import { Button } from '../button/button';

interface ThemeTogglerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fetchNewTheme?: () => void;
}

export function ThemeToggler(props: ThemeTogglerProps): JSX.Element {
  const theme = useCurrentTheme();
  const { isAuth } = useAuthorisation();
  let currentTheme = getCurrentTheme();
  if (isAuth) currentTheme = theme;

  const memoizedOnClick = useCallback(
    () => {
      if (currentTheme === 'light') {
        setCurrentTheme('dark');
      } else {
        setCurrentTheme('light');
      }
      if (props.fetchNewTheme) {
        props.fetchNewTheme();
      }
    },
    [currentTheme],
  );

  return (
    <Button
      onClick={ memoizedOnClick }
      text={currentTheme === 'light' ? 'Темная тема 🌚' : 'Светлая тема ☀️'}
    />
  );
}
