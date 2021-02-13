import React, { PureComponent } from 'react';
import './button.css';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean | undefined,
  onClick?: (event?: React.MouseEvent) => void;
  text?: string;
}

export class Button extends PureComponent<ButtonProps> {
  render() {
    let classNames = 'form-btn';
    if (this.props.className) {
      classNames = `${classNames} ${this.props.className}`;
    }
    return (
      <button
        className={classNames}
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </ button>
    );
  }
}
