import { createContext } from 'react';

import type { TItemsArr, TResItemContext } from '../types';

import { ACTION_ERROR_MSG } from '../utils/constants';

type TResItemContextData = Omit<TResItemContext, 'isLinkedItemActive'>;

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
  linkedListConfig: null,
  handleLinkedListConfig: () => console.log(ACTION_ERROR_MSG),
  handleListOptions: () => console.log(ACTION_ERROR_MSG),
  toggleLinkedItems: () => console.log(ACTION_ERROR_MSG)
} as TResItemContextData;

const ResItemContext = createContext<TResItemContextData>(contextData);

export default ResItemContext;
