import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import './input.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  type: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  error?: string;
  disabled?: boolean;
}

const Cls = cn('input');
export class Input extends PureComponent<InputProps> {
  render() {
    const classNames = Cls(null, [this.props.className]);
    const { error, ...props } = this.props;

    return (
      <div className={ classNames }>
        <label>
          <input { ...props }/>
        </label>
        { error ? <div className={Cls('errorText')}>{error}</div> : null }
      </div>
    );
  }
}
