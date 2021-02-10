import React, { PureComponent } from 'react';
import { Input } from '../../components/input/input';

interface ControlsDemoPageState
  extends React.InputHTMLAttributes<HTMLInputElement> {
    controlledInputValue?: string,
    controlledValidationInputValue?: string,
    error?: string,
}

export class ControlsDemoPage extends PureComponent<unknown, ControlsDemoPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      controlledInputValue: 'change me',
      controlledValidationInputValue: '111',
      error: undefined,
    };
  }

  render() {
    return (
      <div>
        <Input type="text" placeholder="name" />
        <Input type="password" placeholder="password" />
        <Input type="text" placeholder="name" error="error message" />
        <Input type="text" placeholder="name" className="" value="you can't change me" />
        <Input
          type="text"
          placeholder="controlled input"
          value={this.state.controlledInputValue}
          onChange={(event) => {
            this.setState({ controlledInputValue: event.target.value });
          }}
        />
        <Input
          type="text"
          placeholder="focused input"
          onFocus={() => {
            console.log('focused input');
          }}
        />

        <Input
          type="text"
          value={this.state.controlledValidationInputValue}
          onChange={(event) => {
            const newValue = event.target.value;
            let err = '';
            if (newValue !== '111') {
              err = 'значение должно быть равно 111';
            }
            this.setState({ controlledValidationInputValue: newValue, error: err });
          }}
          error={this.state.error}
        />
      </div>
    );
  }
}
