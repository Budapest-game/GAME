import React from 'react';
import { cn } from '@bem-react/classname';
import { BASE_RESOURCES_URL } from '../../api/constants';
import { LeaderInfo } from '../../store/actionCreators/leaderboard';
import defaultAvatar from '../../assets/defaultAvatar.png';
import './leader.css';

const Cls = cn('leader');

export function Leader(info: LeaderInfo): JSX.Element {
  return <div className={Cls()} key={info.position}>
      <div className={Cls('position')}>{info.position}</div>
      <div className={Cls('media')}>
        <img className={Cls('avatar')} src={info.avatar ? BASE_RESOURCES_URL + info.avatar : defaultAvatar}/>
      </div>
      <div className={Cls('nickname')}>
        <span>{info.name}</span>
      </div>
      <div className={Cls('score')}>
          <span>{info.budapestScore}</span>
      </div>
  </div>;
}
