import { httpClient } from '../api/httpClient';
import {
  CensusQueryParams,
  CensusDataRow,
  ApiResponse,
  MultiYearQueryParams,
} from '../types/census.types';

const buildEndpoint = (year: number, dataset: string): string => {
  return `${year}/${dataset}`;
};

const buildGeographyPredicate = (
  geographyLevel: string,
  fipsCode?: string
): string => {
  return fipsCode ? `${geographyLevel}:${fipsCode}` : `${geographyLevel}:*`;
};

export const CensusService = {
  fetchAcsData: async (
    params: CensusQueryParams
  ): Promise<ApiResponse<CensusDataRow[]>> => {
    const { dataset, year, variables, geographyLevel, fipsCode } = params;
    const endpoint = buildEndpoint(year, dataset);
    const variablesWithName = ['NAME', ...variables];

    const queryParams: Record<string, string> = {
      get: variablesWithName.join(','),
      for: buildGeographyPredicate(geographyLevel, fipsCode),
    };

    return httpClient.get<CensusDataRow[]>(endpoint, queryParams);
  },

  /**
   * Fetches data for multiple years in parallel
   * using Promise.all to fire all requests simultaneously
   * Each result is tagged with its year for column building
   */
  fetchMultiYearData: async (
    params: MultiYearQueryParams
  ): Promise<ApiResponse<CensusDataRow[]>> => {
    const { dataset, years, variables, geographyLevel, fipsCode } = params;

    try {
      const requests = years.map((year) =>
        CensusService.fetchAcsData({
          dataset,
          year,
          variables,
          geographyLevel,
          fipsCode,
        })
      );

      const results = await Promise.all(requests);

      const hasError = results.find((r) => r.error);
      if (hasError) {
        return {
          data: null,
          error: hasError.error,
          isLoading: false,
        };
      }

      // Tag each row with its year so we can build
      // year columns dynamically in the hook
      const taggedData = results.flatMap((result, index) =>
        (result.data ?? []).map((row) => ({
          ...row,
          _year: years[index].toString(),
        }))
      );

      return {
        data: taggedData,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        isLoading: false,
      };
    }
  },

  fetchStates: async (
    year: number
  ): Promise<ApiResponse<CensusDataRow[]>> => {
    const endpoint = buildEndpoint(year, 'acs/acs1');
    const queryParams: Record<string, string> = {
      get: 'NAME',
      for: 'state:*',
    };
    return httpClient.get<CensusDataRow[]>(endpoint, queryParams);
  },
};