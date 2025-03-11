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

const existableListReducer = (
  state: TPriceList<TPricelistTypes, TItemsArr>,
  action: { type?: TActionKeys; key?: TPricelistKeys; arr?: TItemsArr; }
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

const useResLinkz = (): IResLinks => {
  const [existableList, setExistableList] = useReducer(
    existableListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );

  const pricelist = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as TPriceList<TPricelistExtTypes, TItemsArr>
  ));

  const setExistableArr = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }) => {
    let arr: TItemsArr = [];

    if(array.length === 0) {
      setExistableList({
        type: REMOVE_ACTION_KEY,
        key,//: SUBDEPT_KEY,
        arr
      });
      return;
    }

    arr = array.length === 1
      ? pricelist[TYPES[key]].filter(item => item[categoryKey] === array[0][ID_KEY]) // DEPT_KEY
      : pricelist[TYPES[key]].reduce(
          (acc, item) => {
            const dept = array.find(data => data[ID_KEY] === item[categoryKey]);

            return dept ? [...acc, {...item, [CATEGORY_KEY]: dept[NAME_KEY], [LABEL_KEY]: item[NAME_KEY]}] : acc;
          },
          [] as TItemsArr
        );

    setExistableList({
      type: ADD_ACTION_KEY,
      key,//: SUBDEPT_KEY,
      arr: arr.length === 1 ? [{...arr[0], [CATEGORY_KEY]: array[0][NAME_KEY], [LABEL_KEY]: arr[0][NAME_KEY]}] : arr
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
