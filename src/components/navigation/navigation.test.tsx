import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './navigation';

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn((fn) => { return fn({ authorisation: { isAuthenticated: true }, theme: { id: 'light' } }); }),
    useDispatch: jest.fn(() => { return true; }),
  };
});

describe('Компонет <Navigation>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(
      <Router>
        <Navigation fetchCSS={() => { return undefined; }}/>
      </Router>,
    );
    const links = container.querySelectorAll('a');
    expect(links.length > 0).toBe(true);
  });
});
