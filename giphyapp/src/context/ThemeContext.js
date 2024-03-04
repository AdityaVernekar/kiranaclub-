// ThemeContext.js
import React, {createContext, useContext, useState} from 'react';

export const THEME_MODE = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const AppColors = {
  dark: {
    primary: '#000',
  },
  light: {
    primary: '#fff',
  },
};
const ThemeContext = createContext();

export const AppThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(THEME_MODE.LIGHT); // Default theme

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
