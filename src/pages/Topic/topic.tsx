import React from 'react';
import { cn } from '@bem-react/classname';
import TopicAPI from '../../api/forum/topic';
import './topic.css';

const Cls = cn('topic');

export function Topic():JSX.Element {
  return <div>
    <div className={Cls('info')}>
      <div className={Cls('name')}>Имя</div>
      <div className={Cls('content')}>Контент</div>
    </div>
    <div className={Cls('comments')}>Комменты</div>
  </div>;
}
