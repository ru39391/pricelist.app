import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
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
  ITEM_KEY
} from '../utils/constants';

import { TPricelistState } from '../services/slices/pricelist-slice';

export type TPricelistStateKeys = keyof TPricelistState;

// TODO: провести рефакторинг файла
// TODO: разобраться с заменой TPricelistTypes и TPricelistExtTypes на более гибкий вариант, например, keyof TPricelistState
export type TPricelistKeys = typeof DEPT_KEY | typeof SUBDEPT_KEY | typeof GROUP_KEY | typeof ITEM_KEY;

export type TPricelistTypes = 'depts' | 'subdepts' | 'groups' | 'pricelist';

export type TPricelistExtTypes = TPricelistTypes | 'reslinks';

export type TActionKeys = typeof ADD_ACTION_KEY | typeof EDIT_ACTION_KEY | typeof REMOVE_ACTION_KEY;

export type THandledItemKeys = typeof CREATED_KEY | typeof UPDATED_KEY | typeof REMOVED_KEY;

export type TResLinkParams = typeof IS_COMPLEX_DATA_KEY | typeof IS_GROUP_IGNORED_KEY | typeof IS_GROUP_USED_KEY;

export type TCustomData<T> = {
  [key: string]: T;
};

export type TPriceList<T> = {
  [key in TPricelistTypes]: T;
};

export type TItemData = TCustomData<string | number>;

export type TItemsArr = TItemData[];

// TODO: разобраться с заменой TPricelistData на Record<TPricelistExtTypes, TItemsArr>;
export type TPricelistData =  TCustomData<TItemsArr>;

export type TPricelistResponse = {
  action: TActionKeys;
  type: string;
  ids: number[];
};

export type TResponseItems = {
  success: boolean;
  message?: string;
  counter: TCustomData<number>;
  succeed?: TItemsArr;
  failed?: TItemsArr;
  inValid: TItemsArr;
};

export type TResponseDefault = {
  success: boolean;
  data?: TResponseItems;
  errors?: TResponseItems;
  meta: TCustomData<string | number>;
};

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
  name: string;
  uri: string;
  parent: TResParent;
  template: TResTemplate;
  publishedon: TResDate;
  editedon: TResDate;
};

export type TLinkedResourceData = TResourceData & { isLinked: boolean; };

export type TResourceKeys = keyof TResourceData;

export type TLinkedData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
};

export type TLinkedItemData = {
  [DEPT_KEY]: number;
  [SUBDEPT_KEY]: number;
};

export type TLinkedItem = TLinkedData & TLinkedItemData & {
  [PRICE_KEY]: number;
  [INDEX_KEY]: number;
  [GROUP_KEY]: number;
  [IS_VISIBLE_KEY]: number;
};

export type TLinkedItemKeys = keyof TLinkedItem;

export type TLinkedGroup = TLinkedData & TLinkedItemData & {
  pricelist: TLinkedItem[];
};

export type TLinkedGroupKeys = keyof TLinkedGroup;

export type TLinkedSubdept = TLinkedData & {
  [DEPT_KEY]: number;
  groups: TLinkedGroup[];
  pricelist: TLinkedItem[];
};

export type TLinkedSubdeptKeys = keyof TLinkedSubdept;

export type TLinkedDept = TLinkedData & {
  subdepts: TLinkedSubdept[];
};

export type TLinkedDeptKeys = keyof TLinkedDept;

export type TResLinkedAction = {
  action: string;
  data: TItemData;
};

export type TLinkedResData = {
  action?: string;
  data?: TItemData;
  items?: TItemsArr;
  key?: string;
};

export type TUrlData = {
  type: TPricelistTypes | string;
  id: number | null;
};

export type TParserData = {
  type: TPricelistTypes;
  items: TItemsArr;
};

export type TFilterData = {
  [NAME_KEY]?: string;
  [PARENT_KEY]?: number;
  [TEMPLATE_KEY]?: number;
  [IS_PARENT_KEY]?: number;
  [UPDATED_KEY]?: number;
};

export type TFilterKeys = keyof TFilterData;
