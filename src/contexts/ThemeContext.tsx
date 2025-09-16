
import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeStorage } from '@/lib/safeStorage';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Determine default theme based on system preference
    const systemPrefersDark = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme: Theme = systemPrefersDark ? 'dark' : 'light';
    
    // Use safe localStorage to get theme, with system preference as fallback
    const storedTheme = safeStorage.getItem<Theme>('theme', defaultTheme);
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // Save theme to localStorage if available
      safeStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
