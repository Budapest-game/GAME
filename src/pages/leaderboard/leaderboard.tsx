import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Leader } from '../../components/leader/leader';
import './leaderboard.css';

export class Leaderboard extends PureComponent {
  fakeLeaders():JSX.Element[] {
    const leaders = [];
    for (let i = 1; i < 11; i++) {
      leaders.push(Leader({
        name: `Пользователь ${i}`,
        score: 1000,
        position: i,
        avatar: 'https://ih1.redbubble.net/image.223416826.7278/pp,840x830-pad,1000x1000,f8f8f8.u3.jpg',
      }));
    }
    return leaders;
  }

  render():JSX.Element {
    const Cls = cn('leaderboard');
    const leadersComponents = this.fakeLeaders();
    return (
             <div className={Cls()}>
               <div className={Cls('header')}>
                 <h1>Таблица лидеров</h1>
               </div>
               <div className={Cls('content')}>
                {leadersComponents}
              </div>
            </div>
    );
  }
}
