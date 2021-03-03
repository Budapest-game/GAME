import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navigation } from './navigation';

describe('Компонет <Form>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Router><Navigation /></Router>);
    expect(container.firstChild).toHaveClass('leader');
  });
});
