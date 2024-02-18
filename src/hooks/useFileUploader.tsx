import { useState, ChangeEvent } from 'react';
import { read, utils } from 'xlsx';
import { fetchArray } from '../utils';
import {
  INDEX_KEY,
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
} from '../utils/constants';

import type { TCustomData } from '../types';

interface IFileUploaderHook {
  depts: TCustomData<string | number>[];
  subdepts: TCustomData<string | number>[];
  groups: TCustomData<string | number>[];
  items: TCustomData<string | number>[];
  rowData: TCustomData<string | number> | null;
  uploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
  getRowData: (data: TCustomData<string | number> | null) => void;
}

const useFileUploader = (): IFileUploaderHook => {
  const [depts, setDepts] = useState<TCustomData<string | number>[]>([]);
  const [subdepts, setSubdepts] = useState<TCustomData<string | number>[]>([]);
  const [groups, setGroups] = useState<TCustomData<string | number>[]>([]);
  const [items, setItems] = useState<TCustomData<string | number>[]>([]);
  const [rowData, setRowData] = useState<TCustomData<string | number> | null>(null);

  const handleComplexItem = (
    items: TCustomData<string | number>[],
    arr: TCustomData<number>[],
    itemId: number
  ): { ids: TCustomData<number>[], summ: number } => {
    const complexArr: TCustomData<number>[] = arr.filter(({ parent }) => parent === itemId).map(({ id, quantity }) => ({ [id]: quantity }));
    const summ: number = complexArr
      .map(item => {
        const id = Number(Object.keys(item)[0]);
        const quantity = Object.values(item)[0];
        //@ts-expect-error
        const { SPRICE }: { SPRICE: number } = items.find(({ SCHID }) => SCHID === id);

        return quantity*SPRICE;
      })
      .reduce((acc, item) => acc + item, 0);

    return {
      ids: complexArr,
      summ
    };
  };

  const handleDepts = (arr: TCustomData<string | number>[]): void => {
    const deptsdArr = arr
      .map(
        ({ RAZDID, RAZDNAME }) => ({
          [ID_KEY]: RAZDID,
          [NAME_KEY]: RAZDNAME
        })
      );

    setDepts(fetchArray(deptsdArr, ID_KEY));
  };

  const handleSubdepts = (arr: TCustomData<string | number>[]): void => {
    const subdeptsArr = arr
      .map(
        ({ SPECID, SPECNAME, RAZDID }) => ({
          [ID_KEY]: SPECID,
          [NAME_KEY]: SPECNAME,
          [DEPT_KEY]: RAZDID
        })
      );

    setSubdepts(fetchArray(subdeptsArr, ID_KEY));
  };

  const handleGroups = (arr: TCustomData<string | number>[]): void => {
    const groupsArr = arr
      .filter(({ ISCAPTION_1 }) => Number(ISCAPTION_1) === 1)
      .map(
        ({ RAZDID, SPECID, ZAGOLOVOK_ID, SCHID, SCHNAME }) => ({
          [ID_KEY]: SCHID,
          [NAME_KEY]: SCHNAME,
          [DEPT_KEY]: RAZDID,
          [SUBDEPT_KEY]: SPECID,
          [GROUP_KEY]: ZAGOLOVOK_ID
        })
      );

    setGroups(fetchArray(groupsArr, ID_KEY));
  };

  const handleItems = (arr: TCustomData<string | number>[]): void => {
    //@ts-expect-error
    const complexItemsArr: TCustomData<number>[] = arr
      .filter(({ ISCOMPLEX }) => Number(ISCOMPLEX) === 1)
      .map(({
        SCHID: parent,
        ID_SCHEMA_IN_COMPLEX: id,
        KOLVO_IN_COMPLEX: quantity
      }) => ({ parent, id, quantity }));
    const itemsArr = arr
      .filter(({ ISCAPTION_1 }) => Number(ISCAPTION_1) === 0)
      .map(
        ({
          RAZDID,
          SPECID,
          ZAGOLOVOK_ID,
          SCHID,
          SCHNAME,
          SPRICE,
          VIEWINCOMPLEX_ONLY,
          ISCOMPLEX,
          VIEWINWEB,
          SORTIROVKA_SPEC
        }, _, array) => {
          const { ids, summ } = handleComplexItem(array, complexItemsArr, SCHID as number);

          return {
            [ID_KEY]: SCHID,
            [NAME_KEY]: SCHNAME,
            [PRICE_KEY]: ISCOMPLEX ? summ : SPRICE,
            [DEPT_KEY]: RAZDID,
            [SUBDEPT_KEY]: SPECID,
            [GROUP_KEY]: ZAGOLOVOK_ID,
            [IS_COMPLEX_ITEM_KEY]: VIEWINCOMPLEX_ONLY || 0,
            [IS_COMPLEX_KEY]: ISCOMPLEX || 0,
            [COMPLEX_KEY]: JSON.stringify(ids),
            [IS_VISIBLE_KEY]: VIEWINWEB || 1,
            [INDEX_KEY]: SORTIROVKA_SPEC
          }
        }
      );

    setItems(fetchArray(itemsArr, ID_KEY));
  };

  const handleUploadedFile = (event: Event): void => {
    //@ts-expect-error
    const { result } = event.target;

    const wb = read(result, { type: 'binary' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const parsedData: TCustomData<string | number>[] = utils.sheet_to_json((ws), { defval: '' });

    handleDepts(parsedData);
    handleSubdepts(parsedData);
    handleGroups(parsedData);
    handleItems(parsedData);
  }

  const uploadFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    const reader = new FileReader();

    if(!files) {
      return;
    }

    reader.readAsBinaryString(files[0]);
    reader.addEventListener('load', handleUploadedFile);
  };

  const getRowData = (data: TCustomData<string | number> | null = null): void => {
    const parsedData = [
      depts,
      subdepts,
      groups,
      items
    ].reduce((acc, item) => ({...acc, [Object.keys(item[0]).length]: item}), {});

    data
      ? setRowData(parsedData[data.key].find((item: TCustomData<string | number>) => item[ID_KEY] === data.id))
      : setRowData(data);
  }

  return {
    depts,
    subdepts,
    groups,
    items,
    rowData,
    uploadFile,
    getRowData
  }
}

export default useFileUploader;