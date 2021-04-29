import React, { useRef, useState } from 'react';
import {
  Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import BlockStyleControls from './blockStyleControls';
import './textEditor.css';

interface TextEditorProps{
  updateState: (newState: EditorState)=>void;
}
// console.log(convertToRaw(editorState.getCurrentContent()));
// console.log(convertFromRaw(editorState.getCurrentContent()));
export default function TextEditor(props: TextEditorProps):JSX.Element {
  const [editorState, setEditorState] = useState(() => { return EditorState.createEmpty(); });
  const editor = useRef(null);

  const onChange = (newState: EditorState) => {
    setEditorState(newState);
    props.updateState(newState);
  };

  const toggleBlockType = (blockType:string) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType,
      ),
    );
  };

  const getBlockStyle = (block: Draft.ContentBlock):string => {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return '';
    }
  };

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };
  const handleKeyCommand = (command:string, oldState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(oldState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const mapKeyToEditorCommand = (e:React.KeyboardEvent<{}>):string | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };
  return <div className="RichEditor-root">
  <BlockStyleControls
    editorState={editorState}
    onToggle={toggleBlockType}
  />
  <div>
    <Editor
      blockStyleFn={getBlockStyle}
      customStyleMap={styleMap}
      editorState={editorState}
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={mapKeyToEditorCommand}
      onChange={onChange}
      placeholder="Tell a story..."
      ref={editor}
      spellCheck={true}
    />
  </div>
</div>;
}
