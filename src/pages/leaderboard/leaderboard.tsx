import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Leader } from '../../components/leader/leader';
import { LeaderInfo } from '../../store/actionCreators/leaderboard';

const Cls = cn('leaderboard');

export interface LeaderboardProps {
  isLoading: boolean;
  info: LeaderInfo[];
  fetchData: () => void;
}

export class Leaderboard extends PureComponent<LeaderboardProps> {
  componentDidMount():void {
    this.props.fetchData();
  }

  render():JSX.Element {
    if (this.props.isLoading) {
      return <>Loading...</>;
    }

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
          {
             this.props.info.map((leaderInfo) => {
               return <Leader {...leaderInfo} key={leaderInfo.position}/>;
             })
          }
        </div>
      </div>
    );
  }
}
