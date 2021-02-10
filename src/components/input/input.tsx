import React, { PureComponent } from 'react';
import './input.css';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  type: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  error?: string;
  disabled?: boolean;
}

export class Input extends PureComponent<InputProps> {
  render() {
    let classNames = 'form-input';
    if (this.props.className) {
      classNames = `${classNames} ${this.props.className}`;
    }

    return (
      <div className={ classNames }>
        <label>
          <input
            value={this.props.value}
            type={this.props.type}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            disabled={this.props.disabled}
          />
        </label>
        { this.props.error ? <div className="form-input--error-text">{this.props.error}</div> : '' }
      </div>
    );
  }
}
