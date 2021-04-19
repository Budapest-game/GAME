import React, { useState, useCallback } from 'react';
import { Button } from '../button/button';

interface ThemeTogglerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  currentTheme: string;
  onToggle: () => void;
}

export function ThemeToggler(props: ThemeTogglerProps): JSX.Element {
  const [lightTheme, setLightTheme] = useState(props.currentTheme === 'light');

  const memoizedOnClick = useCallback(
    () => {
      setLightTheme(!lightTheme);
      props.onToggle();
    },
    [props.onToggle, lightTheme],
  );

  return (
    <Button
      onClick={ memoizedOnClick }
      text={lightTheme ? 'Темная тема 🌚' : 'Светлая тема ☀️'}
    />
  );
}
