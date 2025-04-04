import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DeleteOutlined, Sync } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import type { TFileCategoryData, TItemData } from '../types';
import { APPLY_TITLE, CLEAR_TITLE } from '../utils/constants';

interface IParserTable {
  isBtnDisabled: boolean;
  isFileDataExist: boolean;
  isTableGridVisible: boolean;
  tableTitle: string;
  tableGridCols: GridColDef<GridValidRowModel>[];
  tableGridRows: GridValidRowModel[];
  categoryData: TFileCategoryData;
  handleTableGridRow: (data: { values: TItemData; categoryData: TFileCategoryData; }) => void;
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
  categoryData,
  handleTableGridRow,
  handleConfirmBtnClick,
  handleResetBtnClick
}) => {
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
