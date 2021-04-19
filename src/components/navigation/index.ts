import { connect } from 'react-redux';
import { fetchThemeCSS } from '../../store/actions/theme';
import Navigation from './navigation';

export default connect(null, { fetchCSS: fetchThemeCSS })(Navigation);
