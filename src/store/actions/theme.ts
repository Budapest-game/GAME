import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { themeLoaded } from '../actionCreators/theme';
import Theme from '../../api/theme/theme';

export const THEME_LOADED = 'THEME_LOADED';

export function fetchThemeCSS(themeName: string):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    Theme.get(themeName).then((themeCSS) => {
      dispatch(themeLoaded(themeCSS));
    }).catch((error) => {
      console.log(error);
    });
  };
}
