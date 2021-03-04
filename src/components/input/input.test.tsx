import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './input';

describe('Компонет <Input>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toHaveClass('input');
  });

  it('Компонент рендерится с заданным классом', () => {
    const testCls = 'test';
    const { container } = render(<Input className={testCls}/>);
    expect(container.firstChild).toHaveClass(testCls);
  });

  it('Компонент реагирует на ивент change', () => {
    const holder = 'test';
    const testValue = 'testInput';
    const { getByPlaceholderText } = render(<Input type='text' placeholder={holder} />);
    const input = getByPlaceholderText(holder) as HTMLInputElement;
    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toBe(testValue);
  });
});
