import { Action } from 'redux';
import { ThemeResponse } from '../../api/types';
import { THEME_LOADED } from '../actions/theme';

export interface ThemeLoadedAction extends Action<typeof THEME_LOADED> {
  payload: ThemeResponse; // css
}

export type ThemeAction = ThemeLoadedAction;

export function themeLoaded(themeCSS: ThemeResponse): ThemeLoadedAction {
  return {
    type: THEME_LOADED,
    payload: themeCSS,
  };
}
