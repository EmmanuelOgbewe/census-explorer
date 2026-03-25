import { Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';

const App = () => {
  const theme = useTheme();

  return (
    <Box sx={styles.root(theme)}>
      <Sidebar />
      <Header />
      <Box sx={styles.main(theme)}>
        <Toolbar />
        <MainContent />
      </Box>
    </Box>
  );
};

export default App;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  }),
  main: (theme: Theme) => ({
    flexGrow: 1,
    p: 3,
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  }),
};