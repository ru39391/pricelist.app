import { FC, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { FilterAlt, RestartAlt } from '@mui/icons-material';

import useFilter from '../hooks/useFilter';

import {
  TITLES,
  NAME_KEY,
  RES_ID_KEY,
  RES_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  UPDATED_KEY
} from '../utils/constants';

import type {
  TLinkedResourceData,
  TResParent,
  TResTemplate,
  TResTemplateKeys,
  TResParentKeys,
  TFilterData
} from '../types';

interface IResFilter {
  currentPage: number;
  currentItemsMess: string;
  handlePageItems: (filterResultList: TLinkedResourceData[], currentPage: number) => void;
  setCurrentPage: (currentPage: number) => void;
}

const ResFilter: FC<IResFilter> = ({
  currentPage,
  currentItemsMess,
  handlePageItems,
  setCurrentPage
}) => {
  const {
    filterData,
    isFilterVisible,
    filterResultList,
    parentsList,
    templatesList,
    handleFilterData,
    setFilterVisibility
  } = useFilter();

  const isItemResParent = (item: TResParent | TResTemplate): item is TResParent => 'parent_id' in item;

  useEffect(() => {
    handlePageItems(filterResultList, currentPage);
  }, [
    filterResultList,
    currentPage
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterData
  ]);

  return (
    <>
      <Box
        sx={{
          mt: 0,
          mb: isFilterVisible ? 1.25 : 3,
          gap: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          id={`${RES_KEY}_${NAME_KEY}`}
          name={`${RES_KEY}_${NAME_KEY}`}
          label=""
          sx={{ my: 0, backgroundColor: '#fff' }}
          fullWidth
          variant="outlined"
          margin="dense"
          type="text"
          placeholder="Искать по названию"
          value={filterData && filterData[NAME_KEY] ? filterData[NAME_KEY] : ''}
          onChange={({ target }) => handleFilterData({ [NAME_KEY]: target.value })}
        />
        <Tooltip
          placement="top"
          title={`${isFilterVisible ? 'Скрыть' : 'Показать'} фильтр`}
        >
          <IconButton
            color="primary"
            aria-label={`${isFilterVisible ? 'Скрыть' : 'Показать'} фильтр`}
            onClick={() => {
              handleFilterData(
                filterData && filterData[NAME_KEY]
                  ? { [NAME_KEY]: filterData[NAME_KEY], [UPDATED_KEY]: 1 } as TFilterData
                  : null
              );
              setFilterVisibility(!isFilterVisible);
            }}
            size="large"
          >
            <FilterAlt fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      {isFilterVisible && <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {[{
          key: PARENT_KEY,
          id: `${PARENT_KEY}_${RES_ID_KEY}`,
          items: parentsList
        }, {
          key: TEMPLATE_KEY,
          id: `${TEMPLATE_KEY}_${RES_ID_KEY}`,
          items: templatesList
        }].map(({ key, id, items }) => (<Grid key={key} item xs={4}>
          <FormControl sx={{ my: 0 }} fullWidth>
            <InputLabel id={`${key}-label`}>{TITLES[key]}</InputLabel>
            <Select
              labelId={`${key}-label`}
              id={key}
              name={key}
              value={filterData && filterData[key] ? filterData[key] : ''}
              label={TITLES[key]}
              sx={{ backgroundColor: '#fff' }}
              onChange={({ target }) => handleFilterData({ [key]: target.value })}
            >
              {items.map(
                (item: TResParent | TResTemplate) =>
                  <MenuItem
                    key={isItemResParent(item) ? item[id as TResParentKeys] : item[id as TResTemplateKeys]}
                    value={isItemResParent(item) ? item[id as TResParentKeys] : item[id as TResTemplateKeys]}
                  >
                    {item[NAME_KEY]} - {(isItemResParent(item) ? item[id as TResParentKeys] : item[id as TResTemplateKeys]).toString()}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>))}
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FormControl>
            <FormLabel
              id={`${IS_PARENT_KEY}-label`}
              focused={false}
            >
              {TITLES[IS_PARENT_KEY]}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby={`${IS_PARENT_KEY}-label`}
              name={IS_PARENT_KEY}
              value={
                filterData && filterData[IS_PARENT_KEY] !== undefined
                  ? Number(filterData && filterData[IS_PARENT_KEY])
                  : null
              }
              onChange={({ target }) => handleFilterData({ [IS_PARENT_KEY]: Number(target.value) })}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Да"
              />
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Нет"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            variant="contained"
            startIcon={<RestartAlt />}
            disabled={!filterData}
            onClick={() => handleFilterData(null)}
            size="large"
          >
            Сбросить
          </Button>
        </Grid>
      </Grid>}

      {Boolean(filterData) && <Typography sx={{ typography: 'body1', mb: 2 }}>{currentItemsMess}</Typography>}
    </>
  )
};

export default ResFilter;
