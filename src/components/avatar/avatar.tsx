import React from 'react';
import { cn } from '@bem-react/classname';
import { BASE_URL } from '../../api/constants';
import './avatar.css';

interface AvatarInfo {
  avatarPath: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
}

export function Avatar(props: AvatarInfo): JSX.Element {
  const AvatarCls = cn('avatar');
  return (
    <div className={AvatarCls()}>
      <img className={AvatarCls('img')} src={BASE_URL + props.avatarPath} />
      <input className={AvatarCls('attach')} type="file" name="avatar" onChange={props.onChange} />
    </div>
  );
}
