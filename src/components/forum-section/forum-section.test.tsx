import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForumSection } from './forum-section';

const forumInfo = {
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
};

describe('Компонет <ForumSection>', () => {
  it('Успешный рендер компонента', () => {
    const { container, getAllByText, getByText } = render(<ForumSection {...forumInfo} />);
    expect(container.firstChild).toHaveClass('forum');
    expect(getByText(forumInfo.name)).toBeInTheDocument();
    expect(getAllByText(/Тема/)).toHaveLength(3);
  });
});
