import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  RESLINKS_KEY,
  ID_KEY,
  NAME_KEY,
  CATEGORY_KEY,
  LABEL_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCategorySelectorHandler,
  TCustomData,
  TItemsArr,
  TItemData,
  TLinkedDataConfigAction,
  TLinkedDataConfigHandler,
  TLinkedResData,
  TPriceList,
  TPricelistExtTypes,
  TPricelistKeys,
  TPricelistTypes
} from '../types';

import { sortArrValues, fetchArray, getMatchedItems } from '../utils';

interface IResLinks {
  existableDepts: TItemsArr;
  existableSubdepts: TItemsArr;
  existableGroups: TItemsArr;
  existableItems: TItemsArr;
  linkedDepts: TItemsArr;
  linkedSubdepts: TItemsArr;
  linkedGroups: TItemsArr;
  linkedItems: TItemsArr;
  linkedDataConfig: Record<string, boolean> | null;
  resLinkHandlers: TCategorySelectorHandler;
  //isLinkedItemActive: (arr: TItemsArr, data: TItemData) => boolean;
  handleDataConfig: TLinkedDataConfigHandler;
}

const dataConfigReducer = (
  state: IResLinks['linkedDataConfig'],
  action: { type?: TLinkedDataConfigAction, data: IResLinks['linkedDataConfig'] }
) => {
  switch (action.type) {
    case 'SET_COMPLEX_DATA':
      return {
        [IS_COMPLEX_DATA_KEY]: true,
        [IS_GROUP_IGNORED_KEY]: false,
        [IS_GROUP_USED_KEY]: false
      };
    case 'UNSET_COMPLEX_DATA':
      return {
        [IS_COMPLEX_DATA_KEY]: false,
        [IS_GROUP_IGNORED_KEY]: false,
        [IS_GROUP_USED_KEY]: false
      };
    case 'SET_GROUP_IGNORED':
      return {
        [IS_COMPLEX_DATA_KEY]: true,
        [IS_GROUP_IGNORED_KEY]: true,
        [IS_GROUP_USED_KEY]: false
      };
    case 'UNSET_GROUP_IGNORED':
      return {
        [IS_COMPLEX_DATA_KEY]: true,
        [IS_GROUP_IGNORED_KEY]: false,
        [IS_GROUP_USED_KEY]: false
      };
    case 'SET_GROUP_USED':
      return {
        [IS_COMPLEX_DATA_KEY]: true,
        [IS_GROUP_IGNORED_KEY]: true,
        [IS_GROUP_USED_KEY]: true
      };
    case 'UNSET_GROUP_USED':
      return {
        [IS_COMPLEX_DATA_KEY]: true,
        [IS_GROUP_IGNORED_KEY]: true,
        [IS_GROUP_USED_KEY]: false
      };
    default:
      return action.data || null;
  }
};

// TODO: отыскать вероятные места применения useCallback и useMemo
/**
 * Формирование структуры элементов прайслиста, доступных для привязки к ресурсу
 *
 * Используемые состояния:
 * - existableDepts: список доступных для выбора отделений;
 * - existableSubdepts: список доступных для выбора специализаций;
 * - existableGroups: список доступных для выбора групп;
 * - existableItems: список доступных для выбора услуг;
 * - linkedDepts: список выбранных отделений;
 * - linkedSubdepts: список выбранных отделений;
 * - linkedGroups: список выбранных отделений;
 * - linkedItems: список выбранных отделений;
 * - linkedDataConfig: конфигурация структуры списка цен на сайте.
 *
 * @returns {TItemsArr} existableDepts;
 * @returns {TItemsArr} existableSubdepts;
 * @returns {TItemsArr} existableGroups;
 * @returns {TItemsArr} existableItems;
 * @returns {TItemsArr} linkedDepts;
 * @returns {TItemsArr} linkedSubdepts;
 * @returns {TItemsArr} linkedGroups;
 * @returns {TItemsArr} linkedItems;
 * @returns {Record<string, boolean>|null} linkedDataConfig;
 * @returns {TCategorySelectorHandler} resLinkHandlers,
 * @returns {function} isLinkedItemActive - истинность наличия объекта в массиве привязанных к ресурсу элементов;
 * @returns {function} handleDataConfig - устанавливает состояние конфигурации списка цен для отображения на сайте.
 */
const useResLinks = (): IResLinks => {
  const [existableDepts, setExistableDepts] = useState<TItemsArr>([]);
  const [existableSubdepts, setExistableSubdepts] = useState<TItemsArr>([]);
  const [existableGroups, setExistableGroups] = useState<TItemsArr>([]);
  const [existableItems, setExistableItems] = useState<TItemsArr>([]);

  const [linkedDepts, setLinkedDepts] = useState<TItemsArr>([]);
  const [linkedSubdepts, setLinkedSubdepts] = useState<TItemsArr>([]);
  const [linkedGroups, setLinkedGroups] = useState<TItemsArr>([]);
  const [linkedItems, setLinkedItems] = useState<TItemsArr>([]);

  const [linkedDataConfig, setLinkedDataConfig] = useReducer(dataConfigReducer, null);

  const { id: resId } = useParams();

  const pricelist = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as TPriceList<TPricelistExtTypes, TItemsArr>
  ));

  /**
   * Возвращает объект массивов, соответствующих категориям элементов прайслиста
   * @returns {TPriceList<TPricelistTypes, TItemsArr>} объект, содержащий списки элементов прайслиста
   * @property {TItemsArr} arr - массив, содержащий состояния доступных или выбранных элементов
   */
  const setResData = (arr: TItemsArr[]): TPriceList<TPricelistTypes, TItemsArr> => arr.reduce(
    (acc, item, index) => ({ ...acc, [Object.keys(TYPES)[index]]: item }), {} as TPriceList<TPricelistTypes, TItemsArr>
  );

  /**
   * Обрабатывет массив дочерних элементов категории, добавляя название родителя в объекты массива
   * @returns {TItemsArr} массив дочерних элементов, объекты которых содержат наименование родительской категории
   * @property {TItemsArr} arr - массив элементов-категорий
   * @property {TItemsArr} childrenArr - массив дочерних элементов категории
   * @property {TPricelistKeys} categoryKey - категория прайслиста
   */
  const handleSortedArr = (
    arr: TItemsArr,
    childrenArr: TItemsArr,
    categoryKey: TPricelistKeys
  ): TItemsArr => childrenArr.map(
    (item) => {
      const category = arr.find(data => item[categoryKey] === data[ID_KEY]) || { [NAME_KEY]: item[CATEGORY_KEY] };

      return {
        ...item,
        [LABEL_KEY]: item[NAME_KEY],
        [CATEGORY_KEY]: category ? category[NAME_KEY] : ''
      };
    }
  );

  /*
  const existableData: TPriceList<TPricelistTypes, TItemsArr> = useMemo(
    () => setResData([existableDepts, existableSubdepts, existableGroups, existableItems]),
    [existableDepts, existableSubdepts, existableGroups, existableItems]
  );
  */

  const resLinkData: TPriceList<TPricelistTypes, TItemsArr> = useMemo(
    () => setResData([linkedDepts, linkedSubdepts, linkedGroups, linkedItems]),
    [linkedDepts, linkedSubdepts, linkedGroups, linkedItems]
  );

  const existableDataHandlers = [
    setExistableDepts,
    setExistableSubdepts,
    setExistableGroups,
    setExistableItems
  ].reduce((acc, handler, index) => ({
    ...acc,
    [Object.keys(TYPES)[index]]: (arr: TItemsArr) => handler(
      sortArrValues(
        handleSortedArr(
          pricelist[Object.values(TYPES)[index]],
          arr,
          Object.keys(TYPES)[index] as TPricelistKeys
        ),
        CATEGORY_KEY
      )
    )
  }), {} as Record<TPricelistKeys, (arr: TItemsArr) => void>);

  const resLinkHandlers = [
    setLinkedDepts,
    setLinkedSubdepts,
    setLinkedGroups,
    setLinkedItems
  ].reduce((acc, handler, index) => ({
    ...acc,
    [Object.keys(TYPES)[index]]: (payload: TLinkedResData) => handler(
      handleLinkedItems(
        resLinkData[Object.keys(TYPES)[index]],
        {
          ...payload,
          key: Object.keys(TYPES)[index]
        }
      )
    )
  }), {} as Record<TPricelistKeys, (payload: TLinkedResData) => void>);

  /**
   * Переключение параметров конфигурации обработки прикреплённых к ресурсу позиций прайслиста
   * @property {TLinkedDataConfigAction} type - тип действия
   * @property {IResLinks['linkedDataConfig']} data - объект значений параметров конфигурации
   */
  const handleDataConfig = (type: TLinkedDataConfigAction, data: IResLinks['linkedDataConfig'] = null) => {
    setLinkedDataConfig({ type, data });
  }

  /**
   * Обновляет массив подкатегории при изменении списка прикреплённых к ресурсу элементов
   * @property {TItemsArr} arr - массив текущих элементов, прикреплённых к ресурсу
   * @property {TItemsArr} items - массив передаваемых элементов
   * @property {TPricelistKeys|string} key - ключ подкатегории
   * @property {string} action - тип действия
   */
  const handleExistableItems = (
    { arr, items }: TCustomData<TItemsArr>,
    { key, action }: { key: TPricelistKeys | string; action: string; }
  ) => {
    const isOptionRemoved = [
      key,
      key !== DEPT_KEY,
      action === 'removeOption'
    ].reduce((acc, item) => acc && Boolean(item), true);

    if(!isOptionRemoved) {
      return;
    }

    existableDataHandlers[key as TPricelistKeys](
      sortArrValues(
        fetchArray(
          [
            ...existableData[key as TPricelistKeys],
            ...arr.filter(item => !items.map(data => data[ID_KEY]).includes(item[ID_KEY]))
          ],
          ID_KEY
        ),
        NAME_KEY
      )
    );
  };

  /**
   * Возвращает массив элементов для установки нового состояния
   * @returns {TItemsArr} массив подходящих элементов
   * @property {TItemsArr} arr - массив текущих элементов, прикреплённых к ресурсу
   * @property {TItemsArr} items - массив передаваемых элементов
   * @property {TItemData} data - данные передаваемого элемента
   * @property {string} key - ключ подкатегории
   * @property {string} action - тип действия
   */
  const handleLinkedItems = (arr: TItemsArr, { action, data, items, key }: TLinkedResData): TItemsArr => {
    handleExistableItems(
      { arr, items: items || [] },
      { key: key || '', action: action || '' }
    );

    if(!data) {
      return items && Array.isArray(items) ? [...items] : [];
    }

    return isLinkedItemActive(arr, data)
      ? [...arr].filter(item => item[ID_KEY] !== data[ID_KEY])
      : [...arr, data];
  };

  /**
   * Формирует массив дочерних элементов выбранных категорий
   * @returns {TItemsArr} массив подходящих элементов
   * @property {TItemsArr} arr - массив объектов родительской категории
   * @property {TPricelistKeys} categoryKey - ключ параметра категории, напр. DEPT_KEY
   * @property {TPricelistKeys} currentKey - ключ параметра дочернего элемента, напр. SUBDEPT_KEY
   * @property {TPricelistKeys} extendedKey - ключ для выборки услуг, вложенных напрямую в специализацию, напр. GROUP_KEY
   */
  const filterItems = (
    arr: TItemsArr,
    categoryKey: TPricelistKeys,
    currentKey: TPricelistKeys,
    extendedKey: TPricelistKeys | null = null
  ): TItemsArr => {
    if(!arr.length) {
      resLinkHandlers[currentKey]({ items: [] });

      return [];
    }

    const subCategoryItems: TItemsArr = sortArrValues(
      getMatchedItems(
        arr,
        [ITEM_KEY, GROUP_KEY].includes(currentKey)
          ? pricelist[TYPES[currentKey]]
          : pricelist[TYPES[currentKey]].filter(
              item => !resLinkData[currentKey].map(data => data[ID_KEY]).includes(item[ID_KEY])
            ),
        categoryKey
      ),
      NAME_KEY
    );

    resLinkHandlers[currentKey]({
      items: getMatchedItems(arr, resLinkData[currentKey], categoryKey)
    });

    return sortArrValues(
      extendedKey
        ? handleSortedArr(arr, subCategoryItems, categoryKey).filter(item => item[extendedKey] === 0)
        : handleSortedArr(arr, subCategoryItems, categoryKey),
      CATEGORY_KEY
    );
  };

  /**
   * Обновляет состояние конфигурации при выборе специализаций с вложенными услугами
   */
  const updateComplexDataConfig = () => {
    if(linkedDataConfig !== null && linkedDataConfig[IS_COMPLEX_DATA_KEY]) {
      handleDataConfig('SET_COMPLEX_DATA');
    } else {
      setLinkedDataConfig({ data: null });
    }
  }

  /**
   * Обновляет состояния списков услуг при изменении состояния конфигурации
   */
  const updateLinkedDataConfig = () => {
    if(linkedDataConfig !== null && linkedDataConfig[IS_COMPLEX_DATA_KEY] !== undefined) {
      setLinkedItems([]);
    }

    if(linkedDataConfig !== null && linkedDataConfig[IS_GROUP_IGNORED_KEY]) {
      setExistableItems(
        filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY)
      );
    } else {
      setExistableItems(
        filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
      );
    }
  };

  /**
   * Устанавливает локальные состояния существующих и выбранных элементов ресурса при обновлении глобального хранилища
   */
  const setResLinks = () => {
    const data = pricelist[RESLINKS_KEY].find(item => item[ID_KEY] === Number(resId));

    //console.log({data});

    if(!data) {
      return;
    }

    const itemsArr: number[] = JSON.parse(data[TYPES[ITEM_KEY]] as string);

    setLinkedDataConfig({ data: JSON.parse(data.config as string) });

    Object.values(TYPES).forEach((key, index) => {
      //console.log(pricelist[key].filter(item => JSON.parse(data[key]).includes(item[ID_KEY])));
      resLinkHandlers[Object.keys(TYPES)[index] as TPricelistKeys]({
        items: pricelist[key].filter(item => JSON.parse(data[key] as string).includes(item[ID_KEY]))
      })
    });

    if(itemsArr.length > 0) {
      handleDataConfig('SET_COMPLEX_DATA');
    }
  }

  // при получении данных прайслиста, устанавливаем список доступных отделений - готово
  useEffect(() => {
    setExistableDepts(pricelist[TYPES[DEPT_KEY]]);
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  // после установки списка выбранных отделений устанавливаем список доступных специализаций
  // и сбрасываем конфигурацию
  useEffect(() => {
    setExistableSubdepts(
      filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY) // +
    );
    setLinkedDataConfig({ data: null }); // +
  }, [
    linkedDepts
  ]);

  // после установки списка выбранных специализаций устанавливаем список доступных групп и услуг
  // и обновляем конфигурацию
  useEffect(() => {
    setExistableGroups(
      filterItems(linkedSubdepts, SUBDEPT_KEY, GROUP_KEY) // +
    );
    setExistableItems(
      filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY) // +
    );
    updateComplexDataConfig(); // ? - больше относится к изменению состояния после получения данных с сервера
  }, [
    linkedSubdepts
  ]);

  // при обновлении конфигурации записываем новое значение в локальное состояние
  useEffect(() => {
    updateLinkedDataConfig(); // ? - пока неясно, понадобится ли
  }, [
    linkedDataConfig
  ]);

  // устанавливаем привязки при изменении глобального хранилища
  useEffect(() => {
    // TODO: перенести метод в основной компонент
    setResLinks();
  }, [
    pricelist[RESLINKS_KEY]
  ]);

  return {
    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,
    linkedDepts,
    linkedSubdepts,
    linkedGroups,
    linkedItems,
    linkedDataConfig,
    resLinkHandlers,
    //isLinkedItemActive,
    //handleDataConfig
  }
}

export default useResLinks;
