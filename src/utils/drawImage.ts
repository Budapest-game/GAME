import { DrawResultType } from '../core/CoreTypes';
import Cell from '../core/Cell';

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  image:HTMLImageElement,
  x:number, y:number,
  dWidth:number,
  dHeight:number,
):void => {
  ctx.drawImage(image, x, y, dWidth, dHeight);
};

export const reDrawArea = (
  ctx: CanvasRenderingContext2D,
  cell: Cell,
  area:DrawResultType[],
  image:HTMLImageElement,
  animateY:number,
):void => {
  area.forEach((element) => {
    const { outerCoordinates } = element;
    const { x, y } = outerCoordinates;
    cell.setCoordinates(x, y);
    cell.drawCell(true);
  });
  const { innerCoordinates, innerElement } = area[0];
  if (innerElement) {
    const dx = innerCoordinates.x + (cell.width - innerElement.dWidth) / 2;
    ctx.drawImage(image, dx, animateY);
  }
};

export const clearRect = (ctx: CanvasRenderingContext2D, cell: Cell, x:number, y:number):void => {
  ctx.clearRect(
    x,
    y,
    cell.width,
    cell.height,
  );
};

export const fillRect = (ctx: CanvasRenderingContext2D, cell: Cell, x:number, y:number):void => {
  ctx.fillRect(
    x,
    y,
    cell.width,
    cell.height,
  );
};
