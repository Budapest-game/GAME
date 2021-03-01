import { ForumInfo } from '../actionCreators/forum';

export const forumInfo: ForumInfo[] = [
  {
    name: 'Раздел 1',
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
    name: 'Раздел 2',
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
