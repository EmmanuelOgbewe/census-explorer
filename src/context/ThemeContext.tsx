import {
  useState,
  useMemo,
  useCallback,
} from 'react';
import { ThemeProvider, CssBaseline, PaletteMode } from '@mui/material';
import { getTheme } from '../theme';
import { ThemeContext, ThemeContextType } from './useThemeContext';

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleTheme = useCallback((): void => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const value = useMemo<ThemeContextType>(
    () => ({ mode, toggleTheme }),
    [mode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;