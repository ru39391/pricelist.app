import { useState } from 'react';
import { sortArray } from '../utils';
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
  CAPTIONS
} from '../utils/constants';

import type { TCustomData } from '../types';

export type TTableData = {
  cols: GridColDef<GridValidRowModel>[];
  rows: GridValidRowModel[];
} | null;

interface ITableData {
  deptsTableData: TTableData | null;
  subdeptsTableData: TTableData | null;
  groupsTableData: TTableData | null;
  itemsTableData: TTableData | null;
  setTableData: (data: TCustomData<TCustomData<string | number>[]>) => void;
}

const useTableData = (): ITableData => {
  const [deptsTableData, setDeptsTableData] = useState<TTableData>(null);
  const [subdeptsTableData, setSubeptsTableData] = useState<TTableData>(null);
  const [groupsTableData, setGroupsTableData] = useState<TTableData>(null);
  const [itemsTableData, setItemsTableData] = useState<TTableData>(null);

  const setBooleanCaption =(item: TCustomData<string | number>, key: string): TCustomData<string> => ({ [key]: item[key] ? 'Да' : 'Нет' });

  const isValueExist = (value: string | number | undefined): boolean => ['string', 'number'].includes(typeof value);

  const getCategoryName = (arr: TCustomData<string | number>[], item: TCustomData<string | number>, key: string): string => {
    const data = arr.find(row => row[ID_KEY] === item[key]);

    return data ? data[NAME_KEY] as string : '';
  }

  const getItemsName = (arr: number[], items: TCustomData<string | number>[]): string => arr.length
   ? arr.reduce((acc: string[], id: number) => {
    const data: TCustomData<string | number> | undefined = items.find(item => item[ID_KEY] === id);

    return data ? [...acc, data[NAME_KEY] as string] : acc;
   }, []).join(', ')
   : '';

  const handleArr = (data: TCustomData<TCustomData<string | number>[]>, key: string): TTableData => {
    if(!data[key].length) {
      return null;
    }    

    const {depts, subdepts, groups, items} = data;
    const rows: GridValidRowModel[] = sortArray(data[key], NAME_KEY)
      .reduce((acc: GridValidRowModel[], item: GridValidRowModel, index) => [...acc, {
        id: index,
        index: index + 1,
        ...item,
        ...(isValueExist(item[DEPT_KEY]) && { [DEPT_KEY]: getCategoryName(depts, item, DEPT_KEY) }),
        ...(isValueExist(item[SUBDEPT_KEY]) && { [SUBDEPT_KEY]: getCategoryName(subdepts, item, SUBDEPT_KEY) }),
        ...(isValueExist(item[GROUP_KEY]) && { [GROUP_KEY]: getCategoryName(groups, item, GROUP_KEY) }),
        ...(isValueExist(item[IS_COMPLEX_ITEM_KEY]) && setBooleanCaption(item, IS_COMPLEX_ITEM_KEY)),
        ...(isValueExist(item[IS_COMPLEX_KEY]) && setBooleanCaption(item, IS_COMPLEX_KEY)),
        ...(isValueExist(item[COMPLEX_KEY]) && { [COMPLEX_KEY]: getItemsName(JSON.parse(item[COMPLEX_KEY]), items) }),
        ...(isValueExist(item[IS_VISIBLE_KEY]) && setBooleanCaption(item, IS_VISIBLE_KEY))
      }], []);
    const cols: GridColDef<GridValidRowModel>[] = Object.keys(rows[0])
      .filter(key => key !== 'id')
      .map(item => ({
        field: item,
        //@ts-expect-error
        headerName: CAPTIONS[item],
        //@ts-expect-error
        flex: CAPTIONS[item].length > 4 ? 1 : 0,
        //@ts-expect-error
        width: CAPTIONS[item].length > 4 ? 'auto' : 100,
      } as GridColDef<GridValidRowModel>));

    return {
      rows,
      cols
    };
  }

  const setTableData = (data: TCustomData<TCustomData<string | number>[]>): void => {
    setDeptsTableData(handleArr(data, `${DEPT_KEY}s`));
    setSubeptsTableData(handleArr(data, `${SUBDEPT_KEY}s`));
    setGroupsTableData(handleArr(data, `${GROUP_KEY}s`));
    setItemsTableData(handleArr(data, `items`));
  }

  return {
    deptsTableData,
    subdeptsTableData,
    groupsTableData,
    itemsTableData,
    setTableData
  }
}

export default useTableData;
