import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type {
  TItemData,
  TResParent,
  TResTemplate,
  TResourceData,
  TLinkedResourceData,
  TFilterData,
  TFilterKeys
} from '../types';

import { fetchArray, sortArrValues } from '../utils';
import {
  ID_KEY,
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
  filterResultList: TLinkedResourceData[];
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
  const [filterResultList, setFilterResultList] = useState<TLinkedResourceData[]>([]);
  const [parentsList, setParentsList] = useState<TResParent[]>([]);
  const [templatesList, setTemplatesList] = useState<TResTemplate[]>([]);

  const { res, reslinks } = useSelector(state => state.pricelist);

  const handleParamsList = (key: THandleParamsList): void => {
    const paramKey = `${key}_${RES_ID_KEY}`;
    const resParamsArr = res.map(item => item[key]);
    const paramsArr = fetchArray(resParamsArr, paramKey);

    if(key === TEMPLATE_KEY) {
      setTemplatesList(sortArrValues(paramsArr, NAME_KEY) as TResTemplate[]);
    } else{
      setParentsList(sortArrValues(paramsArr, NAME_KEY) as TResParent[]);
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

  const setLinkedValue = (arr: TResourceData[]): TLinkedResourceData[] => {
    const resIds = reslinks.map(item => item[ID_KEY]);

    return arr.map(item => ({ ...item, isLinked: resIds.includes(item[RES_ID_KEY]) }));
  }

  const filterList = (): void => {
    const array = setLinkedValue(res);

    if(!filterData) {
      setFilterResultList(array);
      return;
    }

    const keys = Object.keys(filterData) as TFilterKeys[];

    setFilterResultList(array.filter((item) => {
      const filterKeysData = keys.reduce(
        (acc, key: TFilterKeys) => ({
          ...acc,
          ...(
            key === NAME_KEY && filterData[NAME_KEY] !== undefined
              && { [key]: item[key].toLowerCase().includes((filterData[key] as string).toString().toLowerCase()) }
          ),
          ...(
            key === PARENT_KEY && item[PARENT_KEY] !== undefined
            && { [key]: item[key][`${key}_${RES_ID_KEY}`] === filterData[key] }
          ),
          ...(
            key === TEMPLATE_KEY && item[TEMPLATE_KEY] !== undefined
            && { [key]: item[key][`${key}_${RES_ID_KEY}`] === filterData[key] }
          ),
          ...( key === IS_PARENT_KEY && { [key]: item[key] === Boolean(filterData[key]) }),
        }), {} as Record<TFilterKeys, boolean>
      );

      return Object.values(filterKeysData).every(value => value);
    }));
  }

  useEffect(() => {
    filterList();
  }, [
    filterData
  ]);

  useEffect(() => {
    handleParamsList(TEMPLATE_KEY);
    handleParamsList(PARENT_KEY);
    setFilterResultList(
      setLinkedValue(res)
    );
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
