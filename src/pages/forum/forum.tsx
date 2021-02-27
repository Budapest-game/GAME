import React, { PureComponent } from 'react';
import { ForumSection } from '../../components/forum-section/forum-section';
import { ForumInfo } from '../../store/actionCreators/forum';
import './forum.css';

export interface ForumProps {
  isLoading: boolean;
  forumInfo: ForumInfo[];
  fetchData: (/* url: string */) => void;
}

export class Forum extends PureComponent<ForumProps> {
  componentDidMount() {
    this.props.fetchData();
  }

  render(): JSX.Element {
    if (this.props.isLoading) {
      return <>Loading</>;
    }

    const forums = this.props.forumInfo.map((f, i) => { return <ForumSection {...f} key={i}/>; });
    return <div className="forumPage">
      {forums}
    </div>;
  }
}
