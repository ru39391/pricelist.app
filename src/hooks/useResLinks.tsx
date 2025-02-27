import { useState, useEffect } from 'react';
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
  IS_GROUP_IGNORED_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCategorySelectorHandler,
  TCustomData,
  TItemsArr,
  TItemData,
  TLinkedResData,
  TPricelistExtTypes,
  TPricelistKeys
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
  isLinkedItemActive: (arr: TItemsArr, data: TItemData) => boolean;
  handleDataConfig: (data: Record<string, boolean>) => void;
}

// TODO: отыскать вероятные места применения useCallback и useMemo
const useResLinks = (): IResLinks => {
  const [existableDepts, setExistableDepts] = useState<TItemsArr>([]);
  const [existableSubdepts, setExistableSubdepts] = useState<TItemsArr>([]);
  const [existableGroups, setExistableGroups] = useState<TItemsArr>([]);
  const [existableItems, setExistableItems] = useState<TItemsArr>([]);

  const [linkedDepts, setLinkedDepts] = useState<TItemsArr>([]);
  const [linkedSubdepts, setLinkedSubdepts] = useState<TItemsArr>([]);
  const [linkedGroups, setLinkedGroups] = useState<TItemsArr>([]);
  const [linkedItems, setLinkedItems] = useState<TItemsArr>([]);

  const [linkedDataConfig, setLinkedDataConfig] = useState<Record<string, boolean> | null>(null);

  const { id: resId } = useParams();

  const pricelist: TCustomData<TItemsArr>  = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce((acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {}
  ));

  const setResData = (arr: TItemsArr[]): TCustomData<TItemsArr> => arr.reduce(
    (acc, item, index) => ({ ...acc, [Object.keys(TYPES)[index]]: item }), {}
  );

  const handleSortedArr = (
    arr: TItemsArr,
    childrenArr: TItemsArr,
    categoryKey: TPricelistKeys
  ): TItemsArr => childrenArr.map(
    (item) => {
      const category = arr.find(data => item[categoryKey] === data[ID_KEY]);

      return {
        ...item,
        [LABEL_KEY]: item[NAME_KEY],
        [CATEGORY_KEY]: category ? category[NAME_KEY] : ''
      };
    }
  );

  const existableData: TCustomData<TItemsArr> = setResData([existableDepts, existableSubdepts, existableGroups, existableItems]);

  const resLinkData: TCustomData<TItemsArr> = setResData([linkedDepts, linkedSubdepts, linkedGroups, linkedItems]);

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

  const handleDataConfig = (data: TCustomData<boolean>) => {
    setLinkedDataConfig(linkedDataConfig ? { ...linkedDataConfig, ...data } : { ...data });
  }

  /**
   * Проверка наличия объекта в массиве привязанных к ресурсу элементов
   * @returns {boolean}
   */
  const isLinkedItemActive = (arr: TItemsArr, data: TItemData): boolean => arr.map(item => item[ID_KEY]).includes(data[ID_KEY]);

  /**
   * Обновляет массив подкатегории при удалении прикреплённого к ресурсу элемента
   * @property {object[]} arr - массив текущих элементов, прикреплённых к ресурсу
   * @property {object[]} items - массив передаваемых элементов
   * @property {string} key - ключ подкатегории
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
   * @returns {object[]} массив подходящих элементов
   * @property {object[]} arr - массив текущих элементов, прикреплённых к ресурсу
   * @property {object[]} items - массив передаваемых элементов
   * @property {object} data
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
   * @returns {object[]} массив подходящих элементов
   * @property {object[]} arr - массив объектов родительской категории
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

  const updateComplexDataConfig = () => {
    if(linkedDataConfig !== null && linkedDataConfig[IS_COMPLEX_DATA_KEY]) {
      setLinkedDataConfig({ [IS_COMPLEX_DATA_KEY]: true });
    } else {
      setLinkedDataConfig(null);
    }
  }

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

  const setResLinks = () => {
    const data = pricelist[RESLINKS_KEY].find(item => item[ID_KEY] === Number(resId));

    if(!data) {
      return;
    }

    setLinkedDataConfig(JSON.parse(data.config as string));

    Object.values(TYPES).forEach((key, index) => {
      //console.log(pricelist[key].filter(item => JSON.parse(data[key]).includes(item[ID_KEY])));
      resLinkHandlers[Object.keys(TYPES)[index] as TPricelistKeys]({
        items: pricelist[key].filter(item => JSON.parse(data[key] as string).includes(item[ID_KEY]))
      })
    });
  }

  useEffect(() => {
    setExistableDepts(pricelist[TYPES[DEPT_KEY]]);
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    setExistableSubdepts(
      filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY)
    );
    setLinkedDataConfig(null);
    // console.log({linkedDepts, subdepts: filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY)});
  }, [
    linkedDepts
  ]);

  useEffect(() => {
    setExistableGroups(
      filterItems(linkedSubdepts, SUBDEPT_KEY, GROUP_KEY)
    );
    setExistableItems(
      filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
    );
    updateComplexDataConfig();
  }, [
    linkedSubdepts
  ]);

  useEffect(() => {
    updateLinkedDataConfig();
  }, [
    linkedDataConfig
  ]);

  useEffect(() => {
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
    isLinkedItemActive,
    handleDataConfig
  }
}

export default useResLinks;
