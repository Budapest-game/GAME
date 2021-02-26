import React, { PureComponent } from 'react';
import Field from '../../core/Field';
import EventBus from '../../core/EventBus';
import { GlobalEvents } from '../../core/GlobalEvents';
import { Elements } from '../../core/levels/1/Elements';
import { Styles } from '../../core/levels/1/Styles';
import './game.css';
import { DrawResultType } from '../../core/CoreTypes';
import { getScore } from '../../utils/getScore';

export class Game extends PureComponent {
  protected refCanvas: React.RefObject<HTMLCanvasElement>;

  protected numberMoves = 25;

  protected score = 0;

  protected scoreMultiplier:Record<number, string> = {
    3: '1',
    4: '1.25',
    5: '1.5',
  };

  protected field:Field|undefined;

  protected gameMap:DrawResultType[][]|undefined;

  protected eventResult:boolean|number = false;

  protected eventBus: EventBus;

  constructor(props: Readonly<unknown>) {
    super(props);
    this.eventBus = new EventBus(true);
    this.refCanvas = React.createRef();
  }

  state = {
    numberMoves: this.numberMoves,
    score: this.score,
    canvasSize: {
      width: 0,
      height: 0,
    },
  }

  componentDidMount() {
    this.eventBus.on(GlobalEvents.CHANGE_GAME_SCORE, this.changeGameScore.bind(this));
    if (this.refCanvas.current) {
      this.field = new Field(
        this.refCanvas.current,
        8,
        6,
        Elements,
        Styles,
      );
      this.gameMap = this.field.drawField();
      this.setState(() => {
        return { canvasSize: this.field?.getCanvasSize() };
      });
    }
  }

  changeGameScore = (data: Record<string, unknown>):void => {
    const { newScore } = data;
    let { score } = this.state;
    score += getScore(newScore as number, this.scoreMultiplier);
    this.setState(() => {
      return { score };
    });
  }

  handleClick = (e:React.SyntheticEvent):void => {
    const { nativeEvent } = e;
    let { numberMoves } = this.state;
    if (this.field && this.gameMap && numberMoves > 0) {
      const result = this.field.initEvent(nativeEvent as MouseEvent, this.gameMap);
      if (result) {
        numberMoves--;
        this.setState(() => {
          return { numberMoves };
        });
      }
    }
    if (numberMoves === 0) {
      const gameField = document.querySelector('.game-map-wrapper__main');
      if (gameField) {
        gameField.classList.add('disabled');
        const finalTitle = gameField.querySelector('h2');
        if (finalTitle) {
          finalTitle.style.display = 'block';
        }
      }
    }
  }

  render() {
    const { numberMoves, score, canvasSize } = this.state;
    const height = {
      height: canvasSize.height,
    };
    return (
            <div id="gameField">
                <h1>Игра</h1>
                <div className="game-map-wrapper">
                  <div className="game-map-wrapper__left-sidebar">
                    <h4>Осталось ходов</h4>
                    <p>{numberMoves}</p>
                    <h4>Счет</h4>
                    <p>{score}</p>
                  </div>
                  <div className="game-map-wrapper__main">
                    <canvas ref={this.refCanvas} onClick={this.handleClick}/>
                    <div className="game-map-wrapper__final" style={ height }>
                      <h2>Игра окончена</h2>
                    </div>
                  </div>
                  <div className="game-map-wrapper__right-sidebar">
                    <h3>x3 <span>- 1</span></h3>
                    <h3>x4 <span>- 1.25</span></h3>
                    <h3>x5 <span>- 1.5</span></h3>
                  </div>
                </div>
            </div>
    );
  }
}
