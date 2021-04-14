import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { ForumTopic } from '../../components/forumTopic/forumTopic';
import { TopicInfo } from '../../api/types';
import './forum.css';

export interface ForumProps {
  isLoading: boolean;
  forumInfo: TopicInfo[];
  fetchData: () => void;
}

const Cls = cn('forumPage');
export class Forum extends PureComponent<ForumProps> {
  componentDidMount():void {
    this.props.fetchData();
  }

  render(): JSX.Element {
    if (this.props.isLoading) {
      return <>Loading...</>;
    }

    if (!this.props.forumInfo) {
      return <div className={Cls()}>
        Loading...
      </div>;
    }
    const themes = this.props.forumInfo.map((t, i) => { return <ForumTopic {...t} key={i}/>; });
    return <div className={Cls()}>
       <div className={Cls('controls')}>
         <Link className={`${Cls('controls-button')} button-themed-link`} to="/create-topic">Создать тему</Link>
       </div>
      { themes }
    </div>;
  }
}
