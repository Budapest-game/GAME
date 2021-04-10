import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import TopicAPi from '../../api/forum/topic';
import './createTopic.css';

export function CreateTopic(props:RouteComponentProps):JSX.Element {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  function redirectToForum():void {
    const { history } = props;
    history.push('/forum');
  }
  function createClick() {
    if (name && content) {
      TopicAPi.create({ name, content }).then((status) => {
        if (status) {
          redirectToForum();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  function inputName(e:React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function inputContent(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }
  return <div>
    <Input type="text" placeholder="Тема" maxlength="250" onInput={inputName}/>
    <textarea onInput={inputContent}>Hello</textarea>
    <Button text="Cоздать" type="button" onClick={createClick}/>
  </div>;
}
