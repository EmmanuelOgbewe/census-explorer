import { AppBar, Box, IconButton, Toolbar, Typography, Theme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material';
import { useThemeContext } from '../../context/useThemeContext';

const DRAWER_COLLAPSED_WIDTH = 64;

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AppBar position="fixed" elevation={0} sx={styles.appBar(theme)}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" sx={styles.title(theme)}>
          Census Explorer
        </Typography>
        <Box sx={styles.actions}>
          <IconButton
            onClick={toggleTheme}
            aria-label="toggle theme"
            sx={styles.iconButton(theme)}
          >
            {mode === 'dark' ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  appBar: (theme: Theme) => ({
    width: `calc(100% - ${DRAWER_COLLAPSED_WIDTH}px)`,
    ml: `${DRAWER_COLLAPSED_WIDTH}px`,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer - 1,
  }),
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: (theme: Theme) => ({
    fontWeight: 700,
    color: theme.palette.primary.main,
    letterSpacing: 1,
  }),
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  iconButton: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  }),
};