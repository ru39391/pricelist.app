import { FC } from 'react';
import { Box, Breadcrumbs, Grid, Pagination, Typography } from '@mui/material';

import ResCard from './ResCard';
import ResFilter from './ResFilter';

import usePagination from '../hooks/usePagination';

import { RES_ID_KEY } from '../utils/constants';

const ResList: FC = () => {
  const {
    currentPage,
    currentPageCounter,
    currentPageItems,
    currentItemsMess,
    setCurrentPage,
    handlePageItems
  } = usePagination();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>Управление ресурсами</Typography>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 4, typography: 'subtitle2' }}
      >
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Страница: {currentPage} из {currentPageCounter}
        </Typography>
      </Breadcrumbs>

      <ResFilter
        currentPage={currentPage}
        currentItemsMess={currentItemsMess}
        handlePageItems={handlePageItems}
        setCurrentPage={setCurrentPage}
      />

      {currentPageItems.length > 0 && <Grid container spacing={2} sx={{ mb: 3 }}>
        {currentPageItems.map(item => (<Grid item key={item[RES_ID_KEY].toString()} xs={4}><ResCard item={item} /></Grid>))}
      </Grid>}
      {Boolean(currentPageCounter) && currentPageCounter > 1
        && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              size="large"
              color="primary"
              page={currentPage}
              count={currentPageCounter}
              onChange={(_, value: number) => setCurrentPage(value)}
            />
          </Box>
      }
    </>
  )
};

export default ResList;
