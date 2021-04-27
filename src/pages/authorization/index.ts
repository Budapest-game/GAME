import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import Authorization from './authorization';
import './authorization.css';

const mapStateToProps = (state: ApplicationState) => {
  return {
    errorMessage: state.authorisation.errorMessage,
    isAuthenticated: state.authorisation.isAuthenticated,
  };
};

export default connect(mapStateToProps, {})(Authorization);
