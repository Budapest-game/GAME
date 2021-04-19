import { Action } from 'redux';
import { THEME_LOADED } from '../actions/theme';

export interface ThemeLoadedAction extends Action<typeof THEME_LOADED> {
  payload: string; // css
}

export type ThemeAction = ThemeLoadedAction;

export function themeLoaded(themeCSS: string): ThemeLoadedAction {
  return {
    type: THEME_LOADED,
    payload: themeCSS,
  };
}
