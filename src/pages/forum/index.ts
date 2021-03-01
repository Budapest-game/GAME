import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { fetchForumInfo } from '../../store/actions/forum';
import { Forum } from './forum';

const mapStateToProps = (state: ApplicationState) => {
  return {
    forumInfo: state.forum.forumInfo,
    isLoading: state.forum.isLoading,
  };
};

export default connect(mapStateToProps, { fetchData: fetchForumInfo })(Forum);
