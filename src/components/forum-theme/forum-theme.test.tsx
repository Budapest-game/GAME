import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForumTheme } from './forum-theme';

const themeInfo = {
  name: 'Тема 1',
  postsCount: 40,
};

describe('Компонет <ForumTheme>', () => {
  it('Успешный рендер компонента', () => {
    const { container, getByText } = render(<ForumTheme {...themeInfo} />);
    expect(container.firstChild).toHaveClass('theme');
    expect(getByText(themeInfo.name)).toBeInTheDocument();
  });
});
