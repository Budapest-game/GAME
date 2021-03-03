import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from './form';

describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Form />);
    expect(container.firstChild).toHaveClass('form');
  });
});
