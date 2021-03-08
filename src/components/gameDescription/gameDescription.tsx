import React from 'react';
import { cn } from '@bem-react/classname';
import './gameDescription.css';
import game from './game.png';
import textContent from './textContent';

export function GameDescription(): JSX.Element {
  const Cls = cn('gameDescription');
  return (
    <>
    <h1>{textContent.header}</h1>
    <div className={Cls()}>
      <div className={Cls('text')}>
        <p>
          {textContent.descriptionStart}
        </p>
        <p>
          {textContent.description}
        </p>
        <p>
          {textContent.descriptionEnd}
        </p>
      </div>
      <img className={Cls('img')} src={game} />
    </div>
  </>
  );
}
