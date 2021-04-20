import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForumTopic } from './forumTopic';

const themeInfo = {
  name: 'Тема 1',
  postsCount: 40,
};

describe('Компонет <ForumTopic>', () => {
  it('Успешный рендер компонента', () => {
    const { container, getByText } = render(<ForumTopic {...themeInfo} />);
    expect(container.firstChild).toHaveClass('forum');
    expect(getByText(themeInfo.name)).toBeInTheDocument();
  });
});
