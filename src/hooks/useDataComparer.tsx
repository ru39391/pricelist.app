import { useState, useEffect, useReducer } from 'react';
import { useSelector } from '../services/hooks';

import type {
  TActionKeys,
  TComparedItems,
  TComparedItemsAction,
  TCustomData,
  THandledItemKeys,
  TItemsArr,
  TItemData,
  TPricelistData,
  TPricelistResponse,
  TPricelistTypes
} from '../types';
import type { TPricelistState } from '../services/slices/pricelist-slice';

import {
  ROW_INDEX_KEY,
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  IS_VISIBLE_KEY,
  IS_NAME_IMMUTABLE_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  QUANTITY_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ITEM_KEY,
  TYPES,
  CAPTIONS
} from '../utils/constants';

type TFileHandlerData = {
  keys: string[];
  items: TItemsArr[];
  param?: keyof TItemData;
}

interface IDataComparer {
  comparedItems: TComparedItems,
  comparedFileData: Record<THandledItemKeys, TPricelistData> | null;
  compareFileData: (data: TPricelistData | null) => void;
}

const setComparedItems = (
  state: TComparedItems,
  key: keyof TComparedItems,
  data?: TItemData
): TComparedItems => ({
  ...state,
  ...(data && { [key]: [...state[key], data] })
});

const comparedItemsReducer = (
  state: TComparedItems,
  action: { type?: TComparedItemsAction, data?: TItemData }
) => {
  switch (action.type) {
    case 'SET_NAME_DATA':
      return setComparedItems(state, NAME_KEY, action.data);

    case 'SET_PRICE_DATA':
      return setComparedItems(state, PRICE_KEY, action.data);

    case 'SET_VISIBLE_DATA':
      return setComparedItems(state, IS_VISIBLE_KEY, action.data);

    case 'SET_ITEMS_DATA':
      return setComparedItems(state, ITEM_KEY, action.data);

    default:
      return [NAME_KEY, PRICE_KEY, IS_VISIBLE_KEY, ITEM_KEY].reduce((acc, key) => ({...acc, [key as keyof TComparedItems]: []}), {} as TComparedItems);
  }
};

const useDataComparer = (): IDataComparer => {
  const [comparedFileData, setComparedFileData] = useState<Record<THandledItemKeys, TPricelistData> | null>(null);
  const [comparedItems, setComparedItems] = useReducer(
    comparedItemsReducer,
    { [NAME_KEY]: [], [PRICE_KEY]: [], [IS_VISIBLE_KEY]: [], [ITEM_KEY]: [] }
  );

  const pricelist = useSelector(state => state.pricelist);
  const { response } = pricelist;

  const setItemIds = (
    {
      key,
      arr
    }: {
      key: TPricelistTypes;
      arr: TItemsArr;
    }
  ): TCustomData<{ ids: number[]; arr: TItemsArr; }> => {
    const currItems: TItemsArr = pricelist[key];
    const ids = arr.map(item => item[ID_KEY] as number);
    const currIds = currItems.map((item: TItemData) => item[ID_KEY] as number);

    return {
      [CREATED_KEY]: {
        ids: currIds,
        arr
      },
      [UPDATED_KEY]: {
        ids: ids.filter(id => currIds.includes(id as number)),
        arr: currItems
      },
      [REMOVED_KEY]: {
        ids,
        arr: currItems
      }
    };
  };

  const handleComparedItems = (item: TItemData, currItem?: TItemData, isCategorySet?: boolean) => {
    if(!isCategorySet || !currItem) {
      return;
    }

    const excludedKeys = [ROW_INDEX_KEY, ID_KEY, NAME_KEY, PRICE_KEY, IS_VISIBLE_KEY, IS_NAME_IMMUTABLE_KEY, CREATEDON_KEY, UPDATEDON_KEY, QUANTITY_KEY];
    const actions: Record<string, TComparedItemsAction> = {
      [NAME_KEY]: 'SET_NAME_DATA',
      [PRICE_KEY]: 'SET_PRICE_DATA',
      [IS_VISIBLE_KEY]: 'SET_VISIBLE_DATA'
    };

    for (const key in actions) {
      if(item[key] !== currItem[key]) {
        setComparedItems({ type: actions[key as keyof TComparedItems], data: item });
      }
    }

    for(const key in CAPTIONS) {
      if(!excludedKeys.includes(key) && item[key] !== currItem[key]) {
        setComparedItems({ type: 'SET_ITEMS_DATA', data: item });
      }
    }
  }

  const handleUpdatedItems = ({
    ids,
    items,
    currItems,
    isCategorySet
  }: {
    ids: number[];
    items: TItemsArr;
    currItems: TItemsArr;
    isCategorySet?: boolean
  }) => {
    const fileItems = items.filter(item => ids.includes(item[ID_KEY] as number));

    const handledFileItems = fileItems.reduce((acc: TItemsArr, item) => {
      const currItem = currItems.find(data => {
        const {
          itemId,
          currItemId,
        } = {
          itemId: item[ID_KEY] as number,
          currItemId: data[ID_KEY] as number
        };

        return itemId === currItemId;
      });

      handleComparedItems(item, currItem, isCategorySet);

      return currItem && Object.keys(item).every(key => item[key] === currItem[key]) ? acc : [...acc, item];
    }, []);

    return handledFileItems;
  };

  const handleItems = (
    {
      key,
      keys,
      items,
      isCategorySet
    }: {
      key: THandledItemKeys;
      keys: string[];
      items: TItemsArr[];
      isCategorySet?: boolean;
    }
  ): TPricelistData => keys.reduce((acc, item, index) => {
    const { ids, arr } = setItemIds({ key: item as TPricelistTypes, arr: items[index] })[key];

    return {
      ...acc,
      [item]: key === UPDATED_KEY
        ? handleUpdatedItems({
            ids,
            items: items[index],
            currItems: arr,
            ...( item === TYPES[ITEM_KEY] && isCategorySet && { isCategorySet } )
          })
        : arr.filter(data => !ids.includes(data[ID_KEY] as number))
    };
  }, {});

  const handlers = {
    [CREATED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: CREATED_KEY, keys, items}),
    [UPDATED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: UPDATED_KEY, keys, items, isCategorySet: true}),
    [REMOVED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: REMOVED_KEY, keys, items})
  };

  const compareFileData = (data: TPricelistData | null): void => {
    if(!data) {
      setComparedFileData(null);
      return;
    }

    const [keys, items] = [Object.keys(data), Object.values(data)];

    setComparedFileData(
      Object.keys(handlers).reduce((acc, key, index) => (
        { ...acc, [key]: Object.values(handlers)[index]({keys, items}) }
      ), {} as Record<THandledItemKeys, TPricelistData>)
    );
  };

  const updateComparedFileData = (data: TPricelistState['response']) => {
    if(!data || !comparedFileData) {
      return;
    }

    const { action, type, ids }: TPricelistResponse = {
      action: data.action,
      type: data.type,
      ids: data.ids
    };
    const keys: Record<TActionKeys, THandledItemKeys> = {
      [ADD_ACTION_KEY]: CREATED_KEY,
      [EDIT_ACTION_KEY]: UPDATED_KEY,
      [REMOVE_ACTION_KEY]: REMOVED_KEY
    };
    const itemsData = comparedFileData[keys[action]];
    const items = itemsData[type].filter(item => !ids.includes(item[ID_KEY] as number));

    setComparedFileData({
      ...comparedFileData,
      [keys[action]]: {
        ...itemsData,
        [type]: [...items]
      }
    });
  }

  useEffect(() => {
    updateComparedFileData(response);
  }, [
    response
  ]);

  useEffect(() => {
    if(!comparedFileData) {
      setComparedItems({});
    }
  }, [
    comparedFileData
  ]);

  return {
    comparedItems,
    comparedFileData,
    compareFileData
  }
}

export default useDataComparer;
