import { InnerElementType } from "../core/CoreTypes.js";

/**
 * Метод возвращает индекс массива внутренний игровых элементов
 */
export const findElementIndexByType = (type:string, elements:InnerElementType[]):number => {
  return elements.findIndex((element) => {
    return element.type === type;
  });
};
