import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '../services/hooks';

import type {
  TActionKeys,
  TItemsArr,
  TPriceList,
  TPricelistExtTypes,
  TPricelistKeys,
  TPricelistTypes
} from '../types';

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

type TExistableListAction = Partial<{
  type: TActionKeys;
  key: TPricelistKeys;
  arr: TItemsArr;
}>;

const createListReducer = (
  state: TPriceList<TPricelistTypes, TItemsArr>,
  action: TExistableListAction
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

const existableListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TExistableListAction) => createListReducer(state, action);
const linkedListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TExistableListAction) => createListReducer(state, action);

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
   * @returns TExistableListAction - данные для сохранения в локальном состоянии
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const setExistableArr = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }) => {
    let arr: TItemsArr = [];
    const payload: TExistableListAction = { type: REMOVE_ACTION_KEY, key, arr };

    if(array.length === 0) {
      return payload;
    }

    arr = array.length === 1
      ? pricelist[TYPES[key]].filter(item => item[categoryKey] === array[0][ID_KEY])
      : pricelist[TYPES[key]].reduce(
          (acc, item) => {
            const dept = array.find(data => data[ID_KEY] === item[categoryKey]);

            return dept ? [...acc, {...item, [CATEGORY_KEY]: dept[NAME_KEY], [LABEL_KEY]: item[NAME_KEY]}] : acc;
          },
          [] as TItemsArr
        );

    return {
      ...payload,
      arr: arr.length === 1 ? [{...arr[0], [CATEGORY_KEY]: array[0][NAME_KEY], [LABEL_KEY]: arr[0][NAME_KEY]}] : arr
    };
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
    setExistableArr({
      array: existableList[TYPES[DEPT_KEY]],
      key: SUBDEPT_KEY,
      categoryKey: DEPT_KEY,
    });
  }, [
    existableList[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    setExistableArr({
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
