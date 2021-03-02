import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import Field from '../../core/Field';
import { Elements } from '../../core/levels/1/Elements';
import { Styles } from '../../core/levels/1/Styles';

const Cls = cn('game-map');

export class Game extends PureComponent {
  protected refCanvas: React.RefObject<HTMLCanvasElement>;

  constructor(props: Readonly<unknown>) {
    super(props);
    this.refCanvas = React.createRef();
  }

  componentDidMount() {
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
                <div className={Cls('wrapper')}>
                  <div className={Cls('wrapper__left-sidebar')}/>
                  <canvas className={Cls('wrapper__main')} ref={this.refCanvas}/>
                  <div className={Cls('wrapper__right-sidebar')}/>
                </div>
            </div>
    );
  }
}
