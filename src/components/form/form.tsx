import React, { PureComponent } from 'react';
import { inputValidation } from '../../utils/validation';
import './form.css';

interface Props {
  formHeader:string
  inputsInfo: InputProps[]
  submitText: string
  redirLinkInfo:{
    text: string,
    href: string
  }
  baseClass: string,
  submit: (data: Record<string, string>) => void,
  error: null | string,
}
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  type: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  error?: string;
  disabled?: boolean;
  validate: string[];
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
      initValues[i.name] = i.value;
    });
    return initValues;
  }

  submit = (e: React.FormEvent): false | undefined => {
    e.preventDefault();
    const inputs = this.props.inputsInfo.map((x) => { return x.name; });
    const formData: Record<string, string> = {};
    for (let i = 0; i < inputs.length; i++) {
      const name = inputs[i];
      if (!this.state[`${name}Validation`]) return false;
      formData[name] = this.state[name];
    }
    this.props.submit(formData);
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
      this.setState({
        [`${name}Validation`]: inputValidation(value, prop.validate),
      });
    }
  }

  render():JSX.Element {
    const inputs = this.props.inputsInfo.map((input, i) => {
      return <input {...input} onChange={this.change}
                    value={this.state[input.name]} onBlur={this.blur} key={i}></input>;
    });
    return (
      <div className={['form', this.props.baseClass].join(' ')}>
        <h1>{this.props.formHeader}</h1>
        <form onSubmit={this.submit}>
          {inputs}
          <div>
           {this.props.error ? <span>{this.props.error}</span> : ''}
          </div>
          <div>
            <button type="submit">{this.props.submitText}</button>
          </div>
          <p>
            <a href={this.props.redirLinkInfo.href}>{this.props.redirLinkInfo.text}</a>
        </p>
        </form>
      </div>
    );
  }
}
