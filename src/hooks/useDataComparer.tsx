import { useState, useEffect, useReducer } from 'react';
import { useSelector } from '../services/hooks';

import type {
  TActionKeys,
  TComparedFileData,
  TComparedItems,
  TComparedItemsAction,
  THandledItemKeys,
  TItemData,
  TItemsArr,
  TItemsArrData,
  TPriceListData,
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
  CAPTIONS
} from '../utils/constants';

type TComparedItemIds = Record<THandledItemKeys, { ids: number[]; arr: TItemsArr; }>;

interface IDataComparer {
  comparedItems: TComparedItems,
  comparedFileData: TComparedFileData | null;
  compareFileData: (data: TPriceListData | null) => void;
}

const setComparedData = (
  state: TComparedItems,
  key: keyof TComparedItems,
  data?: TItemData
): TComparedItems => ({
  ...state,
  ...(data && { [key]: state[key].find(item => item[ID_KEY] === data[ID_KEY]) ? [...state[key]] : [...state[key], data] })
});

const comparedItemsReducer = (
  state: TComparedItems,
  action: { type?: TComparedItemsAction, data?: TItemData }
) => {
  switch (action.type) {
    case 'SET_NAME_DATA':
      return setComparedData(state, NAME_KEY, action.data);

    case 'SET_PRICE_DATA':
      return setComparedData(state, PRICE_KEY, action.data);

    case 'SET_VISIBLE_DATA':
      return setComparedData(state, IS_VISIBLE_KEY, action.data);

    case 'SET_ITEMS_DATA':
      return setComparedData(state, ITEM_KEY, action.data);

    default:
      return [NAME_KEY, PRICE_KEY, IS_VISIBLE_KEY, ITEM_KEY].reduce((acc, key) => ({...acc, [key as keyof TComparedItems]: []}), {} as TComparedItems);
  }
};

const useDataComparer = (): IDataComparer => {
  const [comparedFileData, setComparedFileData] = useState<TComparedFileData | null>(null);
  // TODO: настроить корректный сброс comparedItems при обновлении навигации
  const [comparedItems, setComparedItems] = useReducer(
    comparedItemsReducer,
    { [NAME_KEY]: [], [PRICE_KEY]: [], [IS_VISIBLE_KEY]: [], [ITEM_KEY]: [] }
  );

  const { pricelist, response } = useSelector(({ pricelist }) => ({
    pricelist,
    response: pricelist.response
  }));

  const handleComparedItems = (data) => {//item: TItemData, currItem?: TItemData, isCategorySet?: boolean
    console.log('handleComparedItems', data[UPDATED_KEY]);
    if(!data) {
      setComparedItems({});
    }

    return;
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
  };

  /**
   * Возвращает объект с массивами идентификаторов и элементов для сравнения в зависимости от типа обновления:
   * - для поиска новых элементов: id всех существующих позиций и массив всех элементов файла;
   * - для поиска изменённых элементов: id позиций файла, которые совпадают с id существующих записей, и массив всех существующих элементов;
   * - для поиска удалённых элементов: id всех позиций файла и массив всех существующих элементов.
   * @returns {TComparedItemIds} - объект с массивами для сравнения элементов
   * @property {number[]} type - категория элементов ('depts' | 'subdepts' | 'groups' | 'pricelist')
   * @property {TItemsArr} items - массив элементов обработанного xls-файла
   */
  const setComparedItemIds = ({ type, items: arr }: TItemsArrData): TComparedItemIds => {
    const currItems: TItemsArr = pricelist[type];
    const ids = arr.map(item => item[ID_KEY] as number);
    const currIds = currItems.map((item: TItemData) => item[ID_KEY] as number);

    return {
      [CREATED_KEY]: { ids: currIds, arr },
      [UPDATED_KEY]: { ids: ids.filter(id => currIds.includes(id as number)), arr: currItems },
      [REMOVED_KEY]: { ids, arr: currItems }
    };
  };

  /**
   * Сравнивает существующие на сайте записи прайслиста с такими же записями xls-файла,
   * возвращает результат сравнения в виде массива изменённых элементов
   * @returns {TItemsArr} - массив изменённых элементов
   * @property {number[]} ids - id позиций файла, которые совпадают с id существующих записей
   * @property {TItemsArr} items - массив элементов обработанного xls-файла
   * @property {TItemsArr} currItems - массив существующих элементов
   */
  const handleUpdatedItems = ({ ids, items, currItems }: {ids: number[], items: TItemsArr, currItems: TItemsArr}): TItemsArr => {
    const fileItems = items.filter(item => ids.includes(item[ID_KEY] as number));

    return fileItems.reduce((acc, item) => {
      const currItem = currItems.find(data => {
        const { itemId, currItemId } = {
          itemId: item[ID_KEY] as number,
          currItemId: data[ID_KEY] as number
        };

        return itemId === currItemId;
      });

      return currItem && Object.keys(item).every(key => item[key] === currItem[key]) ? acc : [...acc, item];
    }, [] as TItemsArr);
  };

  /**
   * Возвращает результат сравнения данных обработанного xls-файла с текущими элементами прайслиста
   * @returns {TPriceListData} - объект с массивами изменённых записей
   * @property {THandledItemKeys} key - тип обновления (создание, изменение или удаление)
   * @property {TPricelistTypes[]} keys - массив категорий элементов ('depts' | 'subdepts' | 'groups' | 'pricelist')
   * @property {TItemsArr[]} items - массивы элементов, соответствующих категории
   */
  const handleFileData = (
    {
      key,
      keys,
      items
    }: {
      key: THandledItemKeys;
      keys: TPricelistTypes[];
      items: TItemsArr[];
    }
  ): TPriceListData => keys.reduce((acc, type, index) => {
    const { ids, arr } = setComparedItemIds({ type, items: items[index] })[key];

    return {
      ...acc,
      [type]: key === UPDATED_KEY
        ? handleUpdatedItems({ ids, items: items[index], currItems: arr })
        : arr.filter(data => !ids.includes(data[ID_KEY] as number))
    };
  }, {} as TPriceListData);

  /**
   * Помещает в локальное хранилище изменённые данные из обработанного xls-документа
   * @property {TPriceListData} fileData - данные обработанного xls-файла
   */
  const compareFileData = (fileData: TPriceListData | null): void => {
    if(!fileData) {
      setComparedFileData(null);
      return;
    }

    const [keys, items] = [Object.keys(fileData), Object.values(fileData)] as [TPricelistTypes[], TItemsArr[]];

    const data = [...[CREATED_KEY, UPDATED_KEY, REMOVED_KEY] as THandledItemKeys[]].reduce(
      (acc, key) => ({ ...acc, [key]: handleFileData({key, keys, items}) }), {} as TComparedFileData
    );

    setComparedFileData(data);
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
    //handleComparedItems(comparedFileData);
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
