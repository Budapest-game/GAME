export const getScore = (combineLength:number, scoreMultiplier:Record<number, string>):number => {
  return combineLength * 10 * parseFloat(scoreMultiplier[combineLength]);
};
