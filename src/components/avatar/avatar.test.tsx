import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Avatar } from './avatar';

describe('Компонет <Avatar>', () => {
  it('Успешный рендер компонента', () => {
    const { container } =  render(<Avatar avatarPath="/test/1" onChange={()=>{}} />);
    expect(container.firstChild).toHaveClass('avatar');
  });
});
