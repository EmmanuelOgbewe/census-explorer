import { Autocomplete, TextField, Theme, Chip } from '@mui/material';
import { useTheme } from '@mui/material';
import { AVAILABLE_YEARS } from '../../constants/years';
import { YearSelectorProps } from '../../types/census.types';

const YearSelector = ({ value, onChange, disabled }: YearSelectorProps) => {
  const theme = useTheme();

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(_, newValue: number[]) => onChange(newValue)}
      options={AVAILABLE_YEARS}
      getOptionLabel={(option) => option.toString()}
      isOptionEqualToValue={(option, val) => option === val}
      disabled={disabled}
      renderValue={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            label={option.toString()}
            size="small"
            {...getTagProps({ index })}
            sx={styles.chip(theme)}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Years"
          variant="outlined"
          size="small"
          sx={styles.input(theme)}
        />
      )}
      sx={styles.autocomplete}
    />
  );
};

export default YearSelector;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  autocomplete: {
    minWidth: 200,
  },
  chip: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '0.7rem',
  }),
  input: (theme: Theme) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
    },
  }),
};