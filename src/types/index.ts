import { AutocompleteChangeReason } from '@mui/material';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  RESLINKS_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_USED_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_VISIBLE_KEY,
  TYPES,
  ITEM_KEY
} from '../utils/constants';

import { TPricelistState } from '../services/slices/pricelist-slice';

export type TPricelistStateKeys = keyof TPricelistState;

// TODO: провести рефакторинг файла
// TODO: разобраться с заменой TPricelistTypes и TPricelistExtTypes на более гибкий вариант, например, keyof TPricelistState
export type TPricelistKeys = keyof typeof TYPES;

export type TPricelistTypes = typeof TYPES[TPricelistKeys];

export type TPricelistExtTypes = TPricelistTypes | typeof RESLINKS_KEY;

export type TActionKeys = typeof ADD_ACTION_KEY | typeof EDIT_ACTION_KEY | typeof REMOVE_ACTION_KEY;

export type THandledItemKeys = typeof CREATED_KEY | typeof UPDATED_KEY | typeof REMOVED_KEY;

export type TResLinkParams = typeof IS_COMPLEX_DATA_KEY | typeof IS_GROUP_IGNORED_KEY | typeof IS_GROUP_USED_KEY;

export type TCustomData<T> = {
  [key: string]: T;
};

// TODO: отказаться от TCustomData
export type TItemData = TCustomData<string | number>;

export type TItemsArr = TItemData[];

export type TItemsArrData = {
  type: TPricelistTypes;
  items: TItemsArr;
};

export type TPriceList<K extends TPricelistTypes | TPricelistExtTypes> = {
  [key in K]: TItemsArr;
};

// TODO: разобраться с заменой TPricelistData на TPriceList<TPricelistExtTypes, TItemsArr>;
export type TPricelistData =  TCustomData<TItemsArr>;

export type TPriceListData =  TPriceList<TPricelistTypes>;

export type TFormData = {
  action: TActionKeys;
  type: TPricelistTypes;
  data: TItemData;
  values?: TItemData;
  items?: TComparedFileData;
  isFormHidden?: boolean;
};

export type TPricelistDataThunk = {
  action: string; // TODO: типизировать action как TActionKeys
  type: TPricelistExtTypes | null;
  items: TItemsArr;
};

export type TPricelistResponse = {
  action: TActionKeys;
  type: string; // TODO: вероятно, должен быть TPricelistTypes
  ids: number[];
};

export type TResponseItems = {
  success: boolean;
  message?: string;
  counter: TCustomData<number>;
  inValid: TItemsArr;
} & Partial<Record<'succeed' | 'failed', TItemsArr>>;

export type TResponseDefault = {
  success: boolean;
  meta: TCustomData<string | number>;
} & Partial<Record<'data' | 'errors', TResponseItems>>;

export type TErrorResponseData = {
  data: TResponseDefault;
};

export type TErrorResponse = {
  response: TErrorResponseData;
};

export type TResponseData = {
  success: boolean[];
  data: TCustomData<TItemsArr>;
};

export type TResParent = {
  parent_id: number;
  name: string;
  uri: string;
};

export type TResParentKeys = keyof TResParent;

export type TResTemplate = {
  template_id: number;
  name: string;
};

export type TResTemplateKeys = keyof TResTemplate;

type TResDate = {
  value: number;
  date: string;
};

export type TResourceData = {
  id: number;
  isParent: boolean;
  parent: TResParent;
  template: TResTemplate;
} & Record<'name' | 'uri', string> & Record<'publishedon' | 'editedon', TResDate>;

export type TLinkedResourceData = TResourceData & { isLinked: boolean; };

export type TResourceKeys = keyof TResourceData;

export type TLinkedData = {
  [key in typeof ID_KEY | typeof NAME_KEY]: key extends typeof ID_KEY ? number : string;
};

export type TLinkedItemData = Record<typeof DEPT_KEY | typeof SUBDEPT_KEY, number>;

export type TLinkedItem = TLinkedData & TLinkedItemData & {
  [key in typeof PRICE_KEY | typeof INDEX_KEY | typeof GROUP_KEY | typeof IS_VISIBLE_KEY]: number;
};

export type TLinkedItemKeys = keyof TLinkedItem;

export type TLinkedPricelist = {
  [key in TPricelistTypes]: key extends typeof TYPES[typeof ITEM_KEY]
    ? TLinkedItem[] : key extends typeof TYPES[typeof GROUP_KEY]
    ? TLinkedGroup[] : key extends typeof TYPES[typeof SUBDEPT_KEY]
    ? TLinkedSubdept[] : never;
};

export type TLinkedGroup = TLinkedData & TLinkedItemData & Pick<TLinkedPricelist, typeof TYPES[typeof ITEM_KEY]>;

export type TLinkedGroupKeys = keyof TLinkedGroup;

export type TLinkedSubdept = TLinkedData
  & Record<typeof DEPT_KEY, number>
  & Pick<TLinkedPricelist, typeof TYPES[typeof ITEM_KEY] | typeof TYPES[typeof GROUP_KEY]>;

export type TLinkedSubdeptKeys = keyof TLinkedSubdept;

export type TLinkedDept = TLinkedData & Pick<TLinkedPricelist, typeof TYPES[typeof SUBDEPT_KEY]>;

export type TLinkedDeptKeys = keyof TLinkedDept;

export type TResLinkedAction = {
  action: string;
  data: TItemData;
};

export type TLinkedResData = {
  items?: TItemsArr;
  key?: string;
} & Partial<TResLinkedAction>;

export type TUrlData = {
  type: TPricelistTypes | string;
  id: number | null;
};

export type TFilterData = Partial<{
  [key in typeof NAME_KEY | typeof PARENT_KEY | typeof TEMPLATE_KEY | typeof IS_PARENT_KEY | typeof UPDATED_KEY]: key extends typeof NAME_KEY ? string : number;
}>;

export type TFilterKeys = keyof TFilterData;

export type TFormController = {
  actionBtnCaption: string;
  disabled: boolean;
  handleClick: () => void;
} & Partial<Record<'icon' | 'color' | 'introText', string>>;

// useResLinks
export type TLinkedListConfigAction = 'SET_COMPLEX_DATA'
  | 'UNSET_COMPLEX_DATA'
  | 'SET_GROUP_IGNORED'
  | 'UNSET_GROUP_IGNORED'
  | 'SET_GROUP_USED'
  | 'UNSET_GROUP_USED';

export type TLinkedListData = {
  array: TItemsArr;
  key: TPricelistKeys;
  categoryKey: TPricelistKeys;
};

export type TListReducerOptions = Partial<{
  type: TActionKeys;
  key: TPricelistKeys;
  arr: TItemsArr;
}>;

export type TLinkedListConfig = Record<TResLinkParams, boolean> | null;

export type TListHandlerOptions = Omit<Required<TListReducerOptions>, 'type'> & { action: AutocompleteChangeReason; };

export type TListTogglerData = Omit<Required<TListReducerOptions>, 'type'> & { data: TItemData; };

export type TActiveLinkedItem = Pick<Required<TListReducerOptions>, 'arr'> & Pick<TLinkedData, typeof ID_KEY>;

export type TResItemContext = {
  linkedItemsData: Record<string, TItemsArr>;
  linkedListConfig: TLinkedListConfig;
  handleLinkedListConfig: (type: TLinkedListConfigAction, data?: TLinkedListConfig) => void;
  handleListOptions: (data: TListHandlerOptions) => void;
  toggleLinkedItems: (data: TListTogglerData) => void;
  isLinkedItemActive: (data: TActiveLinkedItem) => boolean;
};

// comparedFileData
export type TCategoryData = {
  data: TPricelistData;
  category: string | undefined;
  params: TCustomData<number | null> | null;
};

export type TComparedFileData = Record<THandledItemKeys, TPricelistData>;

export type TComparedItemsAction = 'SET_NAME_DATA'
  | 'SET_PRICE_DATA'
  | 'SET_VISIBLE_DATA'
  | 'SET_ITEMS_DATA';

export type TComparedItems = Record<typeof NAME_KEY | typeof PRICE_KEY | typeof IS_VISIBLE_KEY | typeof ITEM_KEY, TItemsArr>;

export type TFileDataNav = {
  key: string;
  caption: string;
  counter: number;
  data: TItemsArr
}[];

export type TFileCategoryData = {
  category: THandledItemKeys;
  subCategory: TPricelistTypes;
  arr?: TItemsArr;
};

export type TFileActionsData = Record<THandledItemKeys, { action: TActionKeys; title: string; }>;
