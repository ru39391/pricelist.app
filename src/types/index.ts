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
//typeof DEPT_KEY | typeof SUBDEPT_KEY | typeof GROUP_KEY | typeof ITEM_KEY;

export type TPricelistTypes = typeof TYPES[TPricelistKeys];
//'depts' | 'subdepts' | 'groups' | 'pricelist';

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

export type TPriceList<K extends TPricelistTypes | TPricelistExtTypes, T> = {
  [key in K]: T;
};

// TODO: разобраться с заменой TPricelistData на TPriceList<TPricelistExtTypes, TItemsArr>;
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
  //succeed?: TItemsArr;
  //failed?: TItemsArr;
  inValid: TItemsArr;
} & Partial<Record<'succeed' | 'failed', TItemsArr>>;

export type TResponseDefault = {
  success: boolean;
  //data?: TResponseItems;
  //errors?: TResponseItems;
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
  //name: string;
  //uri: string;
  parent: TResParent;
  template: TResTemplate;
  //publishedon: TResDate;
  //editedon: TResDate;
} & Record<'name' | 'uri', string> & Record<'publishedon' | 'editedon', TResDate>;

export type TLinkedResourceData = TResourceData & { isLinked: boolean; };

export type TResourceKeys = keyof TResourceData;

export type TLinkedData = {
  [key in typeof ID_KEY | typeof NAME_KEY]: key extends typeof ID_KEY ? number : string;
};
/*
{
  [ID_KEY]: number;
  [NAME_KEY]: string;
};
*/

export type TLinkedItemData = Record<typeof DEPT_KEY | typeof SUBDEPT_KEY, number>;
/*
{
  [DEPT_KEY]: number;
  [SUBDEPT_KEY]: number;
};
*/

export type TLinkedItem = TLinkedData & TLinkedItemData & {
  [key in typeof PRICE_KEY | typeof INDEX_KEY | typeof GROUP_KEY | typeof IS_VISIBLE_KEY]: number;
};
/*
{
  [PRICE_KEY]: number;
  [INDEX_KEY]: number;
  [GROUP_KEY]: number;
  [IS_VISIBLE_KEY]: number;
};
*/

export type TLinkedItemKeys = keyof TLinkedItem;

export type TLinkedPricelist = {
  [key in TPricelistTypes]: key extends typeof TYPES[typeof ITEM_KEY]
    ? TLinkedItem[] : key extends typeof TYPES[typeof GROUP_KEY]
    ? TLinkedGroup[] : key extends typeof TYPES[typeof SUBDEPT_KEY]
    ? TLinkedSubdept[] : never;
};

export type TLinkedGroup = TLinkedData & TLinkedItemData & Pick<TLinkedPricelist, typeof TYPES[typeof ITEM_KEY]>;
/*
{
  pricelist: TLinkedItem[];
};
*/

export type TLinkedGroupKeys = keyof TLinkedGroup;

export type TLinkedSubdept = TLinkedData
  & Record<typeof DEPT_KEY, number>
  & Pick<TLinkedPricelist, typeof TYPES[typeof ITEM_KEY] | typeof TYPES[typeof GROUP_KEY]>;
/*
{
  [DEPT_KEY]: number;
  groups: TLinkedGroup[];
  pricelist: TLinkedItem[];
};
*/

export type TLinkedSubdeptKeys = keyof TLinkedSubdept;

export type TLinkedDept = TLinkedData & Pick<TLinkedPricelist, typeof TYPES[typeof SUBDEPT_KEY]>;
/*
{
  subdepts: TLinkedSubdept[];
};
*/

export type TLinkedDeptKeys = keyof TLinkedDept;

export type TResLinkedAction = {
  action: string;
  data: TItemData;
};

export type TLinkedResData = {
  //action?: string;
  //data?: TItemData;
  items?: TItemsArr;
  key?: string;
} & Partial<TResLinkedAction>;

export type TCategorySelectorHandler = TCustomData<(payload: TLinkedResData) => void>;

export type TLinkedDataConfigAction = 'SET_COMPLEX_DATA'
  | 'UNSET_COMPLEX_DATA'
  | 'SET_GROUP_IGNORED'
  | 'UNSET_GROUP_IGNORED'
  | 'SET_GROUP_USED'
  | 'UNSET_GROUP_USED';

export type TLinkedDataConfigHandler = (type: TLinkedDataConfigAction, data?: Record<string, boolean> | null) => void;

export type TResItemData = {
  linkedItemsData: Record<string, TItemsArr>;
  linkedDataConfig: Record<string, boolean> | null;
  resLinkHandlers: TCategorySelectorHandler;
  handleDataConfig: TLinkedDataConfigHandler;
};

export type TUrlData = {
  type: TPricelistTypes | string;
  id: number | null;
};

export type TParserData = {
  type: TPricelistTypes;
  items: TItemsArr;
};

export type TFilterData = Partial<{
  [key in typeof NAME_KEY | typeof PARENT_KEY | typeof TEMPLATE_KEY | typeof IS_PARENT_KEY | typeof UPDATED_KEY]: key extends typeof NAME_KEY ? string : number;
}>;
/*
{
  [NAME_KEY]?: string;
  [PARENT_KEY]?: number;
  [TEMPLATE_KEY]?: number;
  [IS_PARENT_KEY]?: number;
  [UPDATED_KEY]?: number;
};
*/

export type TFilterKeys = keyof TFilterData;

export type TFormController = {
  //icon?: string;
  //color?: string;
  //introText?: string;
  actionBtnCaption: string;
  disabled: boolean;
  actionHandler: () => void;
} & Partial<Record<'icon' | 'color' | 'introText', string>>;

export type TListReducerOptions = Partial<{
  type: TActionKeys;
  key: TPricelistKeys;
  arr: TItemsArr;
}>;
