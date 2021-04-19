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
}

export function toggleTheme() {
  if (getCurrentTheme() === 'light') {
    setCurrentTheme('dark');
  } else {
    setCurrentTheme('light');
  }
}
