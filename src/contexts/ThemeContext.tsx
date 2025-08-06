import React, { createContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { value: Theme; label: string; colors: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

const themes = [
  { value: 'light' as Theme, label: 'Light', colors: 'bg-white text-gray-900' },
  { value: 'dark' as Theme, label: 'Dark', colors: 'bg-gray-900 text-white' },
  { value: 'blue' as Theme, label: 'Blue', colors: 'bg-blue-50 text-blue-900' },
  { value: 'green' as Theme, label: 'Green', colors: 'bg-green-50 text-green-900' },
  { value: 'purple' as Theme, label: 'Purple', colors: 'bg-purple-50 text-purple-900' },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themes.find(t => t.value === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
    
    // Apply theme-specific CSS custom properties
    const root = document.documentElement;
    
    switch (theme) {
      case 'dark':
        root.style.setProperty('--background', '0 0% 3.9%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--primary', '0 0% 98%');
        root.style.setProperty('--primary-foreground', '0 0% 9%');
        break;
      case 'blue':
        root.style.setProperty('--background', '214 100% 97%');
        root.style.setProperty('--foreground', '214 100% 15%');
        root.style.setProperty('--primary', '214 100% 50%');
        root.style.setProperty('--primary-foreground', '214 100% 98%');
        break;
      case 'green':
        root.style.setProperty('--background', '120 60% 97%');
        root.style.setProperty('--foreground', '120 60% 15%');
        root.style.setProperty('--primary', '120 60% 50%');
        root.style.setProperty('--primary-foreground', '120 60% 98%');
        break;
      case 'purple':
        root.style.setProperty('--background', '270 60% 97%');
        root.style.setProperty('--foreground', '270 60% 15%');
        root.style.setProperty('--primary', '270 60% 50%');
        root.style.setProperty('--primary-foreground', '270 60% 98%');
        break;
      default: // light
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 3.9%');
        root.style.setProperty('--primary', '0 0% 9%');
        root.style.setProperty('--primary-foreground', '0 0% 98%');
        break;
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themes,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
