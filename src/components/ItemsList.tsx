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
import useCurrentData from '../hooks/useCurrentData';
import useCategoryItems from '../hooks/useCategoryItems';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import type { TItemData, TPricelistTypes } from '../types';

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
  const dispatch = useDispatch();
  const pricelist = useSelector(state => state.pricelist);
  const {
    currSubCategory,
    subCategoryItems,
    categoryTypes,
    categoryParams,
    setCurrSubCategory
  } = useCategoryItems();
  const { toggleModal } = useModal();
  const { setCurrentFormValues } = useCurrentData();
  const { tableData, handleTableData } = useTableData();

  useEffect(() => {
    handleTableData({
      data: Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: pricelist[type]}), {}),
      category: currSubCategory,
      params: categoryParams
    }, null);
  }, [
    pricelist,
    currSubCategory,
    categoryParams
  ]);

  const handleCategoryData = () => {
    toggleModal({ title: `${ADD_TITLE} ${categoryTypes && categoryTypes[currSubCategory].toLocaleLowerCase()}`});
    dispatch(setFormData({
      data: {
        action: ADD_ACTION_KEY,
        type: currSubCategory as TPricelistTypes,
        data: setCurrentFormValues(currSubCategory)
      }
    }));
  }

  const handleItemData = (values: TItemData) => {
    toggleModal({ title: `${EDIT_TITLE} «${values[NAME_KEY]}»` });
    dispatch(setFormData({
      data: {
        action: EDIT_ACTION_KEY,
        type: currSubCategory as TPricelistTypes,
        data: pricelist[currSubCategory].find((item: TItemData) => item[ID_KEY] === values[ID_KEY]) as TItemData
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
            value={currSubCategory}
            label={CATEGORY_TITLE}
            onChange={({ target }) => setCurrSubCategory(target.value as TPricelistTypes)}
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
          onRowClick={({ row }: { row: TItemData }) => handleItemData(row)}
        />
        : <Typography sx={{ mb: 1, typography: 'body1' }}>{NO_ITEMS_TITLE}</Typography>
      }
    </>
  )
};

export default ItemsList;
