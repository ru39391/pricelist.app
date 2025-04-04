import { FC, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DeleteOutlined, Sync } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import useModal from '../hooks/useModal';

import { useDispatch } from '../services/hooks';
import { resetFileList } from '../services/actions/file';
import { setFormData } from '../services/slices/form-slice';

import type {
  TFileActionsData,
  TFileCategoryData,
  TComparedFileData,
  THandledItemKeys,
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
  REMOVE_TITLE,
  HANDLED_ITEMS_CAPTIONS
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
}

const ParserTable: FC<IParserTable> = ({
  isBtnDisabled,
  isFileDataExist,
  isTableGridVisible,
  tableTitle,
  tableGridCols,
  tableGridRows,
  fileData,
  categoryData
}) => {
  const dispatch = useDispatch();
  const { toggleModal } = useModal();

  /**
   * Передача данных xls-файла в глобальное хранилище, вызов модального окна для подтверждения сохранения данных документа
   */
  const setConfirmModalVisible = () => {
    let desc = '';
    const { subCategory: type } = categoryData;

    if(fileData) {
      for (const key in fileData) {
        const category = key as THandledItemKeys;
        const itemCounters = Object.keys(fileData[category]).reduce(
          (acc, item, index) => `${acc}${index > 0 ? ', ' : ''}${categoryTypes && categoryTypes[item].toLowerCase()} - ${Object.values(fileData[category])[index].length.toString()}`,
          ''
        );

        desc = `${desc}${HANDLED_ITEMS_CAPTIONS[category]}: ${itemCounters}. `;
      }
    }

    toggleModal({
      title: `Вы собираетесь ${EDIT_ITEM_TITLE.toLowerCase()}`,
      desc,
      isParserData: true
    });
    dispatch(setFormData({
      data: {
        isFormHidden: true,
        action: EDIT_ACTION_KEY,
        type,
        items: fileData || undefined,
        data: {}
      }
    }));
  }

  /**
   * Поиск данных элемента прайслиста по данным таблицы и передача в глобальное хранилище для отображения в модальном окне
   * @property {TItemData} values - данные строки таблицы, соответствующие полученному при парсинге xls-файла объекту
   */
  const handleTableGridRow = (values: TItemData) => {
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

  /**
   * Удаление данных обработанного документа из глобального хранилища
   */
  const resetFileData =  useCallback(() => {
    console.log('resetFileList');
    dispatch(resetFileList());
  }, [
    dispatch
  ]);

  if(!fileData) {
    // TODO: проверить проблему сброса состояния при успешном ответе сервера, если работает корректно, заменить isFileDataExist на !fileData
    return 'fileData равно null';
  }

  return (
    isFileDataExist && <>
      <Box sx={{ mb: 2, gap: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ typography: 'body1' }}>{tableTitle}</Typography>
        <Box sx={{ gap: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/*
            // TODO: блокировать кнопки, пока данные обрабатываются сервером
          */}
          <Button
            variant="outlined"
            startIcon={<Sync />}
            disabled={isBtnDisabled}
            onClick={setConfirmModalVisible}
          >
            {APPLY_TITLE}
          </Button>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlined />}
            disabled={isBtnDisabled}
            onClick={resetFileData}
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
        onRowClick={({ row }: { row: TItemData }) => handleTableGridRow(row)}
      />}
    </>
  )
};

export default ParserTable;
