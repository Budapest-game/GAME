import React, { PureComponent } from 'react';
import Field from '../../core/Field';
import { Elements } from '../../core/levels/1/Elements';
import { Styles } from '../../core/levels/1/Styles';

export class Game extends PureComponent {
  componentDidMount() {
    const canvas = document.createElement('canvas');
    const gameField = document.getElementById('gameField');
    if (gameField) {
      const field = new Field(
        canvas,
        8,
        6,
        Elements,
        Styles,
        gameField,
      );
      const map = field.drawField();
      field.initEvent(map);
    }
  }

  render() {
    return (
            <div id="gameField">
                <h1>Игра</h1>
            </div>
    );
  }
}
