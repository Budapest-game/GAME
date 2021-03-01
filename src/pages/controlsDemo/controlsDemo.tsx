/* eslint max-classes-per-file: 'off' */

import React, { PureComponent } from 'react';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

class WrongComponent extends PureComponent {
  render() {
    if (1 > 0) {
      throw new Error('error');
    }
    return '';
  }
}

interface ControlsDemoState {
  controlledInputValue?: string,
  controlledValidationInputValue?: string,
  error?: string,
  compError?: boolean,
}

export class ControlsDemo extends PureComponent<unknown, ControlsDemoState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      controlledInputValue: 'change me',
      controlledValidationInputValue: '111',
      error: undefined,
      compError: false,
    };
  }

  render() {
    return (
      <div>
        <Input type="text" placeholder="name" />
        <Input type="password" placeholder="password" />
        <Input type="text" placeholder="name" error="error message" />
        <Input type="text" placeholder="name" className="111" value="you can't change me" disabled={true}/>
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
        <Button
          type='submit'
          onClick={() => { console.log('clicked'); }}
          text='Submit'
        />
        <Button
          type='submit'
          text='Disabled'
          onClick={() => { console.log('clicked'); }}
          disabled={true}
        />
        <Button
          type='reset'
          text='Reset'
          onClick={() => { console.log('clicked'); }}
        />
        <Button
          type='reset'
          text='Reset'
          className = 'button-error'
          onClick={() => { console.log('clicked'); }}
        />
        <Button
          type='reset'
          text='Component Error'
          className = 'button-error'
          onClick={() => { this.setState({ compError: true }); }}
        />
        { this.state.compError ? <WrongComponent/> : '' }
      </div>
    );
  }
}
