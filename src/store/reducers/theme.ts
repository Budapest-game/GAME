import { THEME_LOADED } from '../actions/theme';
import { ThemeAction } from '../actionCreators/theme';
import { ThemeResponse } from '../../api/types';

const defaultThemeState = { id: 'light', theme: '' };

export function themeReducer(
  state: ThemeResponse = defaultThemeState,
  action: ThemeAction,
): ThemeResponse {
  switch (action.type) {
    case THEME_LOADED:
      return action.payload;

    default:
      return state;
  }
}
