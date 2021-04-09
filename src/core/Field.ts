import Cell from './Cell';
import {
  InnerElementType, StyleTypes, DrawResultType,
} from './CoreTypes';
import CombinationWatcher from './CombinationWatcher';
import Animation from './Animation';
import { randomArrayElement } from '../utils/randomArrayElement';
import { findElementIndexByType } from '../utils/findElementIndexByType';
import {
  drawImage, clearRect, fillRect,
} from '../utils/drawImage';
import { switchInnerElements } from '../utils/switchInnerElements';

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

  protected watcher: CombinationWatcher|undefined;

  protected animateGenerator: Animation|undefined;

  constructor(
    canvas:HTMLCanvasElement,
    width:number,
    height:number,
    elements:InnerElementType[],
    style:StyleTypes,
  ) {
    this.width = width;
    this.height = height;
    this.elements = elements;
    this.fieldStyle = style;

    this.canvas = canvas;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      throw new Error('no context init');
    }
    this.cell = new Cell(this.fieldStyle, this.ctx);
    const { sellWidth, cellHeight } = this.cell.getFullSize();
    this.canvas.width = sellWidth * this.width;
    this.canvas.height = cellHeight * this.height;
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
    if (!this.cell || !this.ctx) {
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
    this.watcher = new CombinationWatcher(gameMap, this.ctx, this.cell, this.width, this.height);
    this.animateGenerator = new Animation(
      gameMap,
      this.ctx,
      this.cell,
      this.watcher,
      this.elements,
    );
    return gameMap;
  }

  public getCanvasSize():Record<string, number> {
    const { sellWidth, cellHeight } = this.cell.getFullSize();
    return {
      width: sellWidth * this.width,
      height: cellHeight * this.height,
    };
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
   */
  public initEvent(event: MouseEvent, gameMap: DrawResultType[][]):boolean|number {
    this.gameMap = gameMap;
    if (!this.cellWidth || !this.cellHeight) {
      throw new Error('no field init');
    }
    let isCombinate = false;
    const { offsetX, offsetY } = event;
    const widthIndex = Math.floor(offsetX / this.cellWidth);
    const heightIndex = Math.floor(offsetY / this.cellHeight);
    if (widthIndex < this.width && heightIndex < this.height) {
      if (!this.gameMap) {
        throw new Error('no gameMap');
      }
      const clickElement = this.gameMap[heightIndex][widthIndex];
      if (this.activeElement) {
        const { x, y } = this.activeElement.innerCoordinates;
        const activeWidthIndex = Math.floor(x / this.cellWidth);
        const activeHeightIndex = Math.floor(y / this.cellHeight);
        const activeElement = this.gameMap[activeHeightIndex][activeWidthIndex];
        if (
          (
            (widthIndex - 1 === activeWidthIndex || widthIndex + 1 === activeWidthIndex)
          && heightIndex === activeHeightIndex
          )
          || (
            (heightIndex - 1 === activeHeightIndex || heightIndex + 1 === activeHeightIndex)
          && widthIndex === activeWidthIndex
          )
        ) {
          this.switchElementDraws(
            activeElement,
            clickElement,
          );
          switchInnerElements(
            activeElement,
            clickElement,
          );
          isCombinate = true;
          if (
            this.watcher
            && !this.watcher.checkCombination()
            && this.activeElement
            && this.gameMap
          ) {
            this.switchElementDraws(
              clickElement,
              activeElement,
            );
            switchInnerElements(
              activeElement,
              clickElement,
            );
            isCombinate = false;
          }
          if (this.animateGenerator) {
            this.animateGenerator.updateGameField();
          }
          this.activeElement = null;
          return isCombinate;
        }
        this.deactivateElement(activeElement);
        this.activateElement(clickElement);
        this.activeElement = clickElement;
      } else {
        this.activateElement(clickElement);
        this.activeElement = clickElement;
      }
    }
    return isCombinate;
  }

  /**
   * Алгоритм перестановки элементов
   */
  protected switchElementDraws(activeElement:DrawResultType, clickElement:DrawResultType):void {
    if (!activeElement.innerElement || !this.ctx) {
      return;
    }
    clearRect(
      this.ctx,
      this.cell,
      clickElement.innerCoordinates.x,
      clickElement.innerCoordinates.y,
    );
    drawImage(
      this.ctx,
      this.cell.images[activeElement.innerElement.type],
      clickElement.innerCoordinates.x + (this.cell.width - activeElement.innerElement.dWidth) / 2,
      clickElement.innerCoordinates.y + (this.cell.height - activeElement.innerElement.dHeight) / 2,
      activeElement.innerElement.dWidth,
      activeElement.innerElement.dHeight,
    );

    if (!clickElement.innerElement) {
      return;
    }
    clearRect(
      this.ctx,
      this.cell,
      activeElement.innerCoordinates.x,
      activeElement.innerCoordinates.y,
    );
    drawImage(
      this.ctx,
      this.cell.images[clickElement.innerElement.type],
      activeElement.innerCoordinates.x + (this.cell.width - clickElement.innerElement.dWidth) / 2,
      activeElement.innerCoordinates.y + (this.cell.height - clickElement.innerElement.dHeight) / 2,
      clickElement.innerElement.dWidth,
      clickElement.innerElement.dHeight,
    );
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
      fillRect(this.ctx, this.cell, x, y);
      const { type, dWidth, dHeight } = element.innerElement;
      drawImage(
        this.ctx,
        this.cell.images[type],
        x + (this.cell.width - dWidth) / 2,
        y + (this.cell.height - dHeight) / 2,
        dWidth,
        dHeight,
      );
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
    fillRect(this.ctx, this.cell, x, y);
    if (element.innerElement) {
      const { type, dWidth, dHeight } = element.innerElement;
      drawImage(
        this.ctx,
        this.cell.images[type],
        x + (this.cell.width - dWidth) / 2,
        y + (this.cell.height - dHeight) / 2,
        dWidth,
        dHeight,
      );
    }
  }
}
