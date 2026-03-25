import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableChartIcon from '@mui/icons-material/TableChart';
import SearchIcon from '@mui/icons-material/Search';
import { HowToModalProps } from '../../types/census.types';

interface HowToStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}


const HowToModal = ({ open, onClose }: HowToModalProps) => {
  const theme = useTheme();

  const styles = {
    paper: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: 2,
    },
    title: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    divider: {
      borderColor: theme.palette.divider,
    },
    content: {
      pt: 2,
    },
    subtitle: {
      color: theme.palette.text.secondary,
      mb: 3,
      lineHeight: 1.6,
    },
    stepsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2.5,
      mb: 3,
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0.5,
    },
    stepHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    stepNumber: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      flexShrink: 0,
    },
    stepIcon: {
      color: theme.palette.primary.main,
      fontSize: 20,
    },
    stepTitle: {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    stepDescription: {
      color: theme.palette.text.secondary,
      lineHeight: 1.6,
      pl: 4,
    },
    footer: {
      mt: 2,
    },
    footerText: {
      color: theme.palette.text.disabled,
      lineHeight: 1.5,
    },
    actions: {
      px: 3,
      pb: 2,
    },
    closeButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 700,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  };

  const HOW_TO_STEPS: HowToStep[] = [
    {
      icon: <FilterListIcon sx={styles.stepIcon} />,
      title: 'Select Your Filters',
      description:
        'Use the filters at the top of the page to select a state, year, and metric you want to explore. All three filters are required before searching.',
    },
    {
      icon: <SearchIcon sx={styles.stepIcon} />,
      title: 'Run Your Search',
      description:
        'Click the Search button to fetch data from the U.S. Census Bureau API based on your selected filters.',
    },
    {
      icon: <TableChartIcon sx={styles.stepIcon} />,
      title: 'Explore the Results',
      description:
        'Results are displayed in an interactive table below. You can sort by any column, filter within columns, and paginate through results.',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: styles.paper }
      }}
    >
      <DialogTitle sx={styles.title}>
        How to Use Census Explorer
      </DialogTitle>

      <Divider sx={styles.divider} />

      <DialogContent sx={styles.content}>
        <Typography variant="body2" sx={styles.subtitle}>
          Census Explorer lets you query real demographic and economic data
          directly from the U.S. Census Bureau's public API.
        </Typography>

        <Box sx={styles.stepsContainer}>
          {HOW_TO_STEPS.map((step, index) => (
            <Box key={step.title} sx={styles.step}>
              <Box sx={styles.stepHeader}>
                <Box sx={styles.stepNumber}>{index + 1}</Box>
                {step.icon}
                <Typography variant="subtitle2" sx={styles.stepTitle}>
                  {step.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={styles.stepDescription}>
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={styles.divider} />

        <Box sx={styles.footer}>
          <Typography variant="caption" sx={styles.footerText}>
            Data is sourced from the U.S. Census Bureau's American Community
            Survey (ACS) 1-Year Estimates. Coverage is limited to geographies
            with populations of 65,000 or more.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={styles.actions}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={styles.closeButton}
        >
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HowToModal;
