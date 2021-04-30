import {
  Editor, ContentState, EditorState,
} from 'draft-js';
import React from 'react';

interface TextViewerProps{
  content: ContentState;
}

export default function TextViewer(props: TextViewerProps):JSX.Element {
  const content = EditorState.createWithContent(props.content);
  return <Editor readOnly={true} editorState={content} onChange={() => { return false; }}/>;
}
