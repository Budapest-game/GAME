import React, { PureComponent } from 'react';
import './form.css';

interface Props {
  formHeader:string
  inputsInfo: InputProps[]
  submitText: string
  redirLinkInfo:{
    text: string,
    href: string
  }
}
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  type: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  error?: string;
  disabled?: boolean;
}
export class Registration extends PureComponent{
  render(){
    const formSettings = {
      formHeader: 'Регистрация',
      inputsInfo: [{name: 'test1', value: 'kek', placeholder: '1s', type:'text'}, {name: 'test2', value: '', placeholder: '2s', type:'text'}],
      submitText: 'Зарегистрироваться',
      redirLinkInfo: {
        text: 'Войти',
        href: '/login'
      }
    }
    return <Form {...formSettings}></Form>
  }
}
class Form extends PureComponent<Props>{
  state = {};
  constructor(props:Props){
    super(props);
  }
  componentDidMount(){
    this.props.inputsInfo.forEach(i=>{
      this.setState({[i.name] : i.value});
    })
  };
  submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(this.state)
  }

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>{
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const inputs = this.props.inputsInfo.map(input => {
      return <input {...input}></input>
    })
    return (

      <form onSubmit={this.submit}>
        <h1>{this.props.formHeader}</h1>
        {inputs}
        <div>
          <button type="submit">{this.props.submitText}</button>
        </div>
        <p>
          <a href={this.props.redirLinkInfo.href}>{this.props.redirLinkInfo.text}</a>
       </p>
      </form>
    );
  }
}
