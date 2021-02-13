import Cell from './Cell.js';
import { InnerElementType, StyleTypes, DrawResultType } from './CoreTypes.js';
import { randomArrayElement } from "../utils/randomArrayElement.js";
import { findElementIndexByType } from "../utils/findElementIndexByType.js";

export default class Field {
  protected width: number;

  protected height: number;

  protected fieldStyle: StyleTypes;

  protected elements: InnerElementType[];

  protected canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D|null;

  protected cellWidth: number;

  protected cellHeight: number;

  protected fieldWidth: number;

  protected fieldHeight: number;

  protected gameMap: DrawResultType[][]|undefined;

  public activeElement: DrawResultType|null;

  protected cell: Cell;

  constructor(
    canvas:HTMLCanvasElement,
    width:number,
    height:number,
    elements:InnerElementType[],
    style:StyleTypes,
    block:HTMLElement,
  ) {
    this.width = width;
    this.height = height;
    this.elements = elements;
    this.fieldStyle = style;

    this.canvas = canvas;
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    block.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      throw new Error('no context init');
    }
    this.cell = new Cell(this.fieldStyle, this.ctx);
    const { sellWidth, cellHeight } = this.cell.getFullSize();
    this.cellWidth = sellWidth;
    this.cellHeight = cellHeight;
    this.fieldWidth = sellWidth * this.width;
    this.fieldHeight = cellHeight * this.height;
    this.activeElement = null;
  }

  /**
   * Метод по отрисовке игрового поля
   */
  public drawField():DrawResultType[][] {
    if (!this.cell) {
      throw new Error('no cell init');
    }
    // результирующий массив игрового поля
    const gameMap:DrawResultType[][] = [];
    let coordX = 0;
    let coordY = 0;
    for (let heightIndex = 0; heightIndex < this.height; heightIndex++) {
      // высчитываем координату Y по высоте ячейки и индексу строки
      if (heightIndex !== 0) {
        coordY = this.cellHeight * heightIndex;
      }
      gameMap[heightIndex] = [];
      for (let widthIndex = 0; widthIndex < this.width; widthIndex++) {
        // алгоритм не позволяющий трем элементам вставать в ряд
        // при изначальной генерации игрового поля
        const element = this.checkElementNeighbors(gameMap, heightIndex, widthIndex);
        // Присваиваем ячейке ее внутренний элемент
        this.cell.setInnerElement(element);
        // Высчитываем координату по Х на основании ширины ячейки и индекса колонки
        if (widthIndex !== 0) {
          coordX = this.cellWidth * widthIndex;
        } else {
          coordX = 0;
        }
        // Устанавливаем координаты
        this.cell.setCoordinates(coordX, coordY);
        // Рисуем ячейку
        const cellParams = this.cell.drawCell();
        // Записываем результат в результирующий массив по индексу
        gameMap[heightIndex].push(cellParams);
        this.fillNeighbors(gameMap, heightIndex, widthIndex);
      }
    }
    // В случае длительной генерации поля возвращаем Промис
    return gameMap;
  }

  protected fillNeighbors(
    gameMap:DrawResultType[][],
    heightIndex:number,
    widthIndex:number,
  ):void {
    const element = gameMap[heightIndex][widthIndex];
    if (heightIndex - 1 >= 0) {
      const elementTop = gameMap[heightIndex - 1][widthIndex];
      element.neighbors.top = elementTop;
      elementTop.neighbors.bottom = element;
    }
    if (widthIndex - 1 >= 0) {
      const elementLeft = gameMap[heightIndex][widthIndex - 1];
      element.neighbors.left = elementLeft;
      elementLeft.neighbors.right = element;
    }
  }

  /**
   * Алгоритм проверки содержатся ли аналогичные элементы в количестве
   * двух штук справа или сверху от целевой ячейки
   */
  protected checkElementNeighbors(
    gameMap:DrawResultType[][],
    heightIndex:number,
    widthIndex:number,
  ):InnerElementType {
    const elements = this.elements.slice();
    if (heightIndex > 1) {
      const element1 = gameMap[heightIndex - 1][widthIndex];
      const element2 = gameMap[heightIndex - 2][widthIndex];
      if (
        element1.innerElement
        && element2.innerElement
        && element1.innerElement.type === element2.innerElement.type
      ) {
        elements.splice(findElementIndexByType(element1.innerElement.type, elements), 1);
      }
    }
    if (widthIndex > 1) {
      const element1 = gameMap[heightIndex][widthIndex - 1];
      const element2 = gameMap[heightIndex][widthIndex - 2];
      if (
        element1.innerElement
        && element2.innerElement
        && element1.innerElement.type === element2.innerElement.type
      ) {
        elements.splice(findElementIndexByType(element1.innerElement.type, elements), 1);
      }
    }
    return randomArrayElement(elements);
  }

  /**
   * Инициализация событий
   * Тут же условия для срабатывания перестановки элементов
   * Надо придумать как не допускать перестановки элементов по диагонали
   */
  public initEvent(gameMap:DrawResultType[][]):void {
    this.gameMap = gameMap;
    this.canvas.addEventListener('click', (event:MouseEvent) => {
      if (!this.cellWidth || !this.cellHeight) {
        throw new Error('no field init');
      }
      const { offsetX, offsetY } = event;
      const widthIndex = Math.floor(offsetX / this.cellWidth);
      const heightIndex = Math.floor(offsetY / this.cellHeight);
      if (widthIndex < this.width && heightIndex < this.height) {
        if (!this.gameMap) {
          return;
        }
        if (this.activeElement) {
          const { x, y } = this.activeElement.innerCoordinates;
          const activeWidthIndex = Math.floor(x / this.cellWidth);
          const activeHeightIndex = Math.floor(y / this.cellHeight);
          if (
            (
              (widthIndex - 1 === activeWidthIndex || widthIndex + 1 === activeWidthIndex)
            && (heightIndex === activeHeightIndex || heightIndex === activeHeightIndex)
            )
            || (
              (heightIndex - 1 === activeHeightIndex || heightIndex + 1 === activeHeightIndex)
            && (widthIndex === activeWidthIndex || widthIndex === activeWidthIndex)
            )
          ) {
            this.switchElementDraws(
              this.gameMap[activeHeightIndex][activeWidthIndex],
              this.gameMap[heightIndex][widthIndex],
            );
            const temp1 = JSON.parse(
              JSON.stringify(this.gameMap[activeHeightIndex][activeWidthIndex].innerElement),
            );
            // eslint-disable-next-line max-len
            this.gameMap[activeHeightIndex][activeWidthIndex].innerElement = this.gameMap[heightIndex][widthIndex].innerElement;
            this.gameMap[heightIndex][widthIndex].innerElement = temp1;
            setTimeout(() => {
              if (!this.watcher() && this.activeElement && this.gameMap) {
                this.switchElementDraws(
                  this.gameMap[heightIndex][widthIndex],
                  this.gameMap[activeHeightIndex][activeWidthIndex],
                );
                const temp2 = JSON.parse(
                  JSON.stringify(this.gameMap[activeHeightIndex][activeWidthIndex].innerElement),
                );
                // eslint-disable-next-line max-len
                this.gameMap[activeHeightIndex][activeWidthIndex].innerElement = this.gameMap[heightIndex][widthIndex].innerElement;
                this.gameMap[heightIndex][widthIndex].innerElement = temp2;
              }
              this.activeElement = null;
              this.fallElements();
            }, 300);
          } else {
            this.deactivateElement(this.gameMap[activeHeightIndex][activeWidthIndex]);
            this.activateElement(this.gameMap[heightIndex][widthIndex]);
            this.activeElement = this.gameMap[heightIndex][widthIndex];
          }
        } else {
          this.activateElement(this.gameMap[heightIndex][widthIndex]);
          this.activeElement = this.gameMap[heightIndex][widthIndex];
        }
      }
    });
  }

  protected switchElementObjects(element1:InnerElementType|null, element2:InnerElementType) {
    const temp = JSON.parse(JSON.stringify(element1));
    element1 = element2;
    element2 = temp;
  }

  /**
   * Алгоритм перестановки элементов
   */
  protected switchElementDraws(activeElement:DrawResultType, clickElement:DrawResultType):void {
    if (!activeElement.innerElement) {
      return;
    }
    this.clearRect(clickElement.innerCoordinates.x, clickElement.innerCoordinates.y);
    this.reDrawImage(
      activeElement.innerElement.path,
      clickElement.innerCoordinates.x,
      clickElement.innerCoordinates.y,
      activeElement.innerElement.dWidth,
      activeElement.innerElement.dHeight,
    );

    if (!clickElement.innerElement) {
      return;
    }
    this.clearRect(activeElement.innerCoordinates.x, activeElement.innerCoordinates.y);
    this.reDrawImage(
      clickElement.innerElement.path,
      activeElement.innerCoordinates.x,
      activeElement.innerCoordinates.y,
      clickElement.innerElement.dWidth,
      clickElement.innerElement.dHeight,
    );
  }

  protected watcher():boolean {
    let buffer:DrawResultType[];
    if (!this.gameMap) {
      return false;
    }
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

  protected fallElements():void {
    if (!this.gameMap) {
      return;
    }
    for (let w = 0; w < this.width; w++) {
      const startElement = this.gameMap[0][w];
      if (startElement.innerElement === null) {
        startElement.innerElement = randomArrayElement(this.elements);
        this.reDrawImage(
          startElement.innerElement.path,
          startElement.innerCoordinates.x,
          startElement.innerCoordinates.y,
          startElement.innerElement.dWidth,
          startElement.innerElement.dHeight,
        );
      }
      const fallBottom = (element:DrawResultType, isEmpty = false) => {
        const activeElement = element;
        let emptyCell = isEmpty;
        const bottomNeighbor = activeElement.neighbors.bottom;
        if (bottomNeighbor && !bottomNeighbor.innerElement && activeElement.innerElement) {
          this.clearRect(activeElement.innerCoordinates.x, activeElement.innerCoordinates.y);
          const temp = JSON.parse(JSON.stringify(bottomNeighbor.innerElement));
          bottomNeighbor.innerElement = element.innerElement;
          activeElement.innerElement = temp;
          if (bottomNeighbor.innerElement) {
            this.reDrawImage(
              bottomNeighbor.innerElement.path,
              bottomNeighbor.innerCoordinates.x,
              bottomNeighbor.innerCoordinates.y,
              bottomNeighbor.innerElement.dWidth,
              bottomNeighbor.innerElement.dHeight,
            );
          }
          emptyCell = false;
        }
        if (
          bottomNeighbor
          // && bottomNeighbor.neighbors.bottom
          // && !bottomNeighbor.neighbors.bottom.innerElement
        ) {
          console.log(11)
          setTimeout(() => {
            emptyCell = true;
            fallBottom(bottomNeighbor, emptyCell);
          }, 80);
        }
        setTimeout(() => {
          if (emptyCell) {
            this.fallElements();
          }
        }, 100);
      };
      setTimeout(() => {
        fallBottom(startElement);
      }, 80);
    }
    this.watcher();
  }

  protected clearCombination(buffer:DrawResultType[]):void {
    buffer.forEach((element) => {
      if (!this.gameMap) {
        return;
      }
      const { x, y } = element.innerCoordinates;
      this.clearRect(x, y);
      const widthIndex = Math.floor(x / this.cellWidth);
      const heightIndex = Math.floor(y / this.cellHeight);
      this.gameMap[heightIndex][widthIndex].innerElement = null;
    });
  }

  /**
   * Деактивация ячейки (убираем бэкграунд)
   */
  protected deactivateElement(element:DrawResultType):void {
    if (element.innerElement) {
      if (!this.ctx) {
        throw new Error('no context init');
      }
      this.ctx.fillStyle = this.cell.background ? this.cell.background : '#FFFFFF';
      const { x, y } = element.innerCoordinates;
      this.fillRect(x, y);
      const {
        path, dWidth, dHeight,
      } = element.innerElement;
      this.reDrawImage(path, x, y, dWidth, dHeight);
    }
  }

  /**
   * Активация ячейки (добавляем бэкграунд под картинку)
   */
  protected activateElement(element:DrawResultType):void {
    if (!this.ctx) {
      throw new Error('no context init');
    }
    const { x, y } = element.innerCoordinates;
    this.ctx.fillStyle = '#cccccc';
    this.fillRect(x, y);
    if (element.innerElement) {
      const {
        path, dWidth, dHeight,
      } = element.innerElement;
      this.reDrawImage(path, x, y, dWidth, dHeight);
    }
  }

  /**
   * Очищаем квадрат по заданным параметрам
   */
  protected clearRect(x:number, y:number):void {
    if (!this.ctx) {
      throw new Error('no context init');
    }
    this.ctx.clearRect(
      x,
      y,
      this.cell.width,
      this.cell.height,
    );
  }

  /**
   * Заполняем цветом квадрат заданных параметров
   */
  protected fillRect(x:number, y:number):void {
    if (!this.ctx) {
      throw new Error('no context init');
    }
    this.ctx.fillRect(
      x,
      y,
      this.cell.width,
      this.cell.height,
    );
  }

  /**
   * Переотрисовка изображения в ячейке
   */
  protected reDrawImage(path:string, x:number, y:number, dWidth:number, dHeight:number):void {
    const dx = x + (this.cell.width - dWidth) / 2;
    const dy = y + (this.cell.height - dHeight) / 2;
    const image = new Image(dWidth, dHeight);
    image.src = path;
    image.onload = () => {
      if (!this.ctx) {
        throw new Error('no context init');
      }
      this.ctx.drawImage(image, dx, dy, dWidth, dHeight);
    };
  }
}
