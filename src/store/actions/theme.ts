import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../reducers';
import { themeLoaded } from '../actionCreators/theme';
import { anthraciteCSS } from './theme-anthracite';

export const THEME_LOADED = 'THEME_LOADED';

export function fetchThemeCSS(themeName: string):
ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch: Dispatch) => {
    if (themeName !== 'dark') {
      dispatch(themeLoaded(''));
      return;
    }

    // fetch CSS from server

    setTimeout(() => {
      dispatch(themeLoaded(anthraciteCSS));
    }, 50);
  };
}
