import React from 'react';
import { convertFromRaw } from 'draft-js';
import { cn } from '@bem-react/classname';
import { CommentInfo } from '../../api/types';
import TextViewer from '../textViewer/textViewer';
import { Button } from '../button/button';
import ForumReply from '../forumReply/forumReply';
import ForumReaction from '../forumReaction/forumReaction';
import './forumComment.css';

interface CommentProps extends CommentInfo{
  onReplyClick: (commentId: number)=>void;
}

const Cls = cn('comment');
export default function ForumComment(props: CommentProps):JSX.Element {
  const text = convertFromRaw(JSON.parse(props.content));
  return <div className={Cls()}>
    <TextViewer content={text}/>
    <ForumReaction/>
    <div className={Cls('reply')}>
      <Button className={Cls('reply-button')} text="Ответить" onClick={() => { props.onReplyClick(props.commentId); }}/>
    </div>
    {
      props.replies.map((reply) => {
        return <ForumReply {...reply} key={reply.commentId}/>;
      })
    }
  </div>;
}
