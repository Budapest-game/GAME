import {
  CoordinatesType, PaddingType, InnerElementType, StyleTypes, DrawResultType,
} from './CoreTypes';

export default class Cell {
  public width: number;

  public height: number;

  protected coordinates: CoordinatesType | undefined;

  protected padding: PaddingType = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  protected borderWidth: number|undefined;

  protected borderColor: string|undefined;

  public background: string|undefined;

  protected paddingBackground: string|undefined;

  protected innerElement: InnerElementType | null;

  protected ctx: CanvasRenderingContext2D;

  public constructor(styles:StyleTypes, ctx:CanvasRenderingContext2D) {
    this.width = styles.width;
    this.height = styles.height;
    if (styles.padding) {
      this.setPadding(styles.padding);
    }
    this.borderWidth = styles.borderWidth;
    this.borderColor = styles.borderColor;
    this.background = styles.background;
    this.paddingBackground = styles.paddingBackground;
    this.ctx = ctx;
    this.innerElement = null;
  }

  public getFullSize():Record<string, number> {
    return {
      sellWidth: this.width
        + (this.padding.left ? this.padding.left : 0)
        + (this.padding.right ? this.padding.right : 0)
        + (this.borderWidth ? (this.borderWidth * 2) : 0),
      cellHeight: this.height
        + this.padding.top
        + (this.padding.bottom ? this.padding.bottom : 0)
        + (this.borderWidth ? (this.borderWidth * 2) : 0),
    };
  }

  public setCoordinates(x:number, y:number):void {
    this.coordinates = {
      x,
      y,
    };
  }

  public setInnerElement(element:InnerElementType):void {
    this.innerElement = element;
  }

  public removeInnerElement():void {
    this.innerElement = null;
  }

  public setPadding(padding: PaddingType):void {
    const {
      top, right, bottom, left,
    } = padding;
    this.padding.top = top;
    const { length } = Object.keys(padding);
    if (length === 1) {
      this.padding.right = top;
      this.padding.bottom = top;
      this.padding.left = top;
    } else if (length === 2) {
      this.padding.right = right;
      this.padding.bottom = top;
      this.padding.left = right;
    } else if (length === 3) {
      throw new Error('expected 1 or 2 or 4 arguments, but get 3');
    } else {
      this.padding.right = right;
      this.padding.bottom = bottom;
      this.padding.left = left;
    }
  }

  public setBorderWidth(width:number):void {
    this.borderWidth = width;
  }

  public setBorderColor(color:string):void {
    this.borderColor = color;
  }

  public setBackground(color:string):void {
    this.background = color;
  }

  public setPaddingBackground(color:string):void {
    this.paddingBackground = color;
  }

  public drawCell(isEmpty = false):DrawResultType {
    if (!this.coordinates) {
      throw new Error('coordinates is empty');
    }
    // Описываем внешний квадрат, учитывая отступы
    this.ctx.fillStyle = this.paddingBackground ? this.paddingBackground : '#FFFFFF';
    const { sellWidth, cellHeight } = this.getFullSize();
    const { x, y } = this.coordinates;
    this.ctx.fillRect(x, y, sellWidth, cellHeight);

    // Для удобства записываем координаты следующего слоя, без отступов, если они есть
    const borderX = x + (this.padding.left ? this.padding.left : 0);
    const borderY = y + this.padding.top;
    if (this.borderWidth) {
      // Очищаем и снова заливаем следующий слой, относящийся к рамке
      this.ctx.fillStyle = this.borderColor ? this.borderColor : '#FFFFFF';
      const widthBorder = this.width + (this.borderWidth * 2);
      const heightBorder = this.height + (this.borderWidth * 2);
      this.ctx.clearRect(
        borderX,
        borderY,
        widthBorder,
        heightBorder,
      );
      this.ctx.fillRect(
        borderX,
        borderY,
        widthBorder,
        heightBorder,
      );
    }

    // Очищаем и заливаем последний слой - внутреннее пространство ячейки
    this.ctx.fillStyle = this.background ? this.background : '#FFFFFF';
    const innerX = borderX + (this.borderWidth ? this.borderWidth : 0);
    const innerY = borderY + (this.borderWidth ? this.borderWidth : 0);
    this.ctx.clearRect(
      innerX,
      innerY,
      this.width,
      this.height,
    );
    this.ctx.fillRect(
      innerX,
      innerY,
      this.width,
      this.height,
    );

    // Если есть картинка, вставляем ее
    if (this.innerElement && !isEmpty) {
      const { path, dWidth, dHeight } = this.innerElement;
      if (dWidth > this.width || dHeight > this.height) {
        throw new Error('Inner image is larger than cell');
      }
      const dx = innerX + (this.width - dWidth) / 2;
      const dy = innerY + (this.height - dHeight) / 2;
      const image = new Image(dWidth, dHeight);
      image.src = path;
      image.onload = () => {
        this.ctx.drawImage(image, dx, dy, dWidth, dHeight);
      };
    }
    return {
      innerElement: this.innerElement,
      innerCoordinates: {
        x: innerX,
        y: innerY,
      },
      outerCoordinates: {
        x,
        y,
      },
      neighbors: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
    };
  }
}
