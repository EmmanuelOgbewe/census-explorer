import { useState, useCallback } from 'react';
import { CensusService } from '../services/census.service';
import {
  MultiYearQueryParams,
  CensusDataRow,
  ApiResponse,
  TableColumn,
  UseCensusDataReturn,
  Geography,
  CensusVariable,
} from '../types/census.types';
import { ACS_VARIABLES } from '../constants/datasets';

/**
 * Builds columns for single year view
 * NAME column fixed width, metric column flex
 */
const buildSingleYearColumns = (
  row: CensusDataRow,
  metric: CensusVariable
): TableColumn[] => {
  return Object.keys(row)
    .filter((key) => key !== '_year' && key !== 'state')
    .map((key) => {
      const variable = ACS_VARIABLES.find((v) => v.id === key);
      return {
        field: key,
        headerName: variable?.label ?? metric.label,
        sortable: true,
        filterable: true,
        ...(key === 'NAME' ? { width: 200 } : { flex: 1 }),
      };
    });
};

/**
 * Builds columns for multi year view
 * NAME column fixed, one column per year
 */
const buildMultiYearColumns = (
  years: number[],
  metric: CensusVariable
): TableColumn[] => {
  const nameColumn: TableColumn = {
    field: 'NAME',
    headerName: 'State',
    width: 200,
    sortable: true,
    filterable: true,
  };

  const yearColumns: TableColumn[] = years.map((year) => ({
    field: `${metric.id}_${year}`,
    headerName: `${metric.label} (${year})`,
    flex: 1,
    sortable: true,
    filterable: true,
  }));

  return [nameColumn, ...yearColumns];
};

/**
 * Pivots multi year flat data into one row per state
 * with a column per year
 * e.g. { NAME: 'Alabama', B19013_001E_2021: '52000', B19013_001E_2022: '55000' }
 */
const pivotMultiYearData = (
  data: CensusDataRow[],
  metricId: string,
): CensusDataRow[] => {
  const stateMap = new Map<string, CensusDataRow>();

  data.forEach((row) => {
    const stateName = row['NAME'];
    const year = row['_year'];
    const fipsCode = row['state'];

    if (!stateMap.has(stateName)) {
      stateMap.set(stateName, { NAME: stateName, state: fipsCode });
    }

    const existing = stateMap.get(stateName)!;
    existing[`${metricId}_${year}`] = row[metricId];
  });

  return Array.from(stateMap.values());
};

const buildRows = (
  data: CensusDataRow[]
): (CensusDataRow & { id: string })[] => {
  return data.map((row, index) => ({
    ...row,
    id: `${row['state'] ?? index}-${index}`,
  }));
};

const INITIAL_RESPONSE: ApiResponse<CensusDataRow[]> = {
  data: null,
  error: null,
  isLoading: false,
};

const useCensusData = (): UseCensusDataReturn => {
  const [response, setResponse] =
    useState<ApiResponse<CensusDataRow[]>>(INITIAL_RESPONSE);
  const [rows, setRows] = useState<(CensusDataRow & { id: string })[]>([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [highlightedFipsCode, setHighlightedFipsCode] = useState<string | null>(null);

  const fetchData = useCallback(async (
    params: MultiYearQueryParams,
    selectedState?: Geography | null
  ): Promise<void> => {
    setResponse((prev) => ({ ...prev, isLoading: true, error: null }));
    setHighlightedFipsCode(selectedState?.fipsCode ?? null);

    const result = await CensusService.fetchMultiYearData(params);

    if (result.error || !result.data) {
      setResponse({
        data: null,
        error: result.error ?? 'No data returned',
        isLoading: false,
      });
      return;
    }

    const metric = ACS_VARIABLES.find((v) => v.id === params.variables[0])!;
    const isMultiYear = params.years.length > 1;

    let builtRows: (CensusDataRow & { id: string })[];
    let builtColumns: TableColumn[];

    if (isMultiYear) {
      const pivoted = pivotMultiYearData(
        result.data,
        params.variables[0],
      );
      builtRows = buildRows(pivoted);
      builtColumns = buildMultiYearColumns(params.years, metric);
    } else {
      builtRows = buildRows(result.data);
      builtColumns = buildSingleYearColumns(result.data[0], metric);
    }

    setRows(builtRows);
    setColumns(builtColumns);
    setResponse({
      data: result.data,
      error: null,
      isLoading: false,
    });
  }, []);

  const resetData = useCallback((): void => {
    setRows([]);
    setColumns([]);
    setHighlightedFipsCode(null);
    setResponse(INITIAL_RESPONSE);
  }, []);

  return {
    rows,
    columns,
    response,
    fetchData,
    resetData,
    highlightedFipsCode,
  };
};

export default useCensusData;