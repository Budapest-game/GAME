import { InnerElementType } from '../../CoreTypes';
import apple from '../assets/apple.png';
import banana from '../assets/banana.png';
import bow from '../assets/bow.png';
import candy from '../assets/candy.png';
import raspberries from '../assets/raspberries.png';
import Coin01 from '../assets/Coin01.mp3';

export const Elements:InnerElementType[] = [
  {
    type: 'apple',
    path: apple,
    dWidth: 30,
    dHeight: 30,
  },
  {
    type: 'banana',
    path: banana,
    dWidth: 30,
    dHeight: 30,
  },
  {
    type: 'bow',
    path: bow,
    dWidth: 30,
    dHeight: 30,
  },
  {
    type: 'candy',
    path: candy,
    dWidth: 30,
    dHeight: 30,
  },
  {
    type: 'raspberries',
    path: raspberries,
    dWidth: 30,
    dHeight: 30,
  },
];

export const Sounds: Record<string, string> = {
  coin: Coin01,
};
