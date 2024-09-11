import { FC, useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Grid,
  Pagination,
  Typography
} from '@mui/material';
import { Edit, RemoveRedEye, Settings } from '@mui/icons-material';

import usePagination from '../hooks/usePagination';

import { useSelector } from '../services/hooks';
import { NAME_KEY, RES_ID_KEY, RES_KEY, SITE_URL } from '../utils/constants';

import type { TResourceData } from '../types';

const ResList: FC = () => {
  const { res } = useSelector(state => state.pricelist);
  const {
    currentPage,
    currentPageCounter,
    currentPageItems,
    setCurrentPage
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
          Ресурсы
        </Typography>
        {currentPageCounter && <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Страница: {currentPage}
        </Typography>}
      </Breadcrumbs>

      {Boolean(currentPageItems.length) && <Grid container spacing={2} sx={{ mb: 3 }}>
        {currentPageItems.map(item => (<Grid item key={item[RES_ID_KEY].toString()} xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{item.parent[NAME_KEY]}</Typography>
              <Typography variant="h5" component="div">{res.indexOf(item).toString()}. {item[NAME_KEY]}</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item.template[NAME_KEY]}</Typography>
              <Typography variant="body2">
                Категория: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.isParent ? 'Да' : 'Нет'}</Typography><br />
                Опубликовано: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.publishedon.date}</Typography><br />
                Изменено: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.editedon.date}</Typography>
              </Typography>
            </CardContent>
            <CardActions>
            <ButtonGroup aria-label="outlined primary button group">
              <IconButton href={`${'http://stomistok.local/'}${item.uri}`} target="_blank"><RemoveRedEye /></IconButton>
              <IconButton href={`/${RES_KEY}/${item[RES_ID_KEY].toString()}`}><Settings /></IconButton>
              <IconButton href={`${'http://stomistok.local/'}manager/?a=resource/update&id=${item[RES_ID_KEY].toString()}`} target="_blank"><Edit /></IconButton>
            </ButtonGroup>
            </CardActions>
          </Card>
        </Grid>))}
      </Grid>}
      {currentPageCounter
        ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              size="large"
              color="primary"
              count={currentPageCounter}
              onChange={(event: ChangeEvent<unknown>, value: number) => setCurrentPage(value)}
            />
          </Box>
        : ''
      }
    </>
  )
};

export default ResList;