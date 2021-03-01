import React from 'react';
import { cn } from '@bem-react/classname';
import './avatar.css';

interface AvatarInfo {
  avatarPath: string,
}

const Cls = cn('avatar');

export function Avatar(props: AvatarInfo): JSX.Element {
  return (
    <div className={Cls()}>
      <img className={Cls('img')} src={props.avatarPath} />
      <input className={Cls('attach')} type="file" name="avatar" />
    </div>
  );
}
