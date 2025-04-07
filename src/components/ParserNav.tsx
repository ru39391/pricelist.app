import { FC, useEffect } from 'react';
import {
  Badge,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

import type {
  TCategoryData,
  TComparedFileData,
  TComparedItems,
  TFileDataNav,
  TFileCategoryData,
  THandledItemKeys,
  TPricelistData,
  TPricelistTypes
} from '../types';

import { fetchArray } from '../utils';
import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  ITEM_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  NO_GROUP_TITLE,
  CAPTIONS,
  TYPES
} from '../utils/constants';

interface IParserNav {
  fileData: TComparedFileData | null;
  currFileData: TPricelistData | null;
  isBtnDisabled: boolean;
  navData: TFileDataNav;
  subNavData: TComparedItems;
  subNavCounter: number;
  categoryData: TFileCategoryData;
  handleTableData: (data: TCategoryData | null, fileData?: TPricelistData | null) => void;
  handleCategoryData: (data: TFileCategoryData) => void;
}

/**
 * Навигация по записям, полученным при парсинге xls-файла
 *
 */
const ParserNav: FC<IParserNav> = ({
  fileData,
  currFileData,
  isBtnDisabled,
  navData,
  subNavData,
  subNavCounter,
  categoryData,
  handleTableData,
  handleCategoryData
}) => {
  const updatedItemsArr = fetchArray([...subNavData[NAME_KEY], ...subNavData[PRICE_KEY]], ID_KEY);

  const navItems = navData.map((item) => {
    const { key, counter } = item.data[item.data.length - 1];

    return {
      ...item,
      counter,
      data: {
        category: item.key as THandledItemKeys,
        subCategory: key as TPricelistTypes
      }
    };
  });

  /**
   * Передаёт значения категории (тип изменения) и подкатегории (тип элементов) для изменения данных навигации,
   * передаёт массив обработанных данных файла для отрисовки таблицы
   * @property {THandledItemKeys} category - категория изменений
   * @property {TPricelistTypes} subCategory - тип элемента прайслиста
   * @property {TItemsArr | undefined} arr - массив элементов
   */
  const selectFileCategory = ({ category, subCategory, arr }: TFileCategoryData) => {
    if(!fileData) {
      handleTableData(null);
      return;
    }

    const data = category === UPDATED_KEY && subCategory === TYPES[ITEM_KEY]
      ? {
          ...fileData[category],
          [TYPES[ITEM_KEY]]: Array.isArray(arr) ? arr : updatedItemsArr
        }
      : fileData[category];

    handleCategoryData({ category, subCategory });

    handleTableData(
      {
        data,
        category: subCategory,
        params: null
      },
      currFileData
    );
  };

  useEffect(() => {
    selectFileCategory({ category: CREATED_KEY, subCategory: TYPES[ITEM_KEY] });
  }, [
    fileData
  ]);

  return (
    fileData && <>
      {navItems.map(
        ({ key, caption, counter, data }) =>
        <ListItemButton
          key={key}
          disabled={isBtnDisabled}
          selected={data.category === categoryData.category && data.subCategory === categoryData.subCategory}
          sx={{ py: 0.5 }}
          onClick={() => selectFileCategory(data)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
            <ListItemText primary={caption} sx={{ mr: 3 }} />
            <Badge badgeContent={data.category === UPDATED_KEY && data.subCategory === TYPES[ITEM_KEY] ? updatedItemsArr.length : counter} color="primary" />
          </Box>
        </ListItemButton>
      )}
      {navData.length > 0 && <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(subNavData).map(
            ([key, arr]) =>
            <ListItemButton
              key={key}
              disabled={isBtnDisabled}
              selected={categoryData.category === UPDATED_KEY && categoryData.subCategory === TYPES[ITEM_KEY] && subNavCounter === arr.length && arr.length > 0}
              sx={{ pl: 6, color: 'grey.600', fontSize: 14 }}
              onClick={() => selectFileCategory({ category: UPDATED_KEY, subCategory: TYPES[ITEM_KEY], arr })}
            >
              <ListItemText
                disableTypography
                primary={CAPTIONS[key] || NO_GROUP_TITLE}
                sx={{ m: 0, mr: 2, flexGrow: 0 }}
              />
              <Badge badgeContent={arr.length} color="default" showZero />
            </ListItemButton>
          )}
        </List>
      </Collapse>}
    </>
  )
};

export default ParserNav;
