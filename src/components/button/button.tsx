import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import './button.css';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean | undefined,
  onClick?: (event?: React.MouseEvent) => void;
  text?: string;
}

const Cls = cn('btn');
export class Button extends PureComponent<ButtonProps> {
  render() {
    const classNames = Cls(null, [this.props.className]);
    const { text, ...props } = this.props;

    return (
      <button
        className={ classNames }
        { ...props }
      >
        {text}
      </ button>
    );
  }
}
