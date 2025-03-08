import { createSlice } from '@reduxjs/toolkit'

import type { TItemData, TItemsArr, TPricelistTypes } from '../../types';
import { ID_KEY } from '../../utils/constants';

export type TFileAction = {
  payload: {
    depts?: TItemsArr;
    subdepts?: TItemsArr;
    groups?: TItemsArr;
    pricelist?: TItemsArr;
    data?: TItemData | null;
    items?: TItemsArr;
    key?: TPricelistTypes;
    errorMsg?: string;
    isLoading?: boolean;
  };
};

export type TFileState = {
  depts: TItemsArr;
  subdepts: TItemsArr;
  groups: TItemsArr;
  pricelist: TItemsArr;
  rowData: TItemData | null;
  isFileUploading: boolean;
  isFileUploadingFailed: boolean;
  errorMsg: string;
};

const initialState: TFileState = {
  depts: [],
  subdepts: [],
  groups: [],
  pricelist: [],
  rowData: null,
  isFileUploading: false,
  isFileUploadingFailed: false,
  errorMsg: '',
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    getFileUploading: (state, action: TFileAction) => ({
      ...state,
      isFileUploading: Boolean(action.payload.isLoading)
    }),
    getFileUploadingSucceed: (state, action: TFileAction) => ({
      ...state,
      depts: action.payload.depts || [],
      subdepts: action.payload.subdepts || [],
      groups: action.payload.groups || [],
      pricelist: action.payload.pricelist || [],
      isFileUploading: false,
      isFileUploadingFailed: false,
      errorMsg: ''
    }),
    getFileUploadingFailed: (state, action: TFileAction) => ({
      ...state,
      isFileUploading: false,
      isFileUploadingFailed: true,
      errorMsg: action.payload.errorMsg || ''
    }),
    setRowData: (state, action: TFileAction) => ({
      ...state,
      rowData: action.payload.data || null
    }),
    removeItems(state, action: TFileAction) {
      const { key, items } = {
        key: action.payload.key as TPricelistTypes,
        items: action.payload.items as TItemsArr || []
      };

      return {
        ...state,
        ...(
          key && items.length > 0 && {[key]: [...state[key]].filter(item => !items.map(data => data[ID_KEY]).includes(item[ID_KEY]))}
        )
      }
    },
    resetList: (state) => ({
      ...state,
      depts: [],
      subdepts: [],
      groups: [],
      pricelist: [],
      rowData: null,
    }),
  }
});

export const {
  reducer: fileReducer,
  actions: fileActions
} = fileSlice;
export const {
  getFileUploading,
  getFileUploadingSucceed,
  getFileUploadingFailed,
  setRowData,
  removeItems,
  resetList
} = fileSlice.actions;
