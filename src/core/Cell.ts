type InnerElementType = {
  path:string,
  dWidth:number,
  dHeight:number,
}

type PaddingType = {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

export default class Cell {
  public width:number;

  public height:number;

  protected coordinates: Record<string, number> | undefined;

  protected padding: PaddingType;

  protected borderWidth:number|undefined;

  protected borderColor:string|undefined;

  protected background:string|undefined;

  protected paddingBackground:string|undefined;

  protected innerElement:InnerElementType | undefined;

  protected ctx:CanvasRenderingContext2D;

  public constructor(width:number, height:number, ctx:CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.padding = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  }

  public getFullSize():Record<string, number> {
    return {
      width: this.width
        + this.padding.left
        + this.padding.right
        + (this.borderWidth ? (this.borderWidth * 2) : 0),
      height: this.height
        + this.padding.top
        + this.padding.bottom
        + (this.borderWidth ? (this.borderWidth * 2) : 0),
    };
  }

  public setCoordinates(x:number, y:number):void {
    this.coordinates = {
      x,
      y,
    };
  }

  public setInnerElement(path:string, width:number, height:number):void {
    this.innerElement = {
      path,
      dWidth: width,
      dHeight: height,
    };
  }

  public setPadding(...args:number[]):void {
    this.padding.top = args[0];
    if (args.length === 1) {
      this.padding.right = args[0];
      this.padding.bottom = args[0];
      this.padding.left = args[0];
    } else if (args.length === 2) {
      this.padding.right = args[1];
      this.padding.bottom = args[0];
      this.padding.left = args[1];
    } else if (args.length === 3) {
      throw new Error('expected 1 or 2 or 4 arguments, but get 3');
    } else {
      this.padding.right = args[1];
      this.padding.bottom = args[2];
      this.padding.left = args[3];
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

  public drawCell():void {
    if (!this.coordinates) {
      throw new Error('coordinates is empty');
    }
    // Описываем внешний квадрат, учитывая отступы
    this.ctx.strokeStyle = this.paddingBackground ? this.paddingBackground : '#FFFFFF';
    this.ctx.fillStyle = this.paddingBackground ? this.paddingBackground : '#FFFFFF';
    const { width, height } = this.getFullSize();
    const { x, y } = this.coordinates;
    this.ctx.fillRect(x, y, width, height);

    // Для удобства записываем координаты следующего слоя, без отступов, если они есть
    const borderX = x + this.padding.left;
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
    if (this.innerElement) {
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
  }
}
