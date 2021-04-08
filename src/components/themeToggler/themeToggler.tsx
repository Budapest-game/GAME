import React, { PureComponent } from 'react';
import { Button } from '../button/button';

interface ThemeTogglerState {
  lightTheme: boolean;
}

interface ThemeTogglerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  currentTheme: string;
  onToggle: () => void;
}

export class ThemeToggler extends PureComponent<ThemeTogglerProps, ThemeTogglerState> {
  constructor(props: ThemeTogglerProps) {
    super(props);

    this.state = {
      lightTheme: this.props.currentTheme === 'light',
    };
  }

  changeTheme = (): void => {
    this.setState({ lightTheme: !this.state.lightTheme });
    this.props.onToggle();
  }

  render() {
    let themeTogglerText = 'Светлая тема ☀️';

    if (this.state.lightTheme) {
      themeTogglerText = 'Темная тема 🌚';
    }

    return (
      <Button
        onClick={this.changeTheme}
        text={themeTogglerText}
      />
    );
  }
}
