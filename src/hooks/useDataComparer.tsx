import { useEffect, useReducer, useState } from 'react';

import { useDispatch, useSelector } from '../services/hooks';
import { resetFileList } from '../services/actions/file';

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
  ITEM_KEY,
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
  CAPTIONS,
  TYPES
} from '../utils/constants';

type TComparedItemIds = Record<THandledItemKeys, { ids: number[]; arr: TItemsArr; }>;

interface IDataComparer {
  comparedItems: TComparedItems,
  comparedFileData: TComparedFileData | null;
  fileItemsCounter: number;
  isFileDataFetching: boolean;
  compareFileData: (data: TPriceListData | null) => void;
}

const setComparedData = (
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

/**
 * Сравнение данных, полученных после парсинга xls-документа, с текущими позициями прайслиста
 *
 * @returns {IDataComparer} данные, полученные поле сравнения записей на сайте с элементами xls-файла;
 * @property {IDataComparer['comparedItems']} comparedItems - массив категоризированных по типу изменямого параметра элементов;
 * @property {IDataComparer['comparedFileData']} comparedFileData - объект данных обработанного xls-файла, категоризированных по типу обновления;
 * @property {IDataComparer['fileItemsCounter']} fileItemsCounter - количество элементов, которые будут сохранены;
 * @property {IDataComparer['isFileDataFetching']} isFileDataFetching - инстинно, если количество обработанных на сервере элементов не совпадает с количеством подлежащих обработке элементов;
 * @property {function} compareFileData - получает результат сравнения записей и помещает в локальное хранилище изменённые данные xls-документа.
 */
const useDataComparer = (): IDataComparer => {
  const [comparedFileData, setComparedFileData] = useState<IDataComparer['comparedFileData']>(null);
  const [fileItemsCounter, setFileItemsCounter] = useState<IDataComparer['fileItemsCounter']>(0);
  const [fileDataResponse, setFileDataResponse] = useState<TPricelistResponse[]>([]);
  const [isFileDataFetching, setFileDataFetching] = useState<IDataComparer['isFileDataFetching']>(false);
  const [comparedItems, setComparedItems] = useReducer(
    comparedItemsReducer,
    { [NAME_KEY]: [], [PRICE_KEY]: [], [IS_VISIBLE_KEY]: [], [ITEM_KEY]: [] }
  );

  const dispatch = useDispatch();
  const { pricelist, response } = useSelector(({ pricelist }) => ({
    pricelist,
    response: pricelist.response
  }));

  /**
   * Формирует данные дочерних элементов навигации по категориям изменённых записей прайслиста
   * @property {TComparedFileData | null} data - данные обработанного xls-файла
   */
  const handleComparedItems = (data: IDataComparer['comparedFileData']) => {
    setComparedItems({});

    if(!data) {
      return;
    }

    const items = data[UPDATED_KEY][TYPES[ITEM_KEY]];
    const currItems = pricelist[TYPES[ITEM_KEY]].filter(
      data => items.map(item => item[ID_KEY] as number).includes(Number(data[ID_KEY]))
    );

    const excludedKeys = [ROW_INDEX_KEY, ID_KEY, NAME_KEY, PRICE_KEY, IS_VISIBLE_KEY, IS_NAME_IMMUTABLE_KEY, CREATEDON_KEY, UPDATEDON_KEY, QUANTITY_KEY];
    const actions: Record<string, TComparedItemsAction> = {
      [NAME_KEY]: 'SET_NAME_DATA',
      [PRICE_KEY]: 'SET_PRICE_DATA',
      [IS_VISIBLE_KEY]: 'SET_VISIBLE_DATA'
    };

    currItems.forEach(currItem => {
      const item = items.find(data => data[ID_KEY] === currItem[ID_KEY]);

      if(!item) {
        return;
      }

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
    });
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
   * Возвращает данные обработанного xls-файла или null в случае, когда массивы данных пусты
   * @returns {TComparedFileData | null} - данные обработанного xls-файла
   * @property {TComparedFileData} data - данные обработанного xls-файла, категоризированные по типу изменения
   */
  const setExistableFileData = (data: TComparedFileData): IDataComparer['comparedFileData'] => {
    let counterValues: number[] = [];

    for (const key in data) {
      const arr = Object.entries(data[key as THandledItemKeys]) as [TPricelistTypes, TItemsArr][];

      counterValues = [...counterValues, arr.reduce((acc, item) => acc + item[1].length, 0)];
    }

    const counter = counterValues.reduce((acc, item) => acc + item, 0);

    setFileItemsCounter(counter);

    return counter > 0 ? data : null;
  };

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

    const data = setExistableFileData(
      [...[CREATED_KEY, UPDATED_KEY, REMOVED_KEY] as THandledItemKeys[]].reduce(
        (acc, key) => ({ ...acc, [key]: handleFileData({key, keys, items}) }), {} as TComparedFileData
      )
    );

    setComparedFileData(data);
  };

  /**
   * Обновляет список записей обработанного xls-файла после успешного ответа сервера
   * @property {TPricelistState['response']} data - успешно обновлённые данные: action - тип обновления ('create' | 'update' | 'remove'), type - категория элементов ('depts' | 'subdepts' | 'groups' | 'pricelist'), ids - массив идентификаторов обновлённых элементов
   */
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
    const fileData = setExistableFileData({
      ...comparedFileData,
      [keys[action]]: {
        ...itemsData,
        [type]: [...items]
      }
    });

    setFileDataResponse([...fileDataResponse, data]);
    setComparedFileData(fileData);
  };

  /**
   * Обрабатывет ответы сервера, возвращает данные xls-файла в глобальном хранилище к значениям по умолчанию,
   * если количество обработанных на сервере элементов совпадает с количеством элементов в хранилище
   * @property {number} counter - текущее количество элементов, предназначенных для сохранения/изменения/удаления
   * @property {TPricelistResponse[]} arr - локальное состояние с ответами сервера
   */
  const handleFileDataResponse = (counter: number, arr: TPricelistResponse[]) => {
    const respCounter = arr.reduce((acc, { ids }) => acc + ids.length, 0);

    setFileDataFetching(arr.length > 0 && counter > respCounter);

    if(arr.length === 1 && respCounter === 1 && counter > respCounter) {
      setFileDataFetching(false);
      setFileDataResponse([]);
    }

    if(counter === 0 && respCounter > 0) {
      dispatch(resetFileList());
      setFileDataResponse([]);
    }
  };

  useEffect(() => {
    updateComparedFileData(response);
  }, [
    response
  ]);

  useEffect(() => {
    handleComparedItems(comparedFileData);
  }, [
    comparedFileData
  ]);

  useEffect(() => {
    handleFileDataResponse(fileItemsCounter, fileDataResponse);
  }, [
    fileItemsCounter,
    fileDataResponse
  ]);

  return {
    comparedItems,
    comparedFileData,
    fileItemsCounter,
    isFileDataFetching,
    compareFileData
  }
}

export default useDataComparer;
