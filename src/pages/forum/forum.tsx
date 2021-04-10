import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { ForumTopic } from '../../components/forumTopic/forumTopic';
import { TopicInfo } from '../../api/types';
import './forum.css';

export interface ForumProps {
  isLoading: boolean;
  forumInfo: TopicInfo[];
  fetchData: () => void;
}

export class Forum extends PureComponent<ForumProps> {
  componentDidMount() {
    this.props.fetchData();
  }

  render(): JSX.Element {
    if (this.props.isLoading) {
      return <>Loading...</>;
    }

    if (!this.props.forumInfo) {
      return <div className="forumPage">
        Loading...
      </div>;
    }
    const themes = this.props.forumInfo.map((t, i) => { return <ForumTopic {...t} key={i}/>; });
    return <div className="forumPage">
       <div className="controls">
         <Link to="/create-topic">Создать тему</Link>
       </div>
      { themes }
    </div>;
  }
}
