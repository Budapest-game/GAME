import { DrawResultType, InnerElementType, QueueElementType } from './CoreTypes';
import Cell from './Cell';
import { clearRect, drawImage, reDrawArea } from '../utils/drawImage';
import { randomArrayElement } from '../utils/randomArrayElement';
import { switchInnerElements } from '../utils/switchInnerElements';
import CombinationWatcher from './CombinationWatcher';

export default class Animation {
  protected gameMap: DrawResultType[][] = [];

  protected ctx: CanvasRenderingContext2D

  protected cell: Cell;

  protected watcher: CombinationWatcher;

  protected elements: InnerElementType[];

  protected width: number;

  protected animationTime = 100;

  constructor(
    gameMap:DrawResultType[][],
    ctx: CanvasRenderingContext2D,
    cell:Cell,
    watcher:CombinationWatcher,
    gameElements:InnerElementType[],
  ) {
    this.gameMap = gameMap;
    this.cell = cell;
    this.watcher = watcher;
    this.ctx = ctx;
    this.width = this.gameMap[0].length;
    this.elements = gameElements;
  }

  public updateGameField():void {
    const queue = this.fillQueue();
    if (queue.length > 0) {
      queue.forEach((queueElement) => {
        const startTime = performance.now();
        const { element } = queueElement;
        if (element) {
          const { innerElement } = element;
          if (innerElement) {
            const tempY = element.innerCoordinates.y;
            this.animate(this.cell.images[innerElement.type], queueElement, startTime, tempY);
          }
        }
      });
      setTimeout(() => {
        this.updateGameField();
      }, 300);
    } else if (this.watcher.checkCombination()) {
      setTimeout(() => {
        this.updateGameField();
      }, 300);
    }
  }

  protected animate(
    image:HTMLImageElement,
    queueElement:QueueElementType,
    startTime:number,
    animateY:number,
  ):void {
    this.ctx.beginPath();
    const time = performance.now();
    let shiftTime = time - startTime;
    if (shiftTime > 110) {
      shiftTime = 100;
    }
    const multiply = shiftTime / this.animationTime;
    const { element, emptyCell } = queueElement;
    if (!element || !emptyCell) {
      return;
    }
    let tempY = animateY;
    tempY += (
      emptyCell.innerCoordinates.y
      - element.innerCoordinates.y
    ) * multiply;
    reDrawArea(this.ctx, this.cell, queueElement.animateArea, image, tempY);
    this.ctx.closePath();
    if (multiply < 1) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.animate(image, queueElement, startTime, animateY);
        });
      }, 1000 / 60);
    } else {
      switchInnerElements(element, emptyCell);
      if (emptyCell.innerElement) {
        clearRect(
          this.ctx,
          this.cell,
          emptyCell.innerCoordinates.x,
          emptyCell.innerCoordinates.y,
        );
        drawImage(
          this.ctx,
          image,
          emptyCell.innerCoordinates.x + (this.cell.width - emptyCell.innerElement.dWidth) / 2,
          emptyCell.innerCoordinates.y + (this.cell.height - emptyCell.innerElement.dHeight) / 2,
          emptyCell.innerElement.dWidth,
          emptyCell.innerElement.dHeight,
        );
      }
    }
  }

  protected fillQueue():QueueElementType[] {
    const queue = [];
    for (let w = 0; w < this.width; w++) {
      const queueElement = this.checkColumn(w);
      if (typeof queueElement !== 'boolean') {
        queue.push(queueElement);
      }
    }
    return queue;
  }

  protected checkColumn(w:number):boolean|QueueElementType {
    let startElement:DrawResultType|null = this.gameMap[0][w];
    const queueElement:QueueElementType = {
      element: null,
      emptyCell: null,
      animateArea: [],
    };
    if (!startElement.innerElement) {
      startElement.innerElement = randomArrayElement(this.elements);
      queueElement.element = startElement;
      clearRect(
        this.ctx,
        this.cell,
        startElement.innerCoordinates.x,
        startElement.innerCoordinates.y,
      );
      drawImage(
        this.ctx,
        this.cell.images[startElement.innerElement.type],
        startElement.innerCoordinates.x
        + (this.cell.width - startElement.innerElement.dWidth) / 2,
        startElement.innerCoordinates.y
        + (this.cell.height - startElement.innerElement.dHeight) / 2,
        startElement.innerElement.dWidth,
        startElement.innerElement.dHeight,
      );
    }
    queueElement.element = startElement;
    queueElement.animateArea.push(startElement);
    const checkBottomNeighbor = ():void => {
      startElement = (startElement as DrawResultType).neighbors.bottom;
      if (startElement) {
        if (startElement.innerElement && !queueElement.emptyCell) {
          queueElement.element = startElement;
          queueElement.animateArea = [];
          queueElement.animateArea.push(startElement);
        } else if (!startElement.innerElement) {
          queueElement.emptyCell = startElement;
          queueElement.animateArea.push(startElement);
        }
        checkBottomNeighbor();
      }
    };
    checkBottomNeighbor();
    if (!queueElement.element || !queueElement.emptyCell) {
      return false;
    }
    return queueElement;
  }
}
