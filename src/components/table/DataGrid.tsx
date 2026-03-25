import { Box, Theme, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridOverlay, GridRowClassNameParams } from '@mui/x-data-grid';
import TableChartIcon from '@mui/icons-material/TableChart';
import { DataGridProps } from '../../types/census.types';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const EmptyOverlay = () => {
  const theme = useTheme();
  return (
    <GridOverlay>
      <Box sx={styles.emptyOverlay}>
        <TableChartIcon sx={styles.emptyIcon(theme)} />
        <Typography variant="body2" sx={styles.emptyText(theme)}>
          Select your filters and click Search to explore Census data
        </Typography>
      </Box>
    </GridOverlay>
  );
};

const CensusDataGrid = ({
  rows,
  columns,
  isLoading,
  highlightedFipsCode,
}: DataGridProps) => {
  const theme = useTheme();

  const gridColumns: GridColDef[] = columns.map((col) => ({
    ...col,
    headerClassName: 'census-grid-header',
  }));

  const getRowClassName = (params: GridRowClassNameParams): string => {
    return params.row.state === highlightedFipsCode
      ? 'census-grid-row--highlighted'
      : '';
  };

  return (
    <Box sx={styles.root(theme)}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        loading={isLoading}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          noRowsOverlay: EmptyOverlay,
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
        getRowClassName={getRowClassName}
        disableRowSelectionOnClick
        autoHeight
        sx={styles.grid(theme)}
      />
    </Box>
  );
};

export default CensusDataGrid;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  root: (theme: Theme) => ({
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
  }),
  grid: (theme: Theme) => ({
    border: 'none',
    '& .census-grid-header': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontWeight: 700,
      fontSize: '0.875rem',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    '& .census-grid-row--highlighted': {
      backgroundColor: `${theme.palette.primary.main}22`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}33`,
      },
      '& .MuiDataGrid-cell': {
        fontWeight: 700,
        color: theme.palette.primary.main,
      },
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor:
        theme.palette.action?.hover ?? 'rgba(255,255,255,0.05)',
    },
    '& .MuiDataGrid-cell': {
      color: theme.palette.text.primary,
      fontSize: '0.875rem',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiTablePagination-root': {
      color: theme.palette.text.secondary,
    },
    '& .MuiDataGrid-columnSeparator': {
      color: theme.palette.divider,
    },
    '& .MuiDataGrid-sortIcon': {
      color: theme.palette.primary.main,
    },
    '& .MuiDataGrid-filterIcon': {
      color: theme.palette.primary.main,
    },
    '& .MuiDataGrid-skeletonCell': {
      backgroundColor:
        theme.palette.action?.hover ?? 'rgba(255,255,255,0.05)',
    },
  }),
  emptyOverlay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    height: '100%',
    py: 8,
  },
  emptyIcon: (theme: Theme) => ({
    fontSize: 48,
    color: theme.palette.text.disabled,
  }),
  emptyText: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    maxWidth: 300,
  }),
};