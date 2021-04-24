import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForumTopic } from './forumTopic';

const themeInfo = {
  name: 'Тема 1',
  topicId: 42,
  comments: [] as [],
  content: '',
  userId: 24,
};

describe('Компонет <ForumTopic>', () => {
  it('Успешный рендер компонента', () => {
    const { container, getByText } = render(<ForumTopic {...themeInfo} />);
    expect(container.firstChild).toHaveClass('topic');
    expect(getByText(themeInfo.name)).toBeInTheDocument();
  });
});
