import React from 'react';
import { cn } from '@bem-react/classname';
import './leader.css';

const Cls = cn('leader');

export function Leader(info: LeaderInfo): JSX.Element {
  return <div className={Cls()} key={info.position}>
      <div className={Cls('position')}>{info.position}</div>
      <div className={Cls('media')}>
        <img className={Cls('avatar')} src={info.avatar}/>
      </div>
      <div className={Cls('nickname')}>
        <span>{info.name}</span>
      </div>
      <div className={Cls('score')}>
          <span>{info.score}</span>
      </div>
  </div>;
}
