import React, { PureComponent } from 'react';
import './leaderboard.css';

interface LeaderInfo{
  name: string,
  score: number,
  position: number,
  avatar: string
}
function leader(info: LeaderInfo) {
  return <div className="leader">
      <div className="leader-position">{info.position}</div>
      <div className="leader-media">
          <img className="leader-avatar" src={info.avatar}/>
      </div>
      <div className="leader-nickname">
          <span>{info.name}</span>
      </div>
      <div className="leader-score">
        <span>{info.score}</span>
      </div>
  </div>;
}

export class Leaderboard extends PureComponent {
  fakeLeaders():JSX.Element[] {
    const leaders = [];
    for (let i = 1; i < 11; i++) {
      leaders.push(leader({
        name: `Пользователь ${i}`,
        score: 1000,
        position: i,
        avatar: 'https://ih1.redbubble.net/image.223416826.7278/pp,840x830-pad,1000x1000,f8f8f8.u3.jpg',
      }));
    }
    return leaders;
  }

  render():JSX.Element {
    const leadersComponents = this.fakeLeaders();
    return (
             <div className="leaderboard">
               <div className="leaderboard-header">
                 <h1>Таблица лидеров</h1>
               </div>
               <div className="leaderboard-content">
                {leadersComponents}
              </div>
            </div>
    );
  }
}
