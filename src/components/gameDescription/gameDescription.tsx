import React from 'react';
import { cn } from '@bem-react/classname';
// import game from './game.png';
import textContent from './textContent';
import './gameDescription.css';

const game = 'test';

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
