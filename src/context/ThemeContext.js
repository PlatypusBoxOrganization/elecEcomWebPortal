import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for saved preference
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved theme
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedTheme === 'dark';
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('accentColor') || 'blue';
  });

  useEffect(() => {
    // Update document class and local storage when theme changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    // Update accent color in local storage
    localStorage.setItem('accentColor', accentColor);
    // Remove previous accent color classes
    document.documentElement.classList.remove('accent-blue', 'accent-green', 'accent-purple', 'accent-red');
    // Add new accent color class
    document.documentElement.classList.add(`accent-${accentColor}`);
  }, [accentColor]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const changeAccentColor = (color) => {
    if (['blue', 'green', 'purple', 'red'].includes(color)) {
      setAccentColor(color);
    }
  };

  const theme = {
    darkMode,
    toggleDarkMode,
    accentColor,
    changeAccentColor,
    colors: {
      primary: darkMode ? '#1e293b' : '#ffffff',
      secondary: darkMode ? '#334155' : '#f1f5f9',
      text: darkMode ? '#f1f5f9' : '#1e293b',
      accent: {
        blue: '#3b82f6',
        green: '#22c55e',
        purple: '#a855f7',
        red: '#ef4444'
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
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

// Tailwind CSS classes for theme colors
export const themeColors = {
  primary: {
    light: 'bg-white text-gray-900',
    dark: 'dark:bg-gray-800 dark:text-white'
  },
  secondary: {
    light: 'bg-gray-100 text-gray-800',
    dark: 'dark:bg-gray-700 dark:text-gray-100'
  },
  accent: {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    red: 'text-red-600 dark:text-red-400'
  },
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }
};
