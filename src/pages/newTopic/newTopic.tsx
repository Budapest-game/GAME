import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import TopicAPi from '../../api/forum/topic';
import './newTopic.css';

export default function CreateTopic(props:RouteComponentProps):JSX.Element {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const Cls = cn('newTopic');

  function redirectToForum():void {
    const { history } = props;
    history.push('/forum');
  }
  function createClick() {
    if (name && content) {
      TopicAPi.create({ name, content }).then((status) => {
        if (status) redirectToForum();
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
  return <div className={Cls()}>
    <div className={Cls('topicBody')}>
      <Input type="text" placeholder="Тема" maxlength="250" onInput={inputName}/>
      <textarea className={Cls('topicBody-area')} onInput={inputContent}/>
      <Button className={Cls('topicBody-createButton')} text="Cоздать тему" type="button" onClick={createClick}/>
    </div>
  </div>;
}
