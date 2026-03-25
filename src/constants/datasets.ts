import { CensusVariable, CensusDataset } from '../types/census.types';

export const ACS_DATASET: CensusDataset = {
  id: 'acs/acs1',
  label: 'ACS 1-Year Estimates',
  description: 'American Community Survey 1-Year estimates for areas with populations of 65,000 or more.',
  availableFrom: 2005,
  availableTo: 2023,
};

export const ACS_VARIABLES: CensusVariable[] = [
  {
    id: 'B01001_001E',
    label: 'Total Population',
    description: 'Total population count for the selected geography',
  },
  {
    id: 'B19013_001E',
    label: 'Median Household Income',
    description: 'Median household income in the past 12 months (in inflation-adjusted dollars)',
  },
  {
    id: 'B17001_002E',
    label: 'Population Below Poverty Level',
    description: 'Number of people whose income is below the federal poverty level',
  },
  {
    id: 'B15003_022E',
    label: "Bachelor's Degree Holders",
    description: "Number of people 25 years and older with a bachelor's degree",
  },
  {
    id: 'B23025_005E',
    label: 'Unemployed Population',
    description: 'Number of people 16 years and older who are unemployed',
  },
  {
    id: 'B25064_001E',
    label: 'Median Gross Rent',
    description: 'Median gross rent for renter-occupied housing units',
  },
  {
    id: 'B01002_001E',
    label: 'Median Age',
    description: 'Median age of the total population',
  },
];