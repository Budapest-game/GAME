import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { convertToRaw, EditorState } from 'draft-js';
import CommentAPI from '../../api/forum/comment';
import TextEditor from '../../components/textEditor/textEditor';
import { TopicInfo } from '../../api/types';
import { Button } from '../../components/button/button';
import './topic.css';

export interface TopicProps {
  isLoading: boolean;
  info: TopicInfo | null;
  fetchData: (id:number) => void;
}

const Cls = cn('topicPage');

export default function Topic(props: TopicProps):JSX.Element {
  const [topicInfo] = useState(0);
  const { topicId } = useParams<{ topicId: string }>();
  const [replyText, setReplyText] = useState(() => { return EditorState.createEmpty(); });

  useEffect(() => {
    props.fetchData(parseInt(topicId, 10));
  }, [topicInfo]);

  const updateState = (newState: EditorState) => {
    setReplyText(newState);
  };
  const onSendReplyClick = () => {
    const content = replyText.getCurrentContent();
    if (content.hasText()) {
      const convetedText = JSON.stringify(convertToRaw(content));
      CommentAPI.create({topicId, replyTo: null, content: convetedText });
    }
  };
  if (props.isLoading) {
    return <>Loading...</>;
  }
  if (props.info) {
    return <div className={Cls()}>
    <div className={Cls('info')}>
      <div className={Cls('info-name')}>{props.info?.name}</div>
      <div className={Cls('info-content')}>{props.info?.content}</div>
    </div>
    <div className={Cls('comments')}>КОММЕНТЫ ТУТ</div>
    <div className={Cls('replyArea')}>
      <TextEditor updateState={updateState}/>
      <div className={Cls('replyArea-buttons')}>
        <Button text="Отправить комментарий" onClick={onSendReplyClick} />
      </div>
    </div>
  </div>;
  }
  return <>Такого топика не существует :(</>;
}
