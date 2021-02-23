import { DrawResultType } from './CoreTypes';
import { clearRect } from '../utils/drawImage';
import Cell from './Cell';

export default class Watcher {
  protected gameMap: DrawResultType[][] = [];

  protected ctx: CanvasRenderingContext2D;

  protected width: number;

  protected height: number;

  protected cell: Cell;

  constructor(
    gameMap: DrawResultType[][],
    ctx: CanvasRenderingContext2D,
    cell: Cell,
    width: number,
    height: number,
  ) {
    this.gameMap = gameMap;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.cell = cell;
  }

  public check():boolean {
    let buffer:DrawResultType[];
    let isCombine = false;
    for (let h = 0; h < this.height; h++) {
      const startElement = this.gameMap[h][0];
      buffer = [];
      buffer.push(startElement);
      if (this.rightMove(buffer, this.gameMap[h][1], false)) {
        isCombine = true;
      }
    }
    for (let w = 0; w < this.width; w++) {
      const startElement = this.gameMap[0][w];
      buffer = [];
      buffer.push(startElement);
      if (this.bottomMove(buffer, this.gameMap[1][w], false)) {
        isCombine = true;
      }
    }
    return isCombine;
  }

  protected rightMove(buffer:DrawResultType[], element:DrawResultType, combine = false):boolean {
    const leftNeighbor = element.neighbors.left;
    let tempBuffer = buffer;
    let isCombine = combine;
    if (leftNeighbor) {
      if (element.innerElement?.type !== leftNeighbor.innerElement?.type) {
        if (tempBuffer.length > 2) {
          this.clearCombination(tempBuffer);
          isCombine = true;
        }
        tempBuffer = [];
      }
      tempBuffer.push(element);
      if (element.neighbors.right) {
        return this.rightMove(tempBuffer, element.neighbors.right, isCombine);
      }
      if (!element.neighbors.right && tempBuffer.length > 2) {
        this.clearCombination(tempBuffer);
        isCombine = true;
      }
    }
    return isCombine;
  }

  protected bottomMove(buffer:DrawResultType[], element:DrawResultType, combine = false):boolean {
    const topNeighbor = element.neighbors.top;
    let tempBuffer = buffer;
    let isCombine = combine;
    if (topNeighbor) {
      if (element.innerElement?.type !== topNeighbor.innerElement?.type) {
        if (tempBuffer.length > 2) {
          this.clearCombination(tempBuffer);
          isCombine = true;
        }
        tempBuffer = [];
      }
      tempBuffer.push(element);
      if (element.neighbors.bottom) {
        return this.bottomMove(tempBuffer, element.neighbors.bottom, isCombine);
      }
      if (!element.neighbors.bottom && tempBuffer.length > 2) {
        this.clearCombination(tempBuffer);
        isCombine = true;
      }
    }
    return isCombine;
  }

  protected clearCombination(buffer:DrawResultType[]):void {
    buffer.forEach((element) => {
      const { x, y } = element.innerCoordinates;
      clearRect(this.ctx, this.cell, x, y);
      const { sellWidth, cellHeight } = this.cell.getFullSize();
      const widthIndex = Math.floor(x / sellWidth);
      const heightIndex = Math.floor(y / cellHeight);
      this.gameMap[heightIndex][widthIndex].innerElement = null;
    });
  }
}
