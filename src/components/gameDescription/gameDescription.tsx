import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import './gameDescription.css';
import game from './game.png';

export class GameDescription extends PureComponent {
  render() {
    const ClsGameDescription = cn('gameDescription');
    return (
      <>
      <h1>Игра &quot;Три в ряд&quot;.</h1>
      <div className={ClsGameDescription()}>
        <div className={ClsGameDescription('text')}>
          <p>
            В игре требуется собрать 3 и более одинаковых элемента в ряд.
          </p>
          <p>
            Игровое поле размером N на N элементов.
            Условие завершения игры - окончание времени (t секунд) или n ходов (перестановок).
            Можно менять местами элементы. Если в процессе смены местоположения не получается
            три и более элемента в ряд, действие отменяется и элементы встают на прежнее место.
            Менять местами можно только элементы находящиеся рядом друг с другом по горизонтали
            или по вертикали.
            Взамен убывших элементов сверху в рандомном порядке появляются новые элементы.
          </p>
          <p>
            Результат пользователя - это количество &quot;уничтоженных&quot; элементов за время игры
            или n ходов.
          </p>
        </div>
        <img className={ClsGameDescription('img')} src={game} />
      </div>
    </>
    );
  }
}
