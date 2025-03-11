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

const useResLinks = (): IResLinks => {
  const [existableList, setExistableList] = useReducer(
    existableListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );

  const pricelist = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as TPriceList<TPricelistExtTypes, TItemsArr>
  ));

  const setExistableSubdepts = (arr: TItemsArr) => {
    let subdepts: TItemsArr = [];

    if(arr.length === 0) {
      setExistableList({
        type: REMOVE_ACTION_KEY,
        key: SUBDEPT_KEY,
        arr: subdepts
      });
      return;
    }

    subdepts = arr.length === 1
      ? pricelist[TYPES[SUBDEPT_KEY]].filter(item => item[DEPT_KEY] === arr[0][ID_KEY])
      : pricelist[TYPES[SUBDEPT_KEY]].reduce(
          (acc, item) => {
            const dept = arr.find(data => data[ID_KEY] === item[DEPT_KEY]);

            return dept ? [...acc, {...item, [CATEGORY_KEY]: dept[NAME_KEY]}] : acc;
          },
          [] as TItemsArr
        );

    setExistableList({
      type: ADD_ACTION_KEY,
      key: SUBDEPT_KEY,
      arr: subdepts.length === 1 ? subdepts.map(data => ({...data, [CATEGORY_KEY]: data[NAME_KEY]})) : subdepts
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
    setExistableSubdepts(existableList[TYPES[DEPT_KEY]]);
  }, [
    existableList[TYPES[DEPT_KEY]]
  ]);
}

export default useResLinks;
