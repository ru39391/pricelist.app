import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type {
  TItemData,
  TResParent,
  TResTemplate,
  TResourceData,
  TFilterData,
  TFilterKeys
} from '../types';

import { fetchArray, sortStrArray } from '../utils';
import {
  NAME_KEY,
  RES_ID_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  UPDATED_KEY
} from '../utils/constants';

type THandleParamsList = typeof PARENT_KEY | typeof TEMPLATE_KEY;

interface IFilter {
  filterData: TItemData | null;
  isFilterVisible: boolean;
  filterResultList: TResourceData[];
  parentsList: TResParent[];
  templatesList: TResTemplate[];
  handleFilterData: (data: TFilterData | null) => void;
  setFilterVisibility: (value: boolean) => void;
}

// TODO: необязательная доработка - настроить сохранение параметров фильтра в sessionStorage
// TODO: необязательная доработка - порядок сортировки
// TODO: необязательная доработка - выделение цветом совпадающего текста
const useFilter = (): IFilter => {
  const [filterData, setFilterData] = useState<TFilterData | null>(null);
  const [isFilterVisible, setFilterVisibility] = useState<boolean>(false);
  const [filterResultList, setFilterResultList] = useState<TResourceData[]>([]);
  const [parentsList, setParentsList] = useState<TResParent[]>([]);
  const [templatesList, setTemplatesList] = useState<TResTemplate[]>([]);

  const { res } = useSelector(state => state.pricelist);

  const handleParamsList = (key: THandleParamsList): void => {
    const paramKey = `${key}_${RES_ID_KEY}`;
    const resParamsArr = res.map(item => item[key]);
    const paramsArr = fetchArray(resParamsArr, paramKey);

    if(key === TEMPLATE_KEY) {
      setTemplatesList(sortStrArray(paramsArr, NAME_KEY) as TResTemplate[]);
    } else{
      setParentsList(sortStrArray(paramsArr, NAME_KEY) as TResParent[]);
    }
  }

  const handleFilterData = (data: TFilterData | null): void => {
    if(data && [
      Object.values(data).length === 1,
      data[NAME_KEY] !== undefined,
      data[NAME_KEY] === ''
    ].reduce((acc, value) => acc && value, true)) {
      setFilterData(null);
    } else {
      setFilterData(
        filterData && data
          ? data[UPDATED_KEY] && Boolean(data[UPDATED_KEY]) ? { [NAME_KEY]: data[NAME_KEY] } : { ...filterData, ...data }
          : data
      );
    }
  }

  const filterList = (): void => {
    if(!filterData) {
      setFilterResultList(res);
      return;
    }

    const keys = Object.keys(filterData) as TFilterKeys[];

    setFilterResultList(res.filter((item) => {
      const filterKeysData = keys.reduce(
        (acc, key: TFilterKeys) => ({
          ...acc,
          ...(
            key === NAME_KEY && filterData !== null && filterData[NAME_KEY] !== undefined
              && { [NAME_KEY]: item[NAME_KEY].toLowerCase().includes(filterData[NAME_KEY].toString().toLowerCase()) }
          ),
          ...(
            [PARENT_KEY, TEMPLATE_KEY].includes(key)
              && {
                [PARENT_KEY]: item[PARENT_KEY][`${PARENT_KEY}_${RES_ID_KEY}`] === filterData[PARENT_KEY],
                [TEMPLATE_KEY]: item[TEMPLATE_KEY][`${TEMPLATE_KEY}_${RES_ID_KEY}`] === filterData[TEMPLATE_KEY]
              }
          ),
          ...(
            key === IS_PARENT_KEY
              && { [IS_PARENT_KEY]: item[IS_PARENT_KEY] === Boolean(filterData[IS_PARENT_KEY]) }
          ),
        }), {} as Record<TFilterKeys, boolean>
      );

      return Object.values(filterKeysData).every(value => value);
    }));
  }

  useEffect(() => {
    filterList();
    console.log(filterData);
  }, [
    filterData
  ]);

  useEffect(() => {
    handleParamsList(TEMPLATE_KEY);
    handleParamsList(PARENT_KEY);
    setFilterResultList(res);
  }, [
    res
  ]);

  return {
    filterData,
    isFilterVisible,
    filterResultList,
    parentsList,
    templatesList,
    handleFilterData,
    setFilterVisibility
  };
}

export default useFilter;
