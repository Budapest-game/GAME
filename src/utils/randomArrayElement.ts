import { InnerElementType } from '../core/CoreTypes';
/**
 * Метод возвращает случайный элемент массива
 * @param array
 * @protected
 */

export const randomArrayElement = (array:InnerElementType[]):InnerElementType => {
  return array[Math.floor(Math.random() * array.length)];
};
