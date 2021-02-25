import React, { PureComponent } from 'react';
import Field from '../../core/Field';
import { Elements } from '../../core/levels/1/Elements';
import { Styles } from '../../core/levels/1/Styles';

export class Game extends PureComponent {
  protected refCanvas: React.RefObject<HTMLCanvasElement>;

  constructor(props: Readonly<unknown>) {
    super(props);
    this.refCanvas = React.createRef();
  }

  componentDidMount() {
    // const canvas = document.createElement('canvas');
    // const gameField = document.getElementById('gameField');
    // console.log(this.refCanvas.current)
    if (this.refCanvas.current) {
      const field = new Field(
        this.refCanvas.current,
        8,
        6,
        Elements,
        Styles,
      );
      const map = field.drawField();
      field.initEvent(map);
    }
  }

  render() {
    return (
            <div id="gameField">
                <h1>Игра</h1>
                <div className="game-map-wrapper">
                  <div className="game-map-wrapper__left-sidebar"></div>
                  <canvas className="game-map-wrapper__main" ref={this.refCanvas}/>
                  <div className="game-map-wrapper__right-sidebar"></div>
                </div>
            </div>
    );
  }
}
