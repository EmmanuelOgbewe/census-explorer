import { Box, Button, Alert, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import { useState, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import StateSelector from '../filters/StateSelector';
import YearSelector from '../filters/YearSelector';
import MetricSelector from '../filters/MetricSelector';
import CensusDataGrid from '../table/DataGrid';
import useCensusData from '../../hooks/useCensusData';
import {
  CensusFilters,
  FilterValidation,
  Geography,
  CensusVariable,
} from '../../types/census.types';
import { ACS_DATASET } from '../../constants/datasets';

const INITIAL_FILTERS: CensusFilters = {
  state: null,
  years: [],
  metric: null,
};

const validateFilters = (filters: CensusFilters): FilterValidation => {
  const errors: FilterValidation['errors'] = {};

  if (!filters.years.length) errors.years = 'Please select at least one year';
  if (!filters.metric) errors.metric = 'Please select a metric';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const MainContent = () => {
  const theme = useTheme();
  const { rows, columns, response, fetchData, resetData, highlightedFipsCode } =
    useCensusData();
  const [filters, setFilters] = useState<CensusFilters>(INITIAL_FILTERS);
  const [validation, setValidation] = useState<FilterValidation>({
    isValid: true,
    errors: {},
  });

  const handleStateChange = useCallback(
    (state: Geography | null): void => {
      setFilters((prev) => ({ ...prev, state }));
    },
    []
  );

  const handleYearChange = useCallback((years: number[]): void => {
    setFilters((prev) => ({ ...prev, years }));
    setValidation((prev) => ({
      ...prev,
      errors: { ...prev.errors, years: undefined },
    }));
  }, []);

  const handleMetricChange = useCallback(
    (metric: CensusVariable | null): void => {
      setFilters((prev) => ({ ...prev, metric }));
      setValidation((prev) => ({
        ...prev,
        errors: { ...prev.errors, metric: undefined },
      }));
    },
    []
  );

  const handleSearch = useCallback(async (): Promise<void> => {
    const result = validateFilters(filters);
    setValidation(result);

    if (!result.isValid) return;

    await fetchData(
      {
        dataset: ACS_DATASET.id,
        years: filters.years,
        variables: [filters.metric!.id],
        geographyLevel: 'state',
        fipsCode: filters.state?.fipsCode,
      },
      filters.state
    );
  }, [filters, fetchData]);

  const handleClear = useCallback((): void => {
    setFilters(INITIAL_FILTERS);
    setValidation({ isValid: true, errors: {} });
    resetData();
  }, [resetData]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.filterBar(theme)}>
        <Box sx={styles.filters}>
          <StateSelector
            value={filters.state}
            onChange={handleStateChange}
            disabled={response.isLoading}
          />
          <YearSelector
            value={filters.years}
            onChange={handleYearChange}
            disabled={response.isLoading}
          />
          <MetricSelector
            value={filters.metric}
            onChange={handleMetricChange}
            disabled={response.isLoading}
          />
        </Box>

        <Box sx={styles.actions}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            disabled={response.isLoading}
            sx={styles.clearButton(theme)}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={response.isLoading}
            sx={styles.searchButton(theme)}
          >
            {response.isLoading ? 'Loading...' : 'Search'}
          </Button>
        </Box>
      </Box>

      {Object.values(validation.errors).some(Boolean) && (
        <Alert severity="error" sx={styles.alert}>
          {Object.values(validation.errors)
            .filter(Boolean)
            .join(' · ')}
        </Alert>
      )}

      {response.error && (
        <Alert severity="error" sx={styles.alert}>
          {response.error}
        </Alert>
      )}

      <Box sx={styles.tableContainer}>
        <CensusDataGrid
          rows={rows}
          columns={columns}
          isLoading={response.isLoading}
          highlightedFipsCode={highlightedFipsCode}
        />
      </Box>
    </Box>
  );
};

export default MainContent;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: '100%',
  },
  filterBar: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2,
    p: 2,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`,
  }),
  filters: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  clearButton: (theme: Theme) => ({
    borderColor: theme.palette.divider,
    color: theme.palette.text.secondary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  }),
  searchButton: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  alert: {
    borderRadius: 2,
  },
  tableContainer: {
    flexGrow: 1,
  },
};