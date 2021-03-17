import React from 'react';
import { cn } from '@bem-react/classname';
import { ForumThemeInfo } from '../../store/actionCreators/forum';
import numbersEnds from '../../utils/numbersEnds';
import './forum-theme.css';

const Cls = cn('theme');
const endCases = ['Ответ', 'Ответа', 'Ответов'];

export function ForumTheme(info:ForumThemeInfo): JSX.Element {
  return <div className={Cls()}>
    <div className={Cls('name')}>{info.name}</div>
    <div className={Cls('postsCount')}>{info.postsCount} <br/>{numbersEnds(info.postsCount, endCases)}</div>
  </div>;
}
