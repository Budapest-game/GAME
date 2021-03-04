import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from './avatar';
import { BASE_URL } from '../../api/constants';

const emtpyFn = () => {
  // empty
};
describe('Компонет <Avatar>', () => {
  it('Успешный рендер компонента', () => {
    const { container } = render(<Avatar avatarPath="/test/1" onChange={emtpyFn} />);
    expect(container.firstChild).toHaveClass('avatar');
  });
  it('Корректно установлен URL картинки', () => {
    const path = '/test/1';
    const { container } = render(<Avatar avatarPath={path} onChange={emtpyFn} />);
    const img = container.querySelector('img');
    if (img !== null) {
      expect(img.src).toBe(`${BASE_URL}${path}`);
    }
  });
  it('Выбор файла для автара', () => {
    const file = new File(['file'], 'file.png', { type: 'image/png' });
    const { container } = render(<Avatar avatarPath='/test/1' onChange={emtpyFn} />);
    const input = container.querySelector('input');
    if (input !== null) {
      fireEvent.change(input, { target: { files: [file] } });
      expect(input.files).toHaveLength(1);
      if (input.files && input.files.length) expect(input?.files[0].name).toBe('file.png');
      else throw new Error('У инпута с типо file нет свойства files');
    } else {
      throw new Error('Не найден элемет input');
    }
  });
  it('Проверка обработчика onChange', () => {
    let handlerStatus = false;
    const changeHandler = () => {
      handlerStatus = true;
    };
    const { container } = render(<Avatar avatarPath='/test/1' onChange={changeHandler} />);
    const input = container.querySelector('input');
    if (input !== null) {
      fireEvent.change(input);
      expect(handlerStatus).toBe(true);
    } else {
      throw new Error('Не найден элемет input');
    }
  });
});
