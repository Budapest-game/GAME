import React from 'react';
import { cn } from '@bem-react/classname';
import { LeaderInfo } from '../../store/actionCreators/leaderboard';
import './leader.css';

<<<<<<< HEAD
interface LeaderInfo {
  name: string,
  score: number,
  position: number,
  avatar: string
}

const Cls = cn('leader');

export function leader(info: LeaderInfo): JSX.Element {
=======
export function Leader(info: LeaderInfo): JSX.Element {
  const Cls = cn('leader');
>>>>>>> S6T37: Добавить Redux Thunk на страницу лидерборда. (#26)
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
