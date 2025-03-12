import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutocompleteChangeReason } from '@mui/material';

import { useSelector } from '../services/hooks';

import type {
  TItemData,
  TItemsArr,
  TLinkedData,
  TLinkedDataConfigAction,
  TListReducerOptions,
  TPriceList,
  TPricelistExtTypes,
  TPricelistKeys,
  TPricelistTypes,
  TResLinkParams
} from '../types';

import { sortArrValues, fetchArray } from '../utils';

import {
  TYPES,
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  LABEL_KEY,
  CATEGORY_KEY,
  RESLINKS_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY
} from '../utils/constants';

type TListHandlerOptions = Omit<Required<TListReducerOptions>, 'type'> & { action: AutocompleteChangeReason; };

interface IResLinks {
  existableList: TPriceList<TPricelistTypes, TItemsArr>;
  linkedList: TPriceList<TPricelistTypes, TItemsArr>;
  handleListOptions: (data: TListHandlerOptions) => void;
  toggleLinkedItems: (data: { arr: TItemsArr; data: TItemData; key: TPricelistKeys; }) => void;
  isLinkedItemActive: (data: { arr: TItemsArr; } & Pick<TLinkedData, typeof ID_KEY>) => boolean;
}

const createListReducer = (
  state: TPriceList<TPricelistTypes, TItemsArr>,
  action: TListReducerOptions
) => {
  switch (action.type) {
    case ADD_ACTION_KEY:
      return {
        ...state,
        ...( action.key && { [TYPES[action.key]]: action.arr || [] } )
      };
    case REMOVE_ACTION_KEY:
      return {
        ...state,
        ...( action.key && { [TYPES[action.key]]: [] } )
      };
    default:
      return { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] };
  }
};

const setListConfig = (values: boolean[], value: boolean = false): Record<TResLinkParams, boolean> => {
  const keys: TResLinkParams[] = [IS_COMPLEX_DATA_KEY, IS_GROUP_IGNORED_KEY, IS_GROUP_USED_KEY];

  const data = values.length === 1
    ? keys.reduce((acc, key) => ({ ...acc, [key]: values[0] }), {} as Record<TResLinkParams, boolean>)
    : [...values, value].reduce((acc, item, index) => ({ ...acc, [keys[index]]: item }), {} as Record<TResLinkParams, boolean>);

  return data;
}

const listConfigReducer = (
  state: Record<TResLinkParams, boolean> | undefined,
  action: { type?: TLinkedDataConfigAction, data?: Record<TResLinkParams, boolean>}
) => {
  switch (action.type) {
    case 'SET_COMPLEX_DATA':
      return setListConfig([true, false]);
      // { [IS_COMPLEX_DATA_KEY]: true, [IS_GROUP_IGNORED_KEY]: false, [IS_GROUP_USED_KEY]: false };
    case 'UNSET_COMPLEX_DATA':
      return setListConfig([false]);
      // { [IS_COMPLEX_DATA_KEY]: false, [IS_GROUP_IGNORED_KEY]: false, [IS_GROUP_USED_KEY]: false };
    case 'SET_GROUP_IGNORED':
      return setListConfig([true, true]);
      // { [IS_COMPLEX_DATA_KEY]: true, [IS_GROUP_IGNORED_KEY]: true, [IS_GROUP_USED_KEY]: false };
    case 'UNSET_GROUP_IGNORED':
      return setListConfig([true, false]);
      // { [IS_COMPLEX_DATA_KEY]: true, [IS_GROUP_IGNORED_KEY]: false, [IS_GROUP_USED_KEY]: false };
    case 'SET_GROUP_USED':
      return setListConfig([true]);
      // { [IS_COMPLEX_DATA_KEY]: true, [IS_GROUP_IGNORED_KEY]: true, [IS_GROUP_USED_KEY]: true };
    case 'UNSET_GROUP_USED':
      return setListConfig([true, true]);
      // { [IS_COMPLEX_DATA_KEY]: true, [IS_GROUP_IGNORED_KEY]: true, [IS_GROUP_USED_KEY]: false };
    default:
      return action.data || undefined;
  }
};
const existableListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TListReducerOptions) => createListReducer(state, action);
const linkedListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TListReducerOptions) => createListReducer(state, action);

const useResLinkz = (): IResLinks => {
  const [linkedListConfig, setLinkedListConfig] = useReducer(listConfigReducer, undefined);
  const [existableList, setExistableList] = useReducer(
    existableListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );
  const [linkedList, setLinkedList] = useReducer(
    linkedListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );

  const pricelist = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as TPriceList<TPricelistExtTypes, TItemsArr>
  ));

  /**
   * Возвращает списки элементов прайслиста в зависимости от их родительских категорий
   * @returns TListReducerOptions - данные для сохранения в локальном состоянии
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const handleResList = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }): TListReducerOptions => {
    //console.log({ array, key, categoryKey });

    if(array.length === 0) {
      return { type: REMOVE_ACTION_KEY, key, arr: [] };
    }

    const arr: TItemsArr = array.length === 1
      ? pricelist[TYPES[key]].filter(item => item[categoryKey] === array[0][ID_KEY])
      : sortArrValues([...pricelist[TYPES[key]]], NAME_KEY).reduce(
          (acc, item) => {
            const category = array.find(data => data[ID_KEY] === item[categoryKey]);

            return category ? [...acc, {...item, [CATEGORY_KEY]: category[NAME_KEY], [LABEL_KEY]: item[NAME_KEY]}] : acc;
          },
          [] as TItemsArr
        );

    return {
      key,
      type: ADD_ACTION_KEY,
      arr: arr.length === 1 ? [{...arr[0], [CATEGORY_KEY]: array[0][NAME_KEY], [LABEL_KEY]: arr[0][NAME_KEY]}] : sortArrValues(arr, CATEGORY_KEY)
    };
  };

  /**
   * Возвращает список услуг, вложенных непосредственно в специализацию
   * @returns TListReducerOptions - данные для сохранения в локальном состоянии
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const handleResItemsList = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }): TListReducerOptions => {
    const payload = handleResList({ array, key, categoryKey });

    if(payload.arr?.length === 0) {
      return payload;
    }

    return {
      ...payload,
      arr: payload.arr?.filter(item => item[GROUP_KEY] === 0)
    };
  };

  /**
   * Устанавливает списки выбранных элементов прайслиста
   * @property {TItemsArr} array - массив элементов
   * @property {TPricelistKeys} key - тип элементов
   * @property {AutocompleteChangeReason} action - тип взаимодействия с выпадающим списком
   */
  const handleListOptions = ({ action, key, arr }: TListHandlerOptions): void => {
    //console.log({ action, key, arr });
    // TODO: вынести все значения AutocompleteChangeReason в константы
    if(action == 'clear') {
      setLinkedList({ type: REMOVE_ACTION_KEY, key, arr: [] });
      return;
    }

    setLinkedList({
      key,
      type: ADD_ACTION_KEY,
      arr: action == 'removeOption' ? arr : fetchArray([...linkedList[TYPES[key]], ...arr], ID_KEY)
    });
  };

  /**
   * Обновляет список привязанных элементов при изменении родительских категорий
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const updateSubcategoryList = (payload: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }) => {
    const { array, categoryKey } = payload;
    const keys: Partial<Record<TPricelistKeys, TPricelistKeys[]>> = {
      [DEPT_KEY]: [SUBDEPT_KEY, GROUP_KEY, ITEM_KEY],
      [SUBDEPT_KEY]: [GROUP_KEY, ITEM_KEY],
      //[GROUP_KEY]: [ITEM_KEY],
    };
    //console.log({ array, key, categoryKey });

    if(array.length === 0 && keys[categoryKey]) {
      // TODO: установить комплексный выбор, если хотя бы одна специализация содержит услуги
      setLinkedListConfig({});
      keys[categoryKey].forEach(key => handleListOptions({ action: 'clear', key, arr: [] }));
      return;
    }

    if(keys[categoryKey]) {
      keys[categoryKey].forEach((key) => {
        const { arr: existableArr } = handleResList({ array, key, categoryKey });
        const arr = linkedList[TYPES[key]].reduce(
          (acc: TItemsArr, linkedItem) => {
            const data = existableArr?.find(item => item[ID_KEY] === linkedItem[ID_KEY]);

            return data ? [...acc, data] : acc;
          }, []
        );

        handleListOptions({ action: 'removeOption', key, arr });

        if(key === GROUP_KEY && linkedList[TYPES[key]].length === 0) setLinkedListConfig({});
      });
    }
  };

  /**
   * Обновляет список привязанных групп и услуг
   * @property {TItemsArr} array - массив выбранных элементов
   * @property {TItemData} data - данные элемента
   * @property {TPricelistKeys} key - ключ элемента прасйлиста
   */
  const toggleLinkedItems = ({ arr, data, key }: {
    arr: TItemsArr;
    data: TItemData;
    key: TPricelistKeys;
  }) => {
    const payload: TListHandlerOptions = { action: 'selectOption', key, arr: [data] };

    if(arr.length === 0) {
      handleListOptions(payload);
      return;
    }

    const linkedList = arr.filter(item => item[ID_KEY] !== data[ID_KEY]);
    // нет в arr: linkedList.length === arr.length
    // есть в arr: linkedList.length === arr.length - 1

    handleListOptions({
      ...payload,
      ...( linkedList.length === arr.length - 1 && { action: 'removeOption', arr: linkedList } )
    });
  };

  /**
   * Устанавливает в локальное хранилище список привязанных элементов
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const updateCategoryList = (payload: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }) => {
    const data = handleResList(payload);

    setExistableList(data);
    updateSubcategoryList(payload);
  };

  /**
   * Проверяет истинность наличия группы/услуги среди выбранных элементов
   * @returns {boolean} истинно, если удалось найти элемент в массиве
   * @property {TItemsArr} arr - массив выбранных элементов
   * @property {number} item_id - идентификатор элемента
   */
  const isLinkedItemActive = (
    data: { arr: TItemsArr; } & Pick<TLinkedData, typeof ID_KEY>
  ): boolean => Boolean(data.arr.find(item => item[ID_KEY] === data[ID_KEY]));

  /**
   * Переключение параметров конфигурации обработки прикреплённых к ресурсу позиций прайслиста
   * @property {TLinkedDataConfigAction} type - тип действия
   * // TODO: создать отдельный тип
   * @property {Record<TResLinkParams, boolean> | undefined} data - объект значений параметров конфигурации
   */
  const handleDataConfig = (type: TLinkedDataConfigAction, data: Record<TResLinkParams, boolean> | undefined = undefined) => {
    console.log({ type, data });
    setLinkedListConfig({ type, data });
  };

  useEffect(() => {
    // при получении данных прайслиста, устанавливаем список доступных для выбора отделений
    setExistableList({
      type: ADD_ACTION_KEY,
      key: DEPT_KEY,
      arr: pricelist[TYPES[DEPT_KEY]]
    });
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    // при изменении выбранных отделений устанавливаем список доступных для выбора специализаций
    // при изменении выбранных отделений изменяем список выбранных специализаций
    updateCategoryList({
      array: linkedList[TYPES[DEPT_KEY]],
      key: SUBDEPT_KEY,
      categoryKey: DEPT_KEY,
    });
  }, [
    linkedList[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    // при изменении выбранных специализаций устанавливаем список доступных для выбора групп
    // при изменении выбранных специализаций изменяем список выбранных групп
    updateCategoryList({
      array: linkedList[TYPES[SUBDEPT_KEY]],
      key: GROUP_KEY,
      categoryKey: SUBDEPT_KEY,
    });
    // при изменении выбранных специализаций устанавливаем список доступных для выбора услуг
    // при изменении выбранных специализаций изменяем список выбранных услуг
    updateCategoryList({
      array: linkedList[TYPES[SUBDEPT_KEY]],
      key: ITEM_KEY,
      categoryKey: SUBDEPT_KEY,
    });
  }, [
    linkedList[TYPES[SUBDEPT_KEY]]
  ]);

  return {
    existableList,
    linkedList,
    linkedListConfig,
    handleListOptions,
    toggleLinkedItems,
    isLinkedItemActive,
    handleDataConfig
  }
}

export default useResLinkz;
