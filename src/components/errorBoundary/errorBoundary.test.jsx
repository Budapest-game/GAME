import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from './errorBoundary';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

function Error() {
  throw new Error();
}
describe('Компонет <errorBoundary>', () => {
  it('Компонент ловит ошибку', () => {
    const { container } = render(
      <ErrorBoundary>
        <Error />
      </ErrorBoundary>,
    );
    expect(container).toHaveTextContent('Something went wrong!');
  });
});
