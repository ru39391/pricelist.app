import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutocompleteChangeReason } from '@mui/material';

import { useSelector } from '../services/hooks';

import type {
  TItemData,
  TItemsArr,
  TListReducerOptions,
  TPriceList,
  TPricelistExtTypes,
  TPricelistKeys,
  TPricelistTypes
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
  REMOVE_ACTION_KEY
} from '../utils/constants';

type TListHandlerOptions = Omit<Required<TListReducerOptions>, 'type'> & { action: AutocompleteChangeReason; };

interface IResLinks {
  existableList: TPriceList<TPricelistTypes, TItemsArr>;
  linkedList: TPriceList<TPricelistTypes, TItemsArr>;
  handleListOptions: (data: TListHandlerOptions) => void;
  handleLinkedItems: (data: { arr: TItemsArr; data: TItemData; key: TPricelistKeys; }) => void;
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

const existableListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TListReducerOptions) => createListReducer(state, action);
const linkedListReducer = (state: TPriceList<TPricelistTypes, TItemsArr>, action: TListReducerOptions) => createListReducer(state, action);

const useResLinkz = (): IResLinks => {
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
  const handleResLinkedList = ({ array, key, categoryKey }: {
    array: TItemsArr;
    key: TPricelistKeys;
    categoryKey: TPricelistKeys;
  }) => {
    const keys: Partial<Record<TPricelistKeys, TPricelistKeys[]>> = {
      [DEPT_KEY]: [SUBDEPT_KEY, GROUP_KEY, ITEM_KEY],
      [SUBDEPT_KEY]: [GROUP_KEY, ITEM_KEY],
      [GROUP_KEY]: [ITEM_KEY],
    };
    //console.log({ array, key, categoryKey });

    if(array.length === 0 && keys[categoryKey]) {
      keys[categoryKey].forEach(value => handleListOptions({ action: 'clear', key: value, arr: [] }));
      return;
    }

    if(keys[categoryKey]) {
      keys[categoryKey].forEach((subCategoryKey) => {
        const { arr: existableArr } = handleResList({ array, key: subCategoryKey, categoryKey });
        const arr = linkedList[TYPES[subCategoryKey]].reduce(
          (acc: TItemsArr, linkedItem) => {
            const data = existableArr?.find(item => item[ID_KEY] === linkedItem[ID_KEY]);

            return data ? [...acc, data] : acc;
          }, []
        );

        handleListOptions({ action: 'removeOption', key: subCategoryKey, arr })
      });
    }
  };

  /**
   * Обновляет список привязанных групп и услуг
   * @property {TItemsArr} array - массив выбранных элементов
   * @property {TItemData} data - данные элемента
   * @property {TPricelistKeys} key - ключ элемента прасйлиста
   */
  const handleLinkedItems = ({ arr, data, key }: {
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
    setExistableList(
      handleResList({
        array: linkedList[TYPES[DEPT_KEY]],
        key: SUBDEPT_KEY,
        categoryKey: DEPT_KEY,
      })
    );
    // при изменении выбранных отделений изменяем список выбранных специализаций
    handleResLinkedList({
      array: linkedList[TYPES[DEPT_KEY]],
      key: SUBDEPT_KEY,
      categoryKey: DEPT_KEY,
    });
  }, [
    linkedList[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    // при изменении выбранных специализаций устанавливаем список доступных для выбора групп
    setExistableList(
      handleResList({
        array: linkedList[TYPES[SUBDEPT_KEY]],
        key: GROUP_KEY,
        categoryKey: SUBDEPT_KEY,
      })
    );
    // при изменении выбранных специализаций устанавливаем список доступных для выбора услуг
    setExistableList(
      handleResItemsList({
        array: linkedList[TYPES[SUBDEPT_KEY]],
        key: ITEM_KEY,
        categoryKey: SUBDEPT_KEY,
      })
    );
    /*
    */
    // при изменении выбранных специализаций изменяем список выбранных групп
    handleResLinkedList({
      array: linkedList[TYPES[SUBDEPT_KEY]],
      key: GROUP_KEY,
      categoryKey: SUBDEPT_KEY,
    });
    // при изменении выбранных специализаций изменяем список выбранных услуг
    handleResLinkedList({
      array: linkedList[TYPES[SUBDEPT_KEY]],
      key: ITEM_KEY,
      categoryKey: SUBDEPT_KEY,
    });
  }, [
    linkedList[TYPES[SUBDEPT_KEY]]
  ]);

  useEffect(() => {
    //console.log('linkedList', linkedList);
  }, [
    linkedList
  ]);

  return {
    existableList,
    linkedList,
    handleListOptions,
    handleLinkedItems
  }
}

export default useResLinkz;
