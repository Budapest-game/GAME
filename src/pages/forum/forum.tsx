import React, { PureComponent } from 'react';
import { SingleForum } from '../../components/forum/singleForum';
import './forum.css';

const forumsInfo = [
  {
    name: 'Фидбек',
    themes: [
      {
        name: 'Тема 1',
        postsCount: 40,
      },
      {
        name: 'Тема 2',
        postsCount: 32,
      },
      {
        name: 'Тема 3',
        postsCount: 2,
      },
    ],
  },
  {
    name: 'Фидбек2',
    themes: [
      {
        name: 'Тема 1',
        postsCount: 0,
      },
      {
        name: 'Тема 2',
        postsCount: 32,
      },
      {
        name: 'Тема 3',
        postsCount: 1,
      },
    ],
  },
];
export class Forum extends PureComponent {
  render(): JSX.Element {
    const forums = forumsInfo.map((f, i) => { return <SingleForum {...f} key={i}/>; });
    return <div className="forumPage">
      {...forums}
    </div>;
  }
}
