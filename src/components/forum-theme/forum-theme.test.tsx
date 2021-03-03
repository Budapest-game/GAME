import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForumTheme } from './forum-theme';

describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<ForumTheme />);
    expect(container.firstChild).toHaveClass('theme');
  });
});
