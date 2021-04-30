import React from 'react';
import { cn } from '@bem-react/classname';
import { convertFromRaw } from 'draft-js';
import TextViewer from '../textViewer/textViewer';
import { ReplyInfo } from '../../api/types';
import './forumReply.css';

const Cls = cn('reply');
export default function ForumReply(props: ReplyInfo):JSX.Element {
  const text = convertFromRaw(JSON.parse(props.content));
  return <div className={Cls()} >
    <TextViewer content={text}/>
  </div>;
}
