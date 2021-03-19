import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { fetchLeaderboardInfo } from '../../store/actions/leaderboard';
import { Leaderboard } from './leaderboard';
import './leaderboard.css';

const mapStateToProps = (state: ApplicationState) => {
  return {
    info: state.leaderboard.info,
    isLoading: state.leaderboard.isLoading,
  };
};

export default connect(mapStateToProps, { fetchData: fetchLeaderboardInfo })(Leaderboard);
