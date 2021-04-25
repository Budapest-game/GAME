import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { Game } from './game';
import './game.css';

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.authorisation.user,
    isAuthenticated: state.authorisation.isAuthenticated,
  };
};

export default connect(mapStateToProps, {})(Game);
