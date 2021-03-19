import React from 'react';
import { cn } from '@bem-react/classname';
import { BASE_URL } from '../../api/constants';
import './avatar.css';

interface AvatarInfo {
  avatarPath: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
}

const Cls = cn('avatar');

export function Avatar(props: AvatarInfo): JSX.Element {
  return (
    <div className={Cls()}>
      <img className={Cls('img')} src={BASE_URL + props.avatarPath} />
      <input className={Cls('attach')} type="file" name="avatar" onChange={props.onChange} />
    </div>
  );
}
