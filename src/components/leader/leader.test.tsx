import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Leader } from './leader';

const leaderInfo = {
  name: 'Пользователь',
  score: 1000,
  position: 1,
  avatar: 'https://ih1.redbubble.net/image.223416826.7278/pp,840x830-pad,1000x1000,f8f8f8.u3.jpg',
};

describe('Компонет <Leader>', () => {
  it('Успешный рендер компонента', () => {
    const { container, getByText } = render(<Leader {...leaderInfo}/>);
    expect(container.firstChild).toHaveClass('leader');
    expect(getByText(leaderInfo.name)).toBeInTheDocument();
  });
});
