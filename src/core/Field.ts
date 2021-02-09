import Cell from './Cell';
import { InnerElementType, StyleTypes, ResultType } from './CoreTypes';

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

  protected gameMap: ResultType[][]|undefined;

  public activeElement: ResultType|null;

  protected cell: Cell;

  constructor(
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

    this.canvas = document.createElement('canvas');
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
  public drawField():Promise<ResultType[][]> {
    if (!this.cell) {
      throw new Error('no cell init');
    }
    // результирующий массив игрового поля
    const gameMap:ResultType[][] = [];
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
        const element = this.checkElementPosition(gameMap, heightIndex, widthIndex);
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
      }
    }
    // В случае длительной генерации поля возвращаем Промис
    return Promise.resolve(gameMap);
  }

  /**
   * Метод возвращает случайный элемент массива
   * @param array
   * @protected
   */
  protected randomArrayElement(array:InnerElementType[]):InnerElementType {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Алгоритм проверки содержатся ли аналогичные элементы в количестве
   * двух штук справа или сверху от целевой ячейки
   * @param gameMap
   * @param heightIndex
   * @param widthIndex
   * @protected
   */
  protected checkElementPosition(
    gameMap:ResultType[][],
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
        elements.splice(this.findElementIndexByType(element1.innerElement.type, elements), 1);
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
        elements.splice(this.findElementIndexByType(element1.innerElement.type, elements), 1);
      }
    }
    return this.randomArrayElement(elements);
  }

  /**
   * Метод возвращает индекс массива внутренний игровых элементов
   * @param type
   * @param elements
   * @protected
   */
  protected findElementIndexByType(type:string, elements:InnerElementType[]):number {
    let index = 0;
    elements.forEach((element, key) => {
      if (element.type === type) {
        index = key;
      }
    });
    return index;
  }

  /**
   * Инициализация событий
   * Тут же условия для срабатывания перестановки элементов
   * Надо придумать как не допускать перестановки элементов по диагонали
   * @param gameMap
   */
  public initEvent(gameMap:ResultType[][]):void {
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
            widthIndex - 1 === activeWidthIndex
            || widthIndex + 1 === activeWidthIndex
            || heightIndex - 1 === activeHeightIndex
            || heightIndex + 1 === activeHeightIndex
          ) {
            this.switchElements(this.activeElement, this.gameMap[heightIndex][widthIndex]);
            const element = Object.assign({}, this.activeElement.innerElement);
            this.gameMap[activeHeightIndex][activeWidthIndex].innerElement = this.gameMap[heightIndex][widthIndex].innerElement;
            this.gameMap[heightIndex][widthIndex].innerElement = element;
            this.activeElement = null;
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

  /**
   * Алгоритм перестановки элементов
   * @param activeElement
   * @param clickElement
   * @protected
   */
  protected switchElements(activeElement:ResultType, clickElement:ResultType):void {
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

  /**
   * Деактивация ячейки (убираем бэкграунд)
   * @param element
   * @protected
   */
  protected deactivateElement(element:ResultType):void {
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
   * @param element
   * @protected
   */
  protected activateElement(element:ResultType):void {
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
   * @param x
   * @param y
   * @protected
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
   * @param x
   * @param y
   * @protected
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
   * @param path
   * @param x
   * @param y
   * @param dWidth
   * @param dHeight
   * @protected
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
