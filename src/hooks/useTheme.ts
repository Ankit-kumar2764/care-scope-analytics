import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { ThemeMode } from '@/types/healthcare';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>('carescope-theme', 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
}