import React, { PureComponent } from 'react';
import { inputValidation } from '../../utils/validation';
import { Input, InputProps } from '../input/input';
import { Button } from '../button/button';
import './form.css';

interface Props {
  formHeader:string
  inputsInfo: formInputProps[]
  submitText: string
  redirLinkInfo:{
    text: string,
    href: string
  }
  baseClass: string,
  submit: (data: Record<string, string>) => void,
  error: null | string,
}
interface formInputProps extends InputProps{
  validate: string[];
  name: string;
}
export class Form extends PureComponent<Props> {
  state: Record<string, string> = {};

  constructor(props: Props) {
    super(props);
    this.state = this.initState();
  }

  initState = ():Record<string, string> => {
    const initValues:Record<string, string> = {};
    this.props.inputsInfo.forEach((i) => {
      const val = i.value !== undefined ? i.value : '';
      initValues[i.name] = val;
    });
    return initValues;
  }

  submit = (e: React.FormEvent): boolean => {
    e.preventDefault();
    const inputs = this.props.inputsInfo.map((x) => { return x.name; });
    const formData: Record<string, string> = {};
    for (let i = 0; i < inputs.length; i++) {
      const name = inputs[i];
      if (!this.state[`${name}isInputValid`]) return false;
      formData[name] = this.state[name];
    }
    this.props.submit(formData);
    return true;
  }

  change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  blur = (e: React.FocusEvent<HTMLInputElement>):void => {
    const { target } = e;
    const { value, name } = target;
    const prop = this.props.inputsInfo.find((x) => { return x.name === name; });
    if (prop && prop.validate) {
      const validationState = inputValidation(value, prop.validate);
      this.setState({
        [`${name}isInputValid`]: validationState.state,
        [`${name}ValidationMsg`]: validationState.msg,
      });
    }
  }

  render():JSX.Element {
    const inputs = this.props.inputsInfo.map((input, i) => {
      return <Input {...input} onChange={this.change}
                    value={this.state[input.name]} onBlur={this.blur} error={this.state[`${input.name}ValidationMsg`]} key={i}></Input>;
    });
    return (
      <div className={['form', this.props.baseClass].join(' ')}>
        <h1>{this.props.formHeader}</h1>
        <form onSubmit={this.submit}>
          {inputs}
           {this.props.error ? <div className="form-error"><span>{this.props.error}</span></div> : ''}
          <div>
            <Button type="submit" text={this.props.submitText}></Button>
          </div>
          <p>
            <a href={this.props.redirLinkInfo.href}>{this.props.redirLinkInfo.text}</a>
        </p>
        </form>
      </div>
    );
  }
}
