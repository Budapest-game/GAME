import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../../components/form/form';
import textContent from './textContent';

interface ChangeDataState extends RouteComponentProps {
  error?: null | string,
}

class ChangeData extends PureComponent<ChangeDataState> {
  state = {
    error: null,
  }

  formSettings = {
    className: 'changeDataForm',
    formHeader: textContent.header,
    inputsInfo: [{
      name: 'first_name', value: '', placeholder: textContent.first_name, type: 'text', validate: ['required'],
    },
    {
      name: 'second_name', value: '', placeholder: textContent.second_name, type: 'text', validate: ['required'],
    },
    {
      name: 'login', value: '', placeholder: textContent.login, type: 'text', validate: ['required'],
    },
    {
      name: 'email', value: '', placeholder: textContent.email, type: 'text', validate: ['required', 'email'],
    },
    {
      name: 'phone', value: '', placeholder: textContent.phone, type: 'text', validate: ['required', 'phone'],
    },
    ],
    submitText: textContent.submit,
    redirLinkInfo: {
      text: textContent.link,
      href: '/profile',
    },
  };

  render():JSX.Element {
    return <div className="changeDataPage">
        <Form {...this.formSettings} submit={() => { return true; }} error={this.state.error}/>
      </div>;
  }
}
export default withRouter(ChangeData);
