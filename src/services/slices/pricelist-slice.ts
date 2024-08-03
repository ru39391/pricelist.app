import { createSlice } from '@reduxjs/toolkit'

import type { TItemData, TItemsArr } from '../../types';

import { ID_KEY } from '../../utils/constants';

export type TPricelistAction = {
  payload: {
    depts?: TItemsArr;
    subdepts?: TItemsArr;
    groups?: TItemsArr;
    pricelist?: TItemsArr;
    alertType?: string;
    alertMsg?: string;
    key?: string;
    items?: TItemsArr;
  };
};

export type TPricelistState = {
  depts: TItemsArr;
  subdepts: TItemsArr;
  groups: TItemsArr;
  pricelist: TItemsArr;
  isPricelistLoading: boolean;
  isPricelistSucceed: boolean;
  isPricelistFailed: boolean;
  alertType: string;
  alertMsg: string;
};

const initialState: TPricelistState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  isPricelistLoading: false,
  isPricelistSucceed: false,
  isPricelistFailed: false,
  alertType: 'info',
  alertMsg: '',
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
      depts: action.payload.depts || [],
      subdepts: action.payload.subdepts || [],
      groups: action.payload.groups || [],
      pricelist: action.payload.pricelist || [],
      isPricelistLoading: false,
      isPricelistSucceed: true,
      isPricelistFailed: false,
      alertType: '',
      alertMsg: ''
    }),
    getPricelistFailed: (state, action: TPricelistAction) => ({
      ...state,
      isPricelistLoading: false,
      isPricelistSucceed: false,
      isPricelistFailed: true,
      alertType: 'error',
      alertMsg: action.payload.alertMsg || ''
    }),
    createItems(state, action: TPricelistAction) {
      const {key, items} = action.payload;
      console.log(action.payload);

      return {
        ...state,
        ...([key] && Array.isArray(items) && {
          [key as string]: [...state[key as string], ...items]
        }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || ''
      };
    },
    updateItems(state, action: TPricelistAction) {
      const {key, items} = action.payload;
      const ids = items ? items.map((item) => item[ID_KEY] as number) : [];
      const currItems = [...state[key as string]].filter((item: TItemData) => !ids.includes(item[ID_KEY] as number));
      console.log(action.payload);

      return {
        ...state,
        ...([key] && Array.isArray(items) && {
          [key as string]: [...currItems, ...items]
        }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || ''
      };
    },
    removeItems(state, action: TPricelistAction) {
      const {key, items} = action.payload;
      const ids = items ? items.map((item) => item[ID_KEY] as number) : [];

      return {
        ...state,
        ...([key] && {
          [key as string]: [...state[key as string]].filter((item: TItemData) => !ids.includes(item[ID_KEY] as number))
        }),
        isPricelistLoading: false,
        isPricelistSucceed: true,
        isPricelistFailed: false,
        alertType: 'success',
        alertMsg: action.payload.alertMsg || ''
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
