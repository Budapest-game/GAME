import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Leader } from '../../components/leader/leader';
import { LeaderInfo } from '../../store/actionCreators/leaderboard';
import './leaderboard.css';

export interface LeaderboardProps {
  isLoading: boolean;
  info: LeaderInfo[];
  fetchData: (/* url: string */) => void;
}

export class Leaderboard extends PureComponent<LeaderboardProps> {
  makeLeadersInfoLayout(info: LeaderInfo[]):JSX.Element[] {
    const leaders = [];
    for (let i = 0; i < info.length; i++) {
      leaders.push(Leader({
        name: info[i].name,
        score: info[i].score,
        position: info[i].position,
        avatar: info[i].avatar,
      }));
    }
    return leaders;
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render():JSX.Element {
    if (this.props.isLoading) {
      return <>Loading...</>;
    }

    const Cls = cn('leaderboard');
    const leadersComponents = this.makeLeadersInfoLayout(this.props.info);

    if (!this.props.info) {
      return (
        <div className={Cls()}>
            Loading...
        </div>
      );
    }

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
