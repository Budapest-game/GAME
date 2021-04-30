import React from 'react';

interface StyleButtonProps{
  label: string;
  active:boolean;
  onToggle: (blockType:string)=>void;
  style: string;
}
export default function StyleButton(props:StyleButtonProps):JSX.Element {
  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }
  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  return <span className={className} onMouseDown={onToggle}>
    {props.label}
    </span>;
}
