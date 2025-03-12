import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutocompleteChangeReason } from '@mui/material';

import { useSelector } from '../services/hooks';

import type {
  TItemsArr,
  TListReducerOptions,
  TPriceList,
  TPricelistExtTypes,
  TPricelistKeys,
  TPricelistTypes
} from '../types';

import { sortArrValues, fetchArray } from '../utils';

import {
  TYPES,
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  LABEL_KEY,
  CATEGORY_KEY,
  RESLINKS_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY
} from '../utils/constants';

type TListHandlerOptions = Omit<Required<TListReducerOptions>, 'type'> & { action: AutocompleteChangeReason; };

interface IResLinks {
  existableList: TPriceList<TPricelistTypes, TItemsArr>;
  linkedList: TPriceList<TPricelistTypes, TItemsArr>;
  handleListOptions: (data: TListHandlerOptions) => TListReducerOptions;
}

const createListReducer = (
  state: TPriceList<TPricelistTypes, TItemsArr>,
  action: TListReducerOptions
) => {
  switch (action.type) {
    case ADD_ACTION_KEY:
      return {
        ...state,
        ...( action.key && { [TYPES[action.key]]: action.arr || [] } )
      };
    case REMOVE_ACTION_KEY:
      return {
        ...state,
        ...( action.key && { [TYPES[action.key]]: [] } )
      };
    default:
      return { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] };
  }
};

const existableListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TListReducerOptions) => createListReducer(state, action);
const linkedListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TListReducerOptions) => createListReducer(state, action);

const useResLinkz = (): IResLinks => {
  const [existableList, setExistableList] = useReducer(
    existableListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );
  const [linkedList, setLinkedList] = useReducer(
    linkedListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );

  const pricelist = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as TPriceList<TPricelistExtTypes, TItemsArr>
  ));

  /**
   * Возвращает списки элементов прайслиста в зависимости от их родительских категорий
   * @returns TListReducerOptions - данные для сохранения в локальном состоянии
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const handleResList = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }): TListReducerOptions => {
    console.log({ array, key, categoryKey });
    let arr: TItemsArr = [];
    const payload: TListReducerOptions = { type: REMOVE_ACTION_KEY, key, arr };

    if(array.length === 0) {
      return payload;
    }

    arr = array.length === 1
      ? pricelist[TYPES[key]].filter(item => item[categoryKey] === array[0][ID_KEY])
      : sortArrValues([...pricelist[TYPES[key]]], NAME_KEY).reduce(
          (acc, item) => {
            const dept = array.find(data => data[ID_KEY] === item[categoryKey]);

            return dept ? [...acc, {...item, [CATEGORY_KEY]: dept[NAME_KEY], [LABEL_KEY]: item[NAME_KEY]}] : acc;
          },
          [] as TItemsArr
        );

    return {
      ...payload,
      type: ADD_ACTION_KEY,
      arr: arr.length === 1 ? [{...arr[0], [CATEGORY_KEY]: array[0][NAME_KEY], [LABEL_KEY]: arr[0][NAME_KEY]}] : sortArrValues(arr, CATEGORY_KEY)
    };
  };

  /**
   * Устанавливает списки выбранных элементов прайслиста
   * @property {TItemsArr} array - массив элементов
   * @property {TPricelistKeys} key - тип элементов
   * @property {AutocompleteChangeReason} action - тип взаимодействия с выпадающим списком
   */
  const handleListOptions = ({ action, key, arr }: TListHandlerOptions): void => {
    const payload: TListReducerOptions = { type: REMOVE_ACTION_KEY, key, arr };
    //console.log({ action, key, arr });

    if(action == 'clear') {
      setLinkedList(payload);
      return;
    }

    setLinkedList({
      ...payload,
      type: ADD_ACTION_KEY,
      arr: action == 'removeOption' ? arr : fetchArray([...linkedList[TYPES[key]], ...arr], ID_KEY)
    });
  };

  useEffect(() => {
    setExistableList({
      type: ADD_ACTION_KEY,
      key: DEPT_KEY,
      arr: pricelist[TYPES[DEPT_KEY]]
    });
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    setExistableList(
      handleResList({
        array: linkedList[TYPES[DEPT_KEY]],
        key: SUBDEPT_KEY,
        categoryKey: DEPT_KEY,
      })
    );
  }, [
    linkedList[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    setExistableList(
      handleResList({
        array: linkedList[TYPES[SUBDEPT_KEY]],
        key: GROUP_KEY,
        categoryKey: SUBDEPT_KEY,
      })
    );
  }, [
    linkedList[TYPES[SUBDEPT_KEY]]
  ]);

  return {
    existableList,
    linkedList,
    handleListOptions
  }
}

export default useResLinkz;
