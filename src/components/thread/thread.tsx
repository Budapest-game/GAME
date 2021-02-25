import React from 'react';
import { cn } from '@bem-react/classname';
import { Theme, ThemeInfo } from '../theme/theme';
import './thread.css';

interface ThreadInfo {
  name : string,
  themes: ThemeInfo[]
}

export function Thread(info: ThreadInfo): JSX.Element {
  const Cls = cn('forum');
  const themes = info.themes.map((t, i) => { return <Theme {...t} key={i}/>; });
  return <div className={Cls()}>
    <div className={Cls('header')}><h1>{info.name}</h1></div>
    <div className={Cls('themes')}>
      {themes}
    </div>
  </div>;
}
