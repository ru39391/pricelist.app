import { createSlice } from '@reduxjs/toolkit'

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TActionKeys,
  TPricelistTypes,
  TFormController
} from '../../types';

import { DEPT_KEY, SUBDEPT_KEY, GROUP_KEY } from '../../utils/constants';

export type TFormData = {
  action: TActionKeys;
  type: TPricelistTypes;
  data: TItemData;
  values?: TItemData;
  items?: TItemsArr;
  isFormHidden?: boolean;
};

export type TFormAction = {
  payload: {
    title?: string;
    desc?: string;
    data?: TFormData | null;
    values?: TItemData | null;
    items?: TCustomData<TItemsArr>;
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
    }),
    setSelectedItems(state, action: TFormAction) {
      const keys: TCustomData<string> = {
        [DEPT_KEY]: 'currDeptsList',
        [SUBDEPT_KEY]: 'currSubdeptsList',
        [GROUP_KEY]: 'currGroupsList'
      };
      const { arr, type } = action.payload.items
        ? {
          arr: Object.values(action.payload.items)[0],
          type: keys[Object.keys(action.payload.items)[0]],
        }
        : { arr: [], type: '' };

      return {
        ...state,
        ...( type && { [type]: arr } )
      }
    },
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
  setSelectedItems
} = formSlice.actions;
