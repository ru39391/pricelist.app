import { useState, useEffect } from 'react';
import { useSelector } from '../services/hooks';

import type {
  TPricelistData,
  TCustomData,
  TItemsArr,
  TItemData,
  THandledItemKeys,
  TPricelistTypes,
  TPricelistResponse,
  TActionKeys
} from '../types';
import type { TPricelistState } from '../services/slices/pricelist-slice';

import {
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ID_KEY
} from '../utils/constants';

type TFileHandlerData = {
  keys: string[];
  items: TItemsArr[];
  param?: keyof TItemData;
}

interface IDataComparer {
  comparedFileData: Record<THandledItemKeys, TPricelistData> | null;
  compareFileData: (data: TPricelistData | null, param: keyof TItemData | undefined) => void;
}

const useDataComparer = (): IDataComparer => {
  const [comparedFileData, setComparedFileData] = useState<Record<THandledItemKeys, TPricelistData> | null>(null);

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

  const handleUpdatedItems = ({
    ids,
    items,
    currItems,
    param
  }: {
    ids: number[];
    items: TItemsArr;
    currItems: TItemsArr;
    param?: keyof TItemData
  }) => {
    const fileItems = items.filter(item => ids.includes(item[ID_KEY] as number));/*
    console.log({
      ids,
      items,
      currItems
    });*/

    const hndledFileItems = fileItems.reduce((acc: TItemsArr, item) => {
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

      const isParamExist = param
        ? currItem && item[param] === currItem[param]
        : currItem && Object.keys(item).every(key => item[key] === currItem[key])

      const isEqual = currItem ? isParamExist : true;

      //console.log(Object.keys(item).every(key => item[key] === currItem[key]));
      return isEqual
        ? acc
        : [...acc, item];
    }, []);
    console.log(hndledFileItems);

    return hndledFileItems;
  };

  const handleItems = (
    {
      key,
      keys,
      items,
      param
    }: {
      key: THandledItemKeys;
      keys: string[];
      items: TItemsArr[];
      param?: keyof TItemData;
    }
  ): TPricelistData => keys.reduce((acc, item, index) => {
    const { ids, arr } = setItemIds({ key: item as TPricelistTypes, arr: items[index] })[key];

    return {
      ...acc,
      [item]: key === UPDATED_KEY
        ? handleUpdatedItems({ ids, items: items[index], currItems: arr, param })
        : arr.filter(data => !ids.includes(data[ID_KEY] as number))
    };
  }, {});

  const handlers = {
    [CREATED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: CREATED_KEY, keys, items}),
    [UPDATED_KEY]: ({keys, items, param}: TFileHandlerData) => handleItems({key: UPDATED_KEY, keys, items, param}),
    [REMOVED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: REMOVED_KEY, keys, items})
  };

  const compareFileData = (
    data: TPricelistData | null,
    param: keyof TItemData | undefined = undefined
  ): void => {
    if(!data) {
      return;
    }

    const [keys, items] = [Object.keys(data), Object.values(data)];

    setComparedFileData(
      Object.keys(handlers).reduce((acc, key, index) => (
        { ...acc, [key]: Object.values(handlers)[index]({keys, items, param}) }
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

  return {
    comparedFileData,
    compareFileData
  }
}

export default useDataComparer;
