import { createSlice } from '@reduxjs/toolkit'

import type {
  TComparedFileData,
  TFormController,
  TFormData,
  TItemsArr,
  TItemData
} from '../../types';

export type TFormAction = {
  payload: {
    title?: string;
    desc?: string;
    data?: TFormData | null;
    values?: TItemData | null;
    items?: TComparedFileData;
    isParserData?: boolean;
    formController?: TFormController;
  };
};

export type TFormState = {
  isVisible: boolean;
  formTitle: string;
  formDesc: string;
  formData: TFormData | null;
  isParserData: boolean;
  formValues: TItemData;
  currDeptsList: TItemsArr;
  currSubdeptsList: TItemsArr;
  currGroupsList: TItemsArr;
  formController?: TFormController;
};

const initialState: TFormState = {
  isVisible: false,
  formTitle: '',
  formDesc: '',
  formData: null,
  isParserData: false,
  formValues: {},
  currDeptsList: [],
  currSubdeptsList: [],
  currGroupsList: [],
  formController: undefined
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormVisible: (state, action: TFormAction) => ({
      ...state,
      isVisible: true,
      formTitle: action.payload.title || '',
      formDesc: action.payload.desc || '',
      isParserData: Boolean(action.payload.isParserData) || false,
      formController: action.payload.formController || undefined
    }),
    setFormHidden: (state) => ({
      ...state,
      isVisible: false,
      formTitle: '',
      formDesc: '',
      formData: null,
      isParserData: false,
      formValues: {},
      formController: undefined
    }),
    setFormData: (state, action: TFormAction) => ({
      ...state,
      formData: action.payload.data || null
    }),
    setFormValues: (state, action: TFormAction) => ({
      ...state,
      formValues: action.payload.values || {}
    })
  }
});

export const {
  reducer: formReducer,
  actions: formActions
} = formSlice;
export const {
  setFormVisible,
  setFormHidden,
  setFormData,
  setFormValues,
} = formSlice.actions;
