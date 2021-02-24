import React from 'react';
import { cn } from '@bem-react/classname';
import numbersEnds from '../../utils/numbersEnds';
import './theme.css';

export interface ThemeInfo {
  name: string,
  postsCount: number,
}
export function Theme(info:ThemeInfo): JSX.Element {
  const Cls = cn('theme');
  const endCases = ['Ответ', 'Ответа', 'Ответов'];
  return <div className={Cls()}>
    <div className={Cls('name')}>{info.name}</div>
    <div className={Cls('postsCount')}>{info.postsCount} <br/>{numbersEnds(info.postsCount, endCases)}</div>
  </div>;
}
