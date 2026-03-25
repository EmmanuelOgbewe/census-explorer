import { createTheme, Theme, PaletteMode } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

declare module '@mui/material/styles' {
  interface Palette {
    sidebar: {
      background: string;
      text: string;
      accent: string;
      divider: string;
      hover: string;
    };
  }
  interface PaletteOptions {
    sidebar?: {
      background?: string;
      text?: string;
      accent?: string;
      divider?: string;
      hover?: string;
    };
  }
}

const ACCENT_COLOR = '#4fc3f7';

const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: ACCENT_COLOR,
    contrastText: '#1a1a2e',
  },
  secondary: {
    main: '#7c83fd',
  },
  background: {
    default: '#0f0f1a',
    paper: '#1a1a2e',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255,255,255,0.7)',
    disabled: 'rgba(255,255,255,0.5)',
  },
  divider: 'rgba(255,255,255,0.1)',
  error: {
    main: '#f44336',
  },
  success: {
    main: '#66bb6a',
  },
  sidebar: {
    background: '#1a1a2e',
    text: '#ffffff',
    accent: ACCENT_COLOR,
    divider: 'rgba(255,255,255,0.1)',
    hover: 'rgba(79, 195, 247, 0.1)',
  },
};

const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: {
    main: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#7c83fd',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: '#1a1a2e',
    secondary: 'rgba(0,0,0,0.6)',
    disabled: 'rgba(0,0,0,0.38)',
  },
  divider: 'rgba(0,0,0,0.1)',
  error: {
    main: '#f44336',
  },
  success: {
    main: '#66bb6a',
  },
  sidebar: {
    background: '#1565c0',
    text: '#ffffff',
    accent: '#4fc3f7',
    divider: 'rgba(255,255,255,0.1)',
    hover: 'rgba(255,255,255,0.1)',
  },
};

const getTheme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 20px',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
    },
  });

export default getTheme;