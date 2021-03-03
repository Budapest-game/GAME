import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Leader } from './leader';

describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Leader />);
    expect(container.firstChild).toHaveClass('leader');
  });
});
