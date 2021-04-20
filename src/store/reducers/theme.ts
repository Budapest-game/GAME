import { THEME_LOADED } from '../actions/theme';
import { ThemeAction } from '../actionCreators/theme';

const defaultThemeState = '';

export function themeReducer(
  state: string = defaultThemeState,
  action: ThemeAction,
): string {
  switch (action.type) {
    case THEME_LOADED:
      return action.payload;

    default:
      return state;
  }
}
