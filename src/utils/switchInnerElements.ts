import { DrawResultType } from '../core/CoreTypes';

export const switchInnerElements = (element1:DrawResultType, element2:DrawResultType):void => {
  const temp = element1.innerElement;
  const tempElement1 = element1;
  const tempElement2 = element2;
  tempElement1.innerElement = element2.innerElement;
  tempElement2.innerElement = temp;
};
