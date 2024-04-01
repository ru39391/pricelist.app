import { FC, useEffect } from 'react';
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import useModal from '../hooks/useModal';
import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/modal-slice';

import type { TCustomData } from '../types';

import {
  ADD_TITLE,
  EDIT_TITLE,
  CATEGORY_TITLE,
  NO_ITEMS_TITLE,
  ID_KEY,
  NAME_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  TYPES
} from '../utils/constants';

const ItemsList: FC = () => {
  const keys = Object.values(TYPES);
  const dispatch = useDispatch();
  const pricelistData = useSelector(state => state.pricelist);
  const {
    tableData,
    handleTableData
  } = useTableData();
  const {
    currSubcategory,
    subCategoryItems,
    categoryTypes,
    categoryParams,
    setCurrSubcategory
  } = useCategoryItems();
  const { toggleModal } = useModal();

  useEffect(() => {
    handleTableData({
      data: keys.reduce((acc, key) => ({...acc, [key]: pricelistData[key]}), {}),
      category: currSubcategory,
      params: categoryParams
    });
  }, [
    pricelistData,
    currSubcategory,
    categoryParams
  ]);

  const handleCategoryData = () => {
    toggleModal({ title: `${ADD_TITLE} ${categoryTypes && categoryTypes[currSubcategory].toLocaleLowerCase()}`});
    dispatch(setFormData({
      data: {
        action: ADD_ACTION_KEY,
        type: currSubcategory,
        data: {...categoryParams}
      }
    }));
  }

  const handleItemData = (values: TCustomData<string | number>) => {
    toggleModal({ title: `${EDIT_TITLE} «${values[NAME_KEY]}»` });
    dispatch(setFormData({
      data: {
        action: EDIT_ACTION_KEY,
        type: currSubcategory,
        data: pricelistData[currSubcategory].find((item: TCustomData<string | number>) => item[ID_KEY] === values[ID_KEY]),
        values
      }
    }));
  }

  return (
    <>
      <Box
        sx={{
          mb: 3,
          gap: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <FormControl sx={{ minWidth: 200, backgroundColor: '#fff' }} size="small">
          <InputLabel id="demo-select-small-label">{CATEGORY_TITLE}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={currSubcategory}
            label={CATEGORY_TITLE}
            onChange={({ target }) => setCurrSubcategory(target.value)}
          >
            {subCategoryItems.map((item) => <MenuItem key={Object.keys(item)[0]} value={Object.keys(item)[0]}>{Object.values(item)[0]}</MenuItem>)}
          </Select>
        </FormControl>
        <Tooltip
          placement="top"
          title={ADD_TITLE}
        >
          <IconButton
            sx={{ p: 0, color: 'text.secondary' }}
            onClick={handleCategoryData}
          >
            <AddCircleOutline fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      {tableData !== null
        ? <DataGrid
          sx={{
            border: 0,
            flexGrow: 1,
            height: 'auto',
            boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
            bgcolor: 'background.default',
          }}
          columns={tableData ? tableData.cols : []}
          rows={tableData ? tableData.rows : []}
          onRowClick={({ row }: { row: TCustomData<string | number> }) => handleItemData(row)}
        />
        : <Typography sx={{ mb: 1, typography: 'body1' }}>{NO_ITEMS_TITLE}</Typography>
      }
    </>
  )
};

export default ItemsList;