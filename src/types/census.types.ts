export type CensusRawResponse = string[][];

export type CensusDataRow = Record<string, string>;

export interface Geography {
  name: string;
  fipsCode: string;
}

export type GeographyLevel = 'state' | 'county' | 'tract';

export interface CensusVariable {
  id: string;
  label: string;
  description: string;
}

export interface CensusDataset {
  id: string;
  label: string;
  description: string;
  availableFrom: number;
  availableTo: number;
}

export interface CensusFilters {
  state: Geography | null;
  years: number[];
  metric: CensusVariable | null;
}

export interface FilterValidation {
  isValid: boolean;
  errors: Partial<Record<keyof CensusFilters, string>>;
}

export interface CensusQueryParams {
  dataset: string;
  year: number;
  variables: string[];
  geographyLevel: GeographyLevel;
  fipsCode?: string;
}

export interface MultiYearQueryParams {
  dataset: string;
  years: number[];
  variables: string[];
  geographyLevel: GeographyLevel;
  fipsCode?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export interface TableColumn {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
}

export interface UseCensusDataReturn {
  rows: CensusDataRow[];
  columns: TableColumn[];
  response: ApiResponse<CensusDataRow[]>;
  fetchData: (params: MultiYearQueryParams, selectedState?: Geography | null) => Promise<void>;
  resetData: () => void;
  highlightedFipsCode: string | null;
}

export interface StateSelectorProps {
  value: Geography | null;
  onChange: (geography: Geography | null) => void;
  disabled?: boolean;
}

export interface YearSelectorProps {
  value: number[];
  onChange: (years: number[]) => void;
  disabled?: boolean;
}

export interface MetricSelectorProps {
  value: CensusVariable | null;
  onChange: (metric: CensusVariable | null) => void;
  disabled?: boolean;
}

export interface HowToModalProps {
  open: boolean;
  onClose: () => void;
}

export interface DataGridProps {
  rows: CensusDataRow[];
  columns: TableColumn[];
  isLoading: boolean;
  highlightedFipsCode: string | null;
}