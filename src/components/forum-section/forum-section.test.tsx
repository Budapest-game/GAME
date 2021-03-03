import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForumSection } from './forum-section';

describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<ForumSection />);
    expect(container.firstChild).toHaveClass('forum');
  });
});
