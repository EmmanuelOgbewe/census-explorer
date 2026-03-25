import { Autocomplete, TextField, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import { ACS_VARIABLES } from '../../constants/datasets';
import { CensusVariable, MetricSelectorProps } from '../../types/census.types';

const MetricSelector = ({ value, onChange, disabled }: MetricSelectorProps) => {
  const theme = useTheme();

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue: CensusVariable | null) => onChange(newValue)}
      options={ACS_VARIABLES}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Metric"
          variant="outlined"
          size="small"
          sx={styles.input(theme)}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <div>
            <div style={{ fontWeight: 600 }}>{option.label}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              {option.description}
            </div>
          </div>
        </li>
      )}
      sx={styles.autocomplete}
    />
  );
};

export default MetricSelector;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  autocomplete: {
    minWidth: 250,
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