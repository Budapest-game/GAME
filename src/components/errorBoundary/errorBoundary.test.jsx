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

function Bomb({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return null;
  }
}
describe('Компонет <errorBoundary>', () => {
  it('Компонент ловит ошибку', () => {
    const { container } = render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(container).toHaveTextContent('Something went wrong!');
  });
});
