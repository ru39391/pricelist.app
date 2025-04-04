import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DeleteOutlined, Sync } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import useModal from '../hooks/useModal';

import { useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import type {
  TFileActionsData,
  TFileCategoryData,
  TComparedFileData,
  TItemData
} from '../types';
import {
  ID_KEY,
  NAME_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  ADD_TITLE,
  APPLY_TITLE,
  CLEAR_TITLE,
  EDIT_ITEM_TITLE,
  REMOVE_TITLE
} from '../utils/constants';

interface IParserTable {
  isBtnDisabled: boolean;
  isFileDataExist: boolean;
  isTableGridVisible: boolean;
  tableTitle: string;
  tableGridCols: GridColDef<GridValidRowModel>[];
  tableGridRows: GridValidRowModel[];
  fileData: TComparedFileData | null;
  categoryData: TFileCategoryData;
  handleConfirmBtnClick: () => void;
  handleResetBtnClick: () => void;
}

const ParserTable: FC<IParserTable> = ({
  isBtnDisabled,
  isFileDataExist,
  isTableGridVisible,
  tableTitle,
  tableGridCols,
  tableGridRows,
  fileData,
  categoryData,
  handleConfirmBtnClick,
  handleResetBtnClick
}) => {
  const dispatch = useDispatch();
  const { toggleModal } = useModal();
  const handleTableGridRow = ({ values, categoryData }: { values: TItemData; categoryData: TFileCategoryData; }) => {
    const params: TFileActionsData = {
      [CREATED_KEY]: { action: ADD_ACTION_KEY, title: ADD_TITLE },
      [UPDATED_KEY]: { action: EDIT_ACTION_KEY, title: EDIT_ITEM_TITLE },
      [REMOVED_KEY]: { action: REMOVE_ACTION_KEY, title: REMOVE_TITLE }
    };
    const { category, subCategory: type } = categoryData;
    const { action, title } = params[category];
    const items = fileData ? fileData[category][type] : [];
    const data = items.length ? items.find((item: TItemData) => item[ID_KEY] === values[ID_KEY]) : {};

    toggleModal({ title: `${title} «${values[NAME_KEY]}»` });
    dispatch(setFormData({
      data: {
        isFormHidden: true,
        action,
        type,
        values,
        ...( data ? { data } : { data: {} } )
      }
    }));
  }

  if(!fileData) {
    return '';
  }

  return (
    isFileDataExist && <>
      <Box sx={{ mb: 2, gap: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ typography: 'body1' }}>{tableTitle}</Typography>
        <Box sx={{ gap: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/*
            // TODO: блокировать кнопки, пока данные обрабатываются сервером
            // TODO: возможно, перенести кнопку в сайдбар
          */}
          <Button
            variant="outlined"
            startIcon={<Sync />}
            disabled={isBtnDisabled}
            onClick={handleConfirmBtnClick}
          >
            {APPLY_TITLE}
          </Button>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlined />}
            disabled={isBtnDisabled}
            onClick={handleResetBtnClick}
          >
            {CLEAR_TITLE}
          </Button>
        </Box>
      </Box>
      {/* // TODO: настроить сброс данных таблицы comparedFileData после успешного ответа сервера */}
      {isTableGridVisible && <DataGrid
        sx={{ border: 0, flexGrow: 1, height: 'auto', boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)', bgcolor: 'background.default' }}
        columns={tableGridCols}
        rows={tableGridRows}
        // TODO: необязательная доработка - возможность удалять группы записей
        onRowClick={({ row }: { row: TItemData }) => handleTableGridRow({ values: row, categoryData })}
      />}
    </>
  )
};

export default ParserTable;
