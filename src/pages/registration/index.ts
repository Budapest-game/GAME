import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RegistrationAction } from '../../store/actionCreators/registration';
import { ApplicationState } from '../../store/reducers';
import { register } from '../../store/thunks/registration';
import Registration from './registration';
import { RegistrationData } from '../../api/types';

const mapStateToProps = (state: ApplicationState) => {
  return {
    requestSent: state.registration.requestSent,
    requestSuccess: state.registration.requestSuccess,
    errorMessage: state.registration.registrationErrorMessage,
  };
};

const mapDispatchToProps = (dispatch
  : ThunkDispatch<ApplicationState, unknown, RegistrationAction>) => {
  return {
    register: (data: RegistrationData) => {
      dispatch(register(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
