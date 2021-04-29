import Theme from '../api/theme/theme';

export function getCurrentTheme() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return 'light';
  }
  return localStorage.getItem('currentApplicationTheme') || 'light';
}

export function setCurrentTheme(currentTheme: string) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  localStorage.setItem('currentApplicationTheme', currentTheme);
  Theme.set(currentTheme).catch((err) => {
    console.log('Не удалось установить тему юзер в БД', err);
  });
}
