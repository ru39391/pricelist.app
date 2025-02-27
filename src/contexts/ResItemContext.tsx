import { createContext } from 'react';

import type {
  TCategorySelectorHandler,
  TItemsArr,
  TResItemData
} from '../types';

import { ACTION_ERROR_MSG, TYPES } from '../utils/constants';

const contextData = {
  linkedItemsData: [
    'linkedDepts',
    'linkedSubdepts',
    'linkedGroups',
    'linkedItems',
    'existableDepts',
    'existableSubdepts',
    'existableGroups',
    'existableItems'
  ].reduce((acc, key) => ({...acc, [key]: [] as TItemsArr}), {} as Record<string, TItemsArr>),
  linkedDataConfig: null,
  resLinkHandlers: Object.keys(TYPES).reduce(
    (acc, key) => ({...acc, [key]: () => console.log(ACTION_ERROR_MSG)}), {} as TCategorySelectorHandler
  ),
  handleDataConfig: () => console.log(ACTION_ERROR_MSG)
} as TResItemData;

const ResItemContext = createContext<TResItemData>(contextData);

export default ResItemContext;
