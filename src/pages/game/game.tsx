import React, { PureComponent } from 'react';
import { withNaming } from '@bem-react/classname';
import Field from '../../core/Field';
import { eventBus } from '../../core/EventBus';
import { GlobalEvents } from '../../core/GlobalEvents';
import { Elements } from '../../core/levels/1/Elements';
import { Styles } from '../../core/levels/1/Styles';
import { DrawResultType } from '../../core/CoreTypes';
import { getScore } from '../../utils/getScore';
import { Button } from '../../components/button/button';
import Leaderboard from '../../api/leaderboard/leaderboard';
import { WakeLockToggler } from '../../components/wakeLockToggler/wakeLockToggler';

interface GameProps{
  user: Express.UserInfo | undefined,
  isAuthenticated: boolean;
}

export class Game extends PureComponent<GameProps> {
  protected refCanvas: React.RefObject<HTMLCanvasElement>;

  protected numberMoves = 20;

  protected score = 0;

  protected scoreMultiplier:Record<number, string> = {
    3: '1',
    4: '1.25',
    5: '1.5',
  };

  protected field:Field|undefined;

  protected gameMap:DrawResultType[][]|undefined;

  protected eventResult:boolean|number = false;

  constructor(props: GameProps) {
    super(props);
    this.refCanvas = React.createRef();
  }

  state = {
    numberMoves: this.numberMoves,
    score: this.score,
    gameFieldDisabled: false,
    fullscreenButtonText: 'На весь экран',
    canvasSize: {
      width: 0,
      height: 0,
    },
  }

  componentDidMount() {
    eventBus.on(GlobalEvents.CHANGE_GAME_SCORE, this.changeGameScore.bind(this));
    if (this.refCanvas.current) {
      this.field = new Field(
        this.refCanvas.current,
        8,
        6,
        Elements,
        Styles,
      );
      this.gameMap = this.field.drawField();
      this.setState({ canvasSize: this.field?.getCanvasSize() });
    }
  }

  componentWillUnmount() {
    eventBus.completeOff(GlobalEvents.CHANGE_GAME_SCORE);
  }

  changeGameScore = (data: Record<string, unknown>):void => {
    const { newScore } = data;
    let { score } = this.state;
    score += getScore(newScore as number, this.scoreMultiplier);
    this.setState({ score });
  }

  toggleFullscreen = ():void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.setState({ fullscreenButtonText: 'Свернуть экран' });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      this.setState({ fullscreenButtonText: 'На весь экран' });
    }
  }

  handleClick = (e:React.SyntheticEvent<HTMLCanvasElement, MouseEvent>):void => {
    const { nativeEvent } = e;
    let { numberMoves, gameFieldDisabled } = this.state;
    if (this.field && this.gameMap && numberMoves > 0) {
      const result = this.field.initEvent(nativeEvent, this.gameMap);
      if (result) {
        numberMoves--;
        this.setState({ numberMoves });
      }
    }
    if (numberMoves === 0) {
      gameFieldDisabled = !gameFieldDisabled;
      this.setState({ gameFieldDisabled });
      this.pushStatsToLeaderboard();
    }
  }

  pushStatsToLeaderboard = ():void => {
    const { user, isAuthenticated } = this.props;
    if (isAuthenticated && user) {
      Leaderboard.addLeader({
        id: user.id,
        name: user.first_name,
        budapestScore: this.state.score,
        avatar: user.avatar,
      }).catch((err) => {
        console.log('Неполучилось добавить пользователя в лидерборд ', err);
      });
    }
  }

  render() {
    const {
      numberMoves, score, canvasSize, gameFieldDisabled, fullscreenButtonText,
    } = this.state;
    const height = {
      height: canvasSize.height,
    };
    const cn = withNaming({ e: '__' });
    const cls = cn('game-map-wrapper');
    return (
        <div id="gameField">
            <h1>Игра</h1>
            <div className={cls()}>
              <div className={cls('left-sidebar')}>
                <h4>Осталось ходов</h4>
                <p>{numberMoves}</p>
                <h4>Счет</h4>
                <p>{score}</p>
              </div>
              <div className={cls('main')} aria-disabled={gameFieldDisabled}>
                <canvas ref={this.refCanvas} onClick={this.handleClick}/>
                <div className={cls('final')} style={ height }>
                  <h2>Игра окончена</h2>
                </div>
              </div>
              <div className={cls('right-sidebar')}>
                <h3>x3 <span>- 1</span></h3>
                <h3>x4 <span>- 1.25</span></h3>
                <h3>x5 <span>- 1.5</span></h3>
                <Button
                  className={cls('btn-fullscreen')}
                  type='button'
                  text={fullscreenButtonText}
                  onClick={this.toggleFullscreen}
                />
                <WakeLockToggler />
              </div>
            </div>
        </div>
    );
  }
}
