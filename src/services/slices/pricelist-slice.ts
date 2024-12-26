import { createSlice } from '@reduxjs/toolkit'

import type {
  TResourceData,
  TItemData,
  TItemsArr,
  TPricelistResponse,
  TPricelistExtTypes
} from '../../types';

import { handleFetchedArr } from '../../utils';
import {
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ID_KEY,
  NAME_KEY,
  PARENT_KEY,
  TYPES,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  RESLINKS_KEY
} from '../../utils/constants';

export type TPricelistAction = {
  payload: {
    depts?: TItemsArr;
    subdepts?: TItemsArr;
    groups?: TItemsArr;
    pricelist?: TItemsArr;
    res?: TResourceData[];
    reslinks?: TItemsArr;
    alertType?: string;
    alertMsg?: string;
    type?: TPricelistExtTypes;
    items?: TItemsArr;
  };
};

export type TPricelistState = {
  depts: TItemsArr;
  subdepts: TItemsArr;
  groups: TItemsArr;
  pricelist: TItemsArr;
  res: TResourceData[];
  reslinks: TItemsArr;
  isPricelistLoading: boolean;
  isPricelistSucceed: boolean;
  isPricelistFailed: boolean;
  alertType: string;
  alertMsg: string;
  response: TPricelistResponse | null;
};

const initialState: TPricelistState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  res: [],
  reslinks: [],
  isPricelistLoading: false,
  isPricelistSucceed: false,
  isPricelistFailed: false,
  alertType: 'info',
  alertMsg: '',
  response: null
};

const pricelistSlice = createSlice({
  name: 'pricelist',
  initialState,
  reducers: {
    getPricelistLoading: (state) => ({
      ...state,
      isPricelistLoading: true
    }),
    getPricelistSucceed: (state, action: TPricelistAction) => ({
      ...state,
      ...[
        TYPES[DEPT_KEY],
        TYPES[SUBDEPT_KEY],
        TYPES[GROUP_KEY],
        TYPES[ITEM_KEY]
      ].reduce(
        (acc, key) => ({ ...acc, [key]: handleFetchedArr(action.payload[key] || []) }), {}
      ),
      res: action.payload.res?.map(item => ({
        ...item,
        [NAME_KEY]: item[NAME_KEY].replace(/<[^>]*>/g, ''),
        [PARENT_KEY]: {
          ...item[PARENT_KEY],
          [NAME_KEY]: item[PARENT_KEY][NAME_KEY].replace(/<[^>]*>/g, '')
        },
      })) || [],
      reslinks: action.payload.reslinks || [],
      isPricelistLoading: false,
      isPricelistSucceed: true,
      isPricelistFailed: false,
      alertType: '',
      alertMsg: '',
      response: null
    }),
    getPricelistFailed: (state, action: TPricelistAction) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: true,
      alertType: 'error',
      alertMsg: action.payload.alertMsg || '',
      response: null
    }),
    createItems(state, action: TPricelistAction) {
      const { type, items } = {
        type: action.payload.type as TPricelistExtTypes,
        items: action.payload.items as TItemsArr
      };

      return {
        ...state,
        ...(
          type && Array.isArray(items)
            && { [type]: type === RESLINKS_KEY ? [...state[type], ...items] : handleFetchedArr([...state[type], ...items]) }
        ),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || '',
        response: {
          action: ADD_ACTION_KEY,
          type,
          ids: items ? items.map((item) => item[ID_KEY] as number) : []
        }
      };
    },
    updateItems(state, action: TPricelistAction) {
      const { type, items } = {
        type: action.payload.type as TPricelistExtTypes,
        items: action.payload.items as TItemsArr
      };
      const ids = items ? items.map((item) => item[ID_KEY] as number) : [];
      const currItems = [...state[type]].filter((item: TItemData) => !ids.includes(item[ID_KEY] as number));

      return {
        ...state,
        ...(
          type && Array.isArray(items)
            && { [type]: type === RESLINKS_KEY ? [...currItems, ...items] : handleFetchedArr([...currItems, ...items]) }
        ),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || '',
        response: { action: EDIT_ACTION_KEY, type, ids }
      };
    },
    removeItems(state, action: TPricelistAction) {
      const { type, items } = {
        type: action.payload.type as TPricelistExtTypes,
        items: action.payload.items as TItemsArr
      };
      const ids = items ? items.map((item) => item[ID_KEY] as number) : [];

      return {
        ...state,
        ...(type && { [type]: [...state[type]].filter((item: TItemData) => !ids.includes(item[ID_KEY] as number)) }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || '',
        response: { action: REMOVE_ACTION_KEY, type, ids }
      };
    },
    resetPricelist: (state) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: false,
      alertType: 'info',
      alertMsg: '',
    }),
  }
});

export const {
  reducer: pricelistReducer,
  actions: pricelistActions
} = pricelistSlice;
export const {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
  createItems,
  updateItems,
  removeItems,
  resetPricelist
} = pricelistSlice.actions;
