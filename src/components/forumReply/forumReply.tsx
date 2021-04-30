import React from 'react';
import { convertFromRaw } from 'draft-js';
import TextViewer from '../textViewer/textViewer';
import { ReplyInfo } from '../../api/types';
import ForumReaction from '../forumReaction/forumReaction';

export default function ForumReply(props: ReplyInfo):JSX.Element {
  const text = convertFromRaw(JSON.parse(props.content));
  return <div>
    <TextViewer content={text}/>
    <ForumReaction/>
  </div>;
}
