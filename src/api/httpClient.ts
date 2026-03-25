import { CensusRawResponse, ApiResponse, CensusDataRow } from '../types/census.types';

const BASE_URL = 'https://api.census.gov/data';
const API_KEY = import.meta.env.VITE_CENSUS_API_KEY as string;

/**
 * Transforms the raw Census API array-of-arrays response
 * into an array of typed objects using the first row as headers
 * e.g. [["NAME", "B01001_001E"], ["Alabama", "5024279"]]
 * becomes [{ NAME: "Alabama", B01001_001E: "5024279" }]
 */
const parseResponse = (raw: CensusRawResponse): CensusDataRow[] => {
  const [headers, ...rows] = raw;
  return rows.map((row) =>
    headers.reduce<CensusDataRow>((acc, header, index) => {
      acc[header] = row[index];
      return acc;
    }, {})
  );
};

/**
 * Builds the query string from params object
 * Appends API key automatically
 */
const buildQueryString = (params: Record<string, string>): string => {
  const query = Object.entries({ ...params, key: API_KEY })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return query;
};


/**
 * Core fetch wrapper
 * Handles all HTTP concerns — errors, parsing, loading state
 * All Census API calls go through here
 */
const request = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  try {
    const queryString = buildQueryString(params);
    const url = `${BASE_URL}/${endpoint}?${queryString}`;

    const res = await fetch(url);

    if (!res.ok) {
      return {
        data: null,
        error: `Request failed with status ${res.status}: ${res.statusText}`,
        isLoading: false,
      };
    }

    const raw: CensusRawResponse = await res.json();
    const parsed = parseResponse(raw);

    return {
      data: parsed as T,
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
};

/**
 * Public API of the http client
 * Intentionally only exposes get for now
 * since the Census API is read-only
 */
export const httpClient = {
  get: <T>(endpoint: string, params?: Record<string, string>) =>
    request<T>(endpoint, params),
};