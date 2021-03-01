import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { register } from '../../store/actions/registration';
import Registration from './registration';

const mapStateToProps = (state: ApplicationState) => {
  return {
    requestSent: state.registration.requestSent,
    requestSuccess: state.registration.requestSuccess,
    errorMessage: state.registration.registrationErrorMessage,
  };
};

export default connect(mapStateToProps, { register })(Registration);
