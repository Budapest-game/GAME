import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Компонет <Button>', () => {
  it('Успешный рендер компонента', () => {
    const { container, getByText } = render(<Button text="TestButton" />);
    expect(container.firstChild).toHaveClass('btn');
    expect(getByText('TestButton')).toBeInTheDocument();
  });
  it('Кнопка реагирует на клик', () => {
    let clickState = false;
    const clickHandler = () => {
      clickState = true;
    };
    const { getByText } = render(<Button text="TestButton" onClick={clickHandler} />);
    const button = getByText('TestButton');
    fireEvent.click(button);
    expect(clickState).toBe(true);
  });
  it('Кнопка редренрится с заданным классом', () => {
    const { container } = render(<Button text="TestButton" className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });
});
