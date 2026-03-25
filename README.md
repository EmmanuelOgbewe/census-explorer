# Census Explorer

A data exploration tool built on top of the U.S. Census Bureau's public API.
Allows users to query, compare, and analyze demographic and economic data
across U.S. states using American Community Survey (ACS) 1-Year Estimates.

## Features

- Query live data directly from the U.S. Census Bureau API
- Compare metrics across all 50 states
- Multi-year comparison with side by side columns
- State highlighting for contextual ranking
- Interactive data grid with sorting, filtering, and pagination
- Skeleton loading states
- Light and dark theme toggle
- How-to modal for new users

## Tech Stack

- React + TypeScript
- Vite
- Material UI (MUI) + MUI X Data Grid
- U.S. Census Bureau Data API

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A free Census Bureau API key

### Request an API Key

Get your free API key at:

```
https://api.census.gov/data/key_signup.html
```

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/census-explorer.git
cd census-explorer
npm install
```

### Environment Setup

Create a `.env` file in the root of the project:

```
VITE_CENSUS_API_KEY=your_api_key_here
```

### Run Locally

```bash
npm run dev
```

## Usage

1. Select one or more years from the year filter
2. Optionally select a state to highlight it in the results
3. Select a metric to explore
4. Click Search to fetch live Census data
5. Sort and filter results directly in the table

## Available Metrics

| Metric                         | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| Total Population               | Total population count                          |
| Median Household Income        | Median household income (inflation adjusted)    |
| Population Below Poverty Level | Number of people below the federal poverty line |
| Bachelor's Degree Holders      | People 25+ with a bachelor's degree             |
| Unemployed Population          | People 16+ who are unemployed                   |
| Median Gross Rent              | Median rent for renter occupied housing units   |
| Median Age                     | Median age of the total population              |

## Data Source

All data is sourced from the
[U.S. Census Bureau's American Community Survey (ACS) 1-Year Estimates](https://www.census.gov/data/developers/data-sets/acs-1year.html).

Coverage is limited to geographies with populations of 65,000 or more.
The 2020 ACS 1-Year data is unavailable due to COVID-19 data collection disruptions.

## API Reference

- [Census Data API User Guide](https://www.census.gov/data/developers/guidance/api-user-guide.html)
- [Available Datasets](https://www.census.gov/data/developers/data-sets.html)
- [ACS 1-Year Variables](https://api.census.gov/data/2023/acs/acs1/variables.json)

## License

This project is for educational and exploratory purposes.
Census Bureau data is public domain.
