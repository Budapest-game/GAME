import React from 'react';
import { cn } from '@bem-react/classname';
import './avatar.css';

interface AvatarInfo {
  avatarPath: string,
}

export function Avatar(props: AvatarInfo): JSX.Element {
  const AvatarCls = cn('avatar');
  return (
    <div className={AvatarCls()}>
      <img className={AvatarCls('img')} src={props.avatarPath} />
      <input className={AvatarCls('attach')} type="file" name="avatar" />
    </div>
  );
}
