import { useState } from 'react';
import { sortArrValues } from '../utils';
import { GridValidRowModel, GridColDef } from '@mui/x-data-grid';
import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  CAPTIONS,
  TYPES,
  ITEM_KEY,
  PRICE_KEY,
  ROW_INDEX_KEY
} from '../utils/constants';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistData
} from '../types';

type TCategoryData = {
  data: TPricelistData;
  category: string | undefined;
  params: TCustomData<number | null> | null;
};

type TTableData = {
  cols: GridColDef<GridValidRowModel>[];
  rows: GridValidRowModel[];
} | null;

interface ITableData {
  tableData: TTableData | null;
  handleTableData: (data: TCategoryData, fileData: TPricelistData | null) => void;
}

const useTableData = (): ITableData => {
  const [tableData, setTableData] = useState<TTableData>(null);

  const setBooleanCaption =(item: TItemData, key: string): TCustomData<string> => ({ [key]: item[key] ? 'Да' : 'Нет' });

  const isValueExist = (value: string | number | undefined): boolean => ['string', 'number'].includes(typeof value);

  const getCategoryName = (arr: TItemsArr, item: GridValidRowModel, key: string): string => {
    const data = arr.find(row => row[ID_KEY] === item[key]);

    return data ? data[NAME_KEY] as string : '';
  }

  const getItemsName = (arr: TCustomData<number>[], items: TItemsArr): string => Array.isArray(arr) && arr.length
   ? arr
      .map(item => ({ id: Number(Object.keys(item)[0]), quantity: Object.values(item)[0] }))
      .reduce((acc: string[], row: TCustomData<number>) => {
    const data: TItemData | undefined = items.find(item => item[ID_KEY] === row.id);

    return data ? [...acc, `${data[NAME_KEY]} - ${row.quantity} шт.`] : acc;
   }, []).join(', ')
   : '';

  const handleArr = (
    arr: TItemsArr,
    data: TPricelistData,
    fileData: TPricelistData | null = null
  ): TTableData => {
    if(!(Array.isArray(arr) && arr.length)) {
      return null;
    }

    const keys = [
      ROW_INDEX_KEY,
      ID_KEY,
      NAME_KEY,
      PRICE_KEY,
      DEPT_KEY,
      SUBDEPT_KEY,
      GROUP_KEY,
      IS_COMPLEX_ITEM_KEY,
      IS_COMPLEX_KEY,
      COMPLEX_KEY,
      IS_VISIBLE_KEY
    ];
    const items = fileData || data;
    const rows: GridValidRowModel[] = sortArrValues([...arr], NAME_KEY)
      .reduce((acc: GridValidRowModel[], item: GridValidRowModel, index) => !item ? [] : [...acc, {
        [ROW_INDEX_KEY]: index + 1,
        ...Object.keys(item).reduce((acc, key, index) => ({ ...acc, [key]: Object.values(item)[index] }), {}),
        ...(isValueExist(item[DEPT_KEY]) && { [DEPT_KEY]: getCategoryName(items[TYPES[DEPT_KEY]], item, DEPT_KEY) }),
        ...(isValueExist(item[SUBDEPT_KEY]) && { [SUBDEPT_KEY]: getCategoryName(items[TYPES[SUBDEPT_KEY]], item, SUBDEPT_KEY) }),
        ...(isValueExist(item[GROUP_KEY]) && { [GROUP_KEY]: getCategoryName(items[TYPES[GROUP_KEY]], item, GROUP_KEY) }),
        ...(isValueExist(item[IS_COMPLEX_ITEM_KEY]) && setBooleanCaption(item, IS_COMPLEX_ITEM_KEY)),
        ...(isValueExist(item[IS_COMPLEX_KEY]) && setBooleanCaption(item, IS_COMPLEX_KEY)),
        ...(isValueExist(item[COMPLEX_KEY]) && { [COMPLEX_KEY]: getItemsName(JSON.parse(item[COMPLEX_KEY]), items[TYPES[ITEM_KEY]]) }),
        ...(isValueExist(item[IS_VISIBLE_KEY]) && setBooleanCaption(item, IS_VISIBLE_KEY))
      }], []);
    const cols: GridColDef<GridValidRowModel>[] = !rows[0] ? [] : Object.keys(rows[0])
      .filter((key) => keys.includes(key))
      .map((item) => ({
        field: item,
        headerName: CAPTIONS[item],
        flex: CAPTIONS[item].length > 4 ? 1 : 0,
        width: CAPTIONS[item].length > 4 ? 'auto' : 100,
      } as GridColDef<GridValidRowModel>));

    return {
      rows,
      cols
    };
  }

  const handleTableData = (
    {data, category, params}: TCategoryData,
    fileData: TPricelistData | null = null
  ): void => {
    //console.log({data, category, params});
    const key = params !== null ? Object.keys(params)[0] : null;
    const id = params !== null && key !== null ? params[key] : null;
    const arr = category ? data[category] : data[TYPES[ITEM_KEY]];
    const filtredArr = key !== null && id !== null
      ? arr.filter((item) => item[key] === id)
      : arr;

    setTableData(
      handleArr(
        filtredArr,
        data,
        fileData
      )
    );
  }

  return {
    tableData,
    handleTableData
  }
}

export default useTableData;
