import React, { createContext, useState, useCallback, useMemo, useContext, useEffect } from 'react';

import { getCustomCookie, setCustomCookie } from '../utils/cookies';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { dark } from '../themes/dark';
import { GlobalStyles } from '../themes/globalStyles';
import { light } from '../themes/light';

interface ThemeContextProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as ThemeContextProps);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      const newThemeName = oldThemeName === 'light' ? 'dark' : 'light';
      setCustomCookie('APP_THEME_NAME', newThemeName, { maxAge: 60 * 60 * 24 * 365, path: '/' });

      return newThemeName;
    });
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return light;

    return dark;
  }, [themeName]);

  useEffect(() => {
    if (getCustomCookie('APP_THEME_NAME') === 'dark') {
      setThemeName('dark');
    } else {
      setThemeName('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <CssBaseline />
      <GlobalStyles />

      <ThemeProvider theme={theme}>
        <Box component="main" flex={1} display="flex" flexDirection="column" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
