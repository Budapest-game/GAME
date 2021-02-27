import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { ForumAction } from '../../store/actionCreators/forum';
import { ApplicationState } from '../../store/reducers';
import { fetchForumInfo } from '../../store/thunks/forum';
import { Forum } from './forum';

const mapStateToProps = (state: ApplicationState) => {
  return {
    forumInfo: state.forum.forumInfo,
    isLoading: state.forum.isLoading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ApplicationState, unknown, ForumAction>) => {
  return {
    fetchData: (/* url: string */) => {
      dispatch(fetchForumInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);
