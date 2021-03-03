import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './input';

describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toHaveClass('input');
  });
});
