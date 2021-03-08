import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navigation } from './navigation';

describe('Компонет <Navigation>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Router><Navigation /></Router>);
    const links = container.querySelectorAll('a');
    expect(links.length > 0).toBe(true);
  });
});
