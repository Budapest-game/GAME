import React from 'react';
import { useHistory } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { TopicInfo } from '../../api/types';
import numbersEnds from '../../utils/numbersEnds';
import './forumTopic.css';

const Cls = cn('topic');
const endCases = ['Ответ', 'Ответа', 'Ответов'];

export function ForumTopic(info: TopicInfo): JSX.Element {
  const history = useHistory();

  function redirectToTopic():void {
    history.push(`/topic/${info.topicId}`);
  }

  return <div className={Cls()} onClick={redirectToTopic}>
    <div className={Cls('name')}>{info.name}</div>
    <div className={Cls('postsCount')}>{info.comments.length} {numbersEnds(info.comments.length, endCases)}</div>
  </div>;
}
