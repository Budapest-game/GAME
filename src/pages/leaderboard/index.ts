import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { fetchLeaderboardInfo } from '../../store/actions/leaderboard';
import { Leaderboard } from './leaderboard';

const mapStateToProps = (state: ApplicationState) => {
  return {
    leaderboardInfo: state.leaderboard.leaderboardInfo,
    leaderboardIsLoading: state.leaderboard.leaderboardIsLoading,
  };
};

export default connect(mapStateToProps, { fetchData: fetchLeaderboardInfo })(Leaderboard);
