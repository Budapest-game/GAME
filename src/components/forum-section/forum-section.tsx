import React from 'react';
import { cn } from '@bem-react/classname';
import { ForumInfo } from '../../store/actionCreators/forum';
import { ForumTheme } from '../forum-theme/forum-theme';

const Cls = cn('forum');
export function ForumSection(info: ForumInfo): JSX.Element {
  const themes = info.themes.map((t, i) => { return <ForumTheme {...t} key={i}/>; });
  return <div className={Cls()}>
    <div className={Cls('header')}><h1>{info.name}</h1></div>
    <div className={Cls('themes')}>
      {themes}
    </div>
  </div>;
}
