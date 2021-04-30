import React from 'react';
import { convertFromRaw } from 'draft-js';
import { CommentInfo } from '../../api/types';
import TextViewer from '../textViewer/textViewer';
import { Button } from '../button/button';
import ForumReply from '../forumReply/forumReply';
import ForumReaction from '../forumReaction/forumReaction';

interface CommentProps extends CommentInfo{
  onReplyClick: (commentId: number)=>void;
}
export default function ForumComment(props: CommentProps):JSX.Element {
  const text = convertFromRaw(JSON.parse(props.content));
  return <div>
    <TextViewer content={text}/>
    <div>
      <Button text="Ответить" onClick={() => { props.onReplyClick(props.topicId); }}/>
    </div>
    {
      props.replies.map((reply) => {
        return <ForumReply {...reply} key={reply.commentId}/>;
      })
    }
    <ForumReaction/>
  </div>;
}
