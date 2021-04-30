import { cn } from '@bem-react/classname';
import React from 'react';
import './reaction.css';

const Cls = cn('reaction');
export default function ForumReaction():JSX.Element {
  return <div className={Cls()}>
    <div className={Cls('action')}>
      <span>0</span>
      <div>+</div>
    </div>
    <div className={Cls('action')}>
      <span>0</span>
      <div>-</div>
    </div>
  </div>;
}
