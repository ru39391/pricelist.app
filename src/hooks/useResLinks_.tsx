import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutocompleteChangeReason } from '@mui/material';

import { useSelector } from '../services/hooks';

import type {
  TActionKeys,
  TItemsArr,
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
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY
} from '../utils/constants';

type TListReducerOptions = Partial<{
  type: TActionKeys;
  key: TPricelistKeys;
  arr: TItemsArr;
}>;

type TListHandlerOptions = Omit<Required<TListReducerOptions>, 'type'> & { action: AutocompleteChangeReason; };

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
    case EDIT_ACTION_KEY:
      return {
        ...state,
        ...( action.key && { [TYPES[action.key]]: [...state[TYPES[action.key]], ...action.arr || []] } )
      };
    case REMOVE_ACTION_KEY:
      return {
        ...state,
        ...( action.key && { [TYPES[action.key]]: action.arr || [] } )
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
   * Формирует и устанавливает списки элементов прайслиста в зависимости от их родительских категорий
   * @returns TListReducerOptions - данные для сохранения в локальном состоянии
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const handleResList = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }) => {
    let arr: TItemsArr = [];
    const payload: TListReducerOptions = { type: REMOVE_ACTION_KEY, key, arr };

    if(array.length === 0) {
      return payload;
    }

    arr = array.length === 1
      ? pricelist[TYPES[key]].filter(item => item[categoryKey] === array[0][ID_KEY])
      : sortArrValues(pricelist[TYPES[key]], NAME_KEY).reduce(
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

  const handleListOptions = (data: TListHandlerOptions) => {
    let arr: TItemsArr = [];
    const { action, key, arr: array } = data;
    const payload: TListReducerOptions = { type: REMOVE_ACTION_KEY, key, arr };
    const list = sortArrValues(linkedList[TYPES[key]], NAME_KEY);
    const sortOption = key === DEPT_KEY ? NAME_KEY : CATEGORY_KEY;

    if(action !== 'selectOption') {
      return action === 'clear'
        ? payload
        : {...payload, arr: sortArrValues(list.filter(item => item[ID_KEY] !== array[0][ID_KEY]), sortOption)};
    }

    arr = sortArrValues(
      fetchArray([...list, ...array], ID_KEY),
      sortOption
    );

    return {...payload, type: EDIT_ACTION_KEY, arr};
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
    handleResList({
      array: existableList[TYPES[DEPT_KEY]],
      key: SUBDEPT_KEY,
      categoryKey: DEPT_KEY,
    });
  }, [
    existableList[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    handleResList({
      array: existableList[TYPES[SUBDEPT_KEY]],
      key: GROUP_KEY,
      categoryKey: SUBDEPT_KEY,
    });
  }, [
    existableList[TYPES[SUBDEPT_KEY]]
  ]);

  return {
    existableList
  }
}

export default useResLinkz;
