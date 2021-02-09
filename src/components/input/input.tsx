import React, { PureComponent } from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  type: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  error?: string;
}

export class Input extends PureComponent<InputProps> {
  render() {
    return (
      <label>
        <input
          value={this.props.value}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}
