import { Router } from 'express';
import ThemeAPI from './theme';

export default function ThemeAPIRoutes(router: Router): void {
  router.get('/theme', ThemeAPI.getUserTheme);
  router.get('/theme/:name', ThemeAPI.getTheme);
  router.post('/theme/:name', ThemeAPI.setThemeForUser);
}
