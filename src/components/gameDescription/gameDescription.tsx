import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import './gameDescription.css';
import game from './game.png';
import textContent from './textContent';

export class GameDescription extends PureComponent {
  render() {
    const ClsGameDescription = cn('gameDescription');
    return (
      <>
      <h1>{textContent.header}</h1>
      <div className={ClsGameDescription()}>
        <div className={ClsGameDescription('text')}>
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
        <img className={ClsGameDescription('img')} src={game} />
      </div>
    </>
    );
  }
}
