import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { fetchTopicInfo } from '../../store/actions/topic';
import Topic from './topic';
import './topic.css';

const mapStateToProps = (state: ApplicationState) => {
  return {
    info: state.topic.info,
    isLoading: state.topic.isLoading,
  };
};

export default connect(mapStateToProps, { fetchData: fetchTopicInfo })(Topic);
