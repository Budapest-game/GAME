import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { fetchThemeCSS } from '../../store/actions/theme';
import App from './app';

const mapStateToProps = (state: ApplicationState) => {
  return {
    themeCSS: state.theme,
  };
};

export default connect(mapStateToProps, { fetchCSS: fetchThemeCSS })(App);
