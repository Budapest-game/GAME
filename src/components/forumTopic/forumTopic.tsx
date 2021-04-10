import React from 'react';
import { cn } from '@bem-react/classname';
import { TopicInfo } from '../../api/types';
import numbersEnds from '../../utils/numbersEnds';
import './forumTopic.css';

const Cls = cn('topic');
const endCases = ['Ответ', 'Ответа', 'Ответов'];

export function ForumTopic(info:TopicInfo): JSX.Element {
  return <div className={Cls()}>
    <div className={Cls('name')}>{info.name}</div>
    <div className={Cls('postsCount')}/>
  </div>;
}
