import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '../services/hooks';

import type {
  TItemsArr,
  TLinkedListConfig,
  TLinkedListConfigAction,
  TLinkedListData,
  TListHandlerOptions,
  TListReducerOptions,
  TListTogglerData,
  TPriceList,
  TPricelistExtTypes,
  TPricelistKeys,
  TPricelistTypes,
  TResItemContext,
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
  SELECT_OPTION_KEY,
  CLEAR_OPTION_KEY,
  REMOVE_OPTION_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY
} from '../utils/constants';

interface IResLinks {
  existableList: TPriceList<TPricelistTypes>;
  linkedList: TPriceList<TPricelistTypes>;
  linkedListConfig: TLinkedListConfig;
  handleLinkedListConfig: TResItemContext['handleLinkedListConfig'];
  handleListOptions: TResItemContext['handleListOptions'];
  toggleLinkedItems: TResItemContext['toggleLinkedItems'];
}

const createListReducer = (
  state: TPriceList<TPricelistTypes>,
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
  state: TLinkedListConfig,
  action: { type?: TLinkedListConfigAction, data?: TLinkedListConfig}
) => {
  switch (action.type) {
    case 'SET_COMPLEX_DATA':
      return setListConfig([true, false]);

    case 'UNSET_COMPLEX_DATA':
      return setListConfig([false]);

    case 'SET_GROUP_IGNORED':
      return setListConfig([true, true]);

    case 'UNSET_GROUP_IGNORED':
      return setListConfig([true, false]);

    case 'SET_GROUP_USED':
      return setListConfig([true]);

    case 'UNSET_GROUP_USED':
      return setListConfig([true, true]);

    default:
      return action.data || (!state ? state : null);
  }
};
const existableListReducer = (state: TPriceList<TPricelistTypes>, action: TListReducerOptions) => createListReducer(state, action);
const linkedListReducer = (state: TPriceList<TPricelistTypes>, action: TListReducerOptions) => createListReducer(state, action);

/**
 * Формирование структуры элементов прайслиста, доступных для привязки к ресурсу
 *
 * Используемые состояния:
 * TODO: составить список
 */
const useResLinks = (): IResLinks => {
  const [linkedListConfig, setLinkedListConfig] = useReducer(listConfigReducer, null);
  const [existableList, setExistableList] = useReducer(
    existableListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );
  const [linkedList, setLinkedList] = useReducer(
    linkedListReducer,
    { [TYPES[DEPT_KEY]]: [], [TYPES[SUBDEPT_KEY]]: [], [TYPES[GROUP_KEY]]: [], [TYPES[ITEM_KEY]]: [] }
  );

  const { id: resId } = useParams();

  const pricelist = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as TPriceList<TPricelistExtTypes>
  ));

  /**
   * Возвращает списки элементов прайслиста в зависимости от их родительских категорий
   * @returns TListReducerOptions - данные для сохранения в локальном состоянии
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const handleResList = ({ array, key, categoryKey }: TLinkedListData): TListReducerOptions => {
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
  const handleResItemsList = ({ array, key, categoryKey }: TLinkedListData): TListReducerOptions => {
    const payload = handleResList({ array, key, categoryKey });

    if(payload.arr?.length === 0) {
      return payload;
    }

    return {
      ...payload,
      arr: payload.arr?.filter(item => item[GROUP_KEY] === 0)
    };
  };
   */

  /**
   * Устанавливает списки выбранных элементов прайслиста
   * @property {TItemsArr} array - массив элементов
   * @property {TPricelistKeys} key - тип элементов
   * @property {AutocompleteChangeReason} action - тип взаимодействия с выпадающим списком
   */
  const handleListOptions = ({ action, key, arr }: TListHandlerOptions): void => {
    //console.log({ action, key, arr });
    if(action == CLEAR_OPTION_KEY) {
      setLinkedList({ type: REMOVE_ACTION_KEY, key, arr: [] });
      return;
    }

    setLinkedList({
      key,
      type: ADD_ACTION_KEY,
      arr: action == REMOVE_OPTION_KEY ? arr : fetchArray([...linkedList[TYPES[key]], ...arr], ID_KEY)
    });
  };

  /**
   * Обновляет список привязанных элементов при изменении родительских категорий
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const updateSubcategoryList = (payload: TLinkedListData) => {
    const { array, categoryKey } = payload;
    const keys: Partial<Record<TPricelistKeys, TPricelistKeys[]>> = {
      [DEPT_KEY]: [SUBDEPT_KEY, GROUP_KEY, ITEM_KEY],
      [SUBDEPT_KEY]: [GROUP_KEY, ITEM_KEY],
    };
    //console.log({ array, key, categoryKey });

    if(array.length === 0 && keys[categoryKey]) {
      setLinkedListConfig({});
      keys[categoryKey]?.forEach(key => handleListOptions({ action: CLEAR_OPTION_KEY, key, arr: [] }));
      return;
    }

    if(keys[categoryKey]) {
      keys[categoryKey]?.forEach((key) => {
        const { arr: existableArr } = handleResList({ array, key, categoryKey });
        const arr = linkedList[TYPES[key]].reduce(
          (acc: TItemsArr, linkedItem) => {
            const data = existableArr?.find(item => item[ID_KEY] === linkedItem[ID_KEY]);

            return data ? [...acc, data] : acc;
          }, []
        );

        handleListOptions({ action: REMOVE_OPTION_KEY, key, arr });
      });
    }
  };

  /**
   * Обновляет список привязанных групп и услуг
   * @property {TItemsArr} array - массив выбранных элементов
   * @property {TItemData} data - данные элемента
   * @property {TPricelistKeys} key - ключ элемента прасйлиста
   */
  const toggleLinkedItems = ({ arr, data, key }: TListTogglerData) => {
    const payload: TListHandlerOptions = { action: SELECT_OPTION_KEY, key, arr: [data] };

    if(arr.length === 0) {
      handleListOptions(payload);
      return;
    }

    const linkedList = arr.filter(item => item[ID_KEY] !== data[ID_KEY]);
    // нет в arr: linkedList.length === arr.length
    // есть в arr: linkedList.length === arr.length - 1

    handleListOptions({
      ...payload,
      ...( linkedList.length === arr.length - 1 && { action: REMOVE_OPTION_KEY, arr: linkedList } )
    });
  };

  /**
   * Устанавливает в локальное хранилище список привязанных элементов
   * @property {TItemsArr} array - массив родительских элементов
   * @property {TPricelistKeys} key - тип дочерних элементов
   * @property {TPricelistKeys} categoryKey - ключ родительской категории
   */
  const updateCategoryList = (payload: TLinkedListData) => {
    const data = handleResList(payload);

    setExistableList(data);
    updateSubcategoryList(payload);
  };

  /**
   * Переключение параметров конфигурации обработки прикреплённых к ресурсу позиций прайслиста
   * @property {TLinkedListConfigAction} type - тип действия
   * @property {TLinkedListConfig} data - объект значений параметров конфигурации
   */
  const handleLinkedListConfig = (type: TLinkedListConfigAction, data: TLinkedListConfig = null) => {
    //console.log({ type, data });
    setLinkedListConfig({ type, data });
  };

  /**
   * Автоматическая установка параметра конфигурации "Комплексный выбор", если список доступных для выбора групп пуст
   * @property {TPriceList<TPricelistTypes>} data - список доступных для выбора элементов прайслиста
   */
  const updateListConfig = (data: TPriceList<TPricelistTypes>) => {
    const { groupsList, itemsList } = {
      groupsList: data[TYPES[GROUP_KEY]],
      itemsList: data[TYPES[ITEM_KEY]]
    };

    if(groupsList.length === 0 && itemsList.length > 0) {
      handleLinkedListConfig('SET_COMPLEX_DATA');
    }
  };

  /**
   * Сохранение в состояние компонента ресурса данных ранее привязанных элементов прайслиста
   * @property {TItemsArr} arr - массив данных привязанных к ресурсам позиций
   */
  const setCurrentLinkedList = (arr: TItemsArr) => {
    const data = arr.find(item => item[ID_KEY] === Number(resId));

    if(!data) {
      return;
    }

    const keys: TPricelistKeys[] = [DEPT_KEY, SUBDEPT_KEY, GROUP_KEY, ITEM_KEY];
    const params: TLinkedListConfig = JSON.parse(data.config.toString());
    const { config, isConfigSet }: {
      config: Record<TResLinkParams, boolean>;
      isConfigSet: boolean;
    } = {
      config: params || setListConfig([false]),
      isConfigSet: Boolean(params && Object.values(params).reduce((acc: boolean, item: boolean) => acc || item, false))
    };

    if(isConfigSet) {
      setLinkedListConfig({ data: config });
    }

    keys.forEach((key) => {
      const arr = JSON.parse(data[TYPES[key]].toString()).map(
        (value: number) => pricelist[TYPES[key]].find(item => item[ID_KEY] === value)
      );

      setLinkedList({ key, type: ADD_ACTION_KEY, arr });

      if(key === ITEM_KEY && arr.length > 0 && !isConfigSet) {
        handleLinkedListConfig('SET_COMPLEX_DATA');
      }
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

  useEffect(() => {
    updateListConfig(existableList);
  }, [
    existableList[TYPES[GROUP_KEY]],
    existableList[TYPES[ITEM_KEY]]
  ]);

  useEffect(() => {
    setCurrentLinkedList(pricelist[RESLINKS_KEY]);
  }, [
    pricelist[RESLINKS_KEY]
  ]);

  return {
    existableList,
    linkedList,
    linkedListConfig,
    handleLinkedListConfig,
    handleListOptions,
    toggleLinkedItems
  }
}

export default useResLinks;
