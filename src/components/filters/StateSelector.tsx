import { Autocomplete, TextField, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import { STATES } from '../../constants/geographies';
import { Geography, StateSelectorProps } from '../../types/census.types';

const StateSelector = ({ value, onChange, disabled }: StateSelectorProps) => {
  const theme = useTheme();

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue: Geography | null) => onChange(newValue)}
      options={STATES}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) =>
        option.fipsCode === value.fipsCode
      }
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label="State"
          variant="outlined"
          size="small"
          sx={styles.input(theme)}
        />
      )}
      sx={styles.autocomplete}
    />
  );
};

export default StateSelector;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  autocomplete: {
    minWidth: 200,
  },
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