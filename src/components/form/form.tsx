import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { inputValidation } from '../../utils/validation';
import { Input, InputProps } from '../input/input';
import { Button } from '../button/button';
import './form.css';

interface Props {
  formHeader: string
  inputsInfo: FormInput[]
  submitText: string
  redirLinkInfo: {
    text: string,
    href: string
  }
  className: string,
  submit: (data: Record<string, string>) => void,
  error: null | string,
}
interface FormInput extends InputProps {
  validate: string[];
  name: string;
}
interface InputState {
  value: string,
  isValid: boolean,
  errorMessage:string
}

const Cls = cn('form');
export class Form extends PureComponent<Props> {
  state: Record<string, InputState> = {};

  static getDerivedStateFromProps(props:Props,
    state:Record<string, InputState>):Record<string, InputState> | boolean {
    if (!Object.keys(state).length) {
      const initValues:Record<string, InputState> = {};
      props.inputsInfo.forEach((i) => {
        const value = (i.value !== undefined && i.value !== null) ? i.value : '';
        const initialValidation = inputValidation(value, i.validate);
        initValues[i.name] = { value, isValid: initialValidation.state, errorMessage: '' };
      });
      return initValues;
    }
    return false;
  }

  onSubmit = (e: React.FormEvent): boolean => {
    e.preventDefault();
    const inputs = this.props.inputsInfo.map((x) => { return x.name; });
    if (this.isFormValid(inputs)) {
      const formData: Record<string, string> = {};
      inputs.forEach((name) => { formData[name] = this.state[name].value; });
      this.props.submit(formData);
      return true;
    }
    return false;
  }

  isFormValid(inputs: string[]): boolean {
    for (let i = 0; i < inputs.length; i++) {
      const name = inputs[i];
      if (!this.state[name].isValid) return false;
    }
    return true;
  }

  onChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    this.setState({
      [name]: { ...this.state[name], value },
    });
  }

  onBlur = ({ target }: React.FocusEvent<HTMLInputElement>):void => {
    const { value, name } = target;
    const filed = this.props.inputsInfo.find((x) => { return x.name === name; });
    if (filed && filed.validate) {
      const { state: isValid, msg: errorMessage } = inputValidation(value, filed.validate);
      this.setState({
        [name]: { value, isValid, errorMessage },
      });
    }
  }

  renderInputs(): JSX.Element[] {
    return this.props.inputsInfo.map((input, i) => {
      return <Input {...input}
                    onChange={this.onChange}
                    value={this.state[input.name].value}
                    onBlur={this.onBlur}
                    error={this.state[`${input.name}`].errorMessage}
                    key={i}/>;
    });
  }

  render():JSX.Element {
    const formClasses = Cls(null, [this.props.className]);
    return (
      <div className={formClasses}>
        <h1>{this.props.formHeader}</h1>
        <form onSubmit={this.onSubmit}>
          {this.renderInputs()}
          {this.props.error && <div className={Cls('error')}><span>{this.props.error}</span></div>}
          <div>
            <Button type="submit" text={this.props.submitText}/>
          </div>
          <p>
            <a href={this.props.redirLinkInfo.href}>{this.props.redirLinkInfo.text}</a>
          </p>
        </form>
      </div>
    );
  }
}
