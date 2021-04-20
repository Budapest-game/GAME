import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import TopicAPi from '../../api/forum/topic';
import './newTopic.css';

export default function CreateTopic():JSX.Element {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const Cls = cn('newTopic');
  const history = useHistory();

  const redirectToForum = useCallback(() => {
    history.push('/forum');
  }, []);

  const handleCreateClick = useCallback(() => {
    if (name && content) {
      TopicAPi.create({ name, content }).then((status) => {
        if (status) redirectToForum();
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [name, content]);

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
      <Button className={Cls('topicBody-createButton')} text="Cоздать тему" type="button" onClick={handleCreateClick}/>
    </div>
  </div>;
}
