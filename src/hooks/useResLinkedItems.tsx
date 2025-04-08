import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ID_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  RESLINKS_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_VISIBLE_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistData,
  TLinkedDept,
  TLinkedSubdept,
  TLinkedGroup,
  TLinkedItem,
  TResLinkedAction,
  TPricelistExtTypes,
  TResLinkParams,
  TLinkedDeptKeys,
  TLinkedSubdeptKeys,
  TLinkedGroupKeys,
  TPriceList,
  TPricelistKeys
} from '../types';

import { fetchArray, getMatchedItems, sortArrValues } from '../utils';

type TResLinkedData = {
  arr: TLinkedSubdept[];
  config: TCustomData<boolean> | null;
}

type TCurrResLinkedData = {
  item: TItemData | undefined;
  data: TItemData;
}

type TResItemsData = {
  groups: TLinkedGroup[];
  pricelist: TLinkedItem[];
}

type TResItemsKeys = keyof TResItemsData;

type TGroupedItemsData = {
  items: TItemsArr;
  groups: TItemsArr;
  config: Record<typeof IS_GROUP_IGNORED_KEY | typeof IS_COMPLEX_DATA_KEY, boolean>;
};

interface IResLinkedItems {
  resLinkedItems: TLinkedDept[];
  resLinkedData: TResLinkedAction | null;
  isLinkedListExist: boolean;
  isLinkedListCurrent: boolean;
  renderLinkedItems: (payload: TPricelistData, config: TCustomData<boolean> | null) => void;
  resetLinkedItems: () => void;
  setGroupedLinkedItems: ({ items, groups, config }: TGroupedItemsData) => TItemsArr;
  handleLinkedDepts: (isListExist: boolean, arr: TItemsArr) => void;
}

/**
 * Обработка выбранных элементов прайслиста для привязки к ресурсу
 *
 * Используемые состояния:
 * - resLinkedItems: список привязанных к ресурсу элементов прайслиста;
 * - resLinkedData: обработанные для сохранения данные привязки;
 * - isLinkedListExist: истинность существования списка привязанных к ресурсу элементов;
 * - isLinkedListCurrent: истинность изменения списка элементов прайслиста текущего ресурса.
 *
 * @returns {TLinkedDept[]} resLinkedItems;
 * @returns {TResLinkedAction|null} resLinkedData;
 * @returns {boolean} isLinkedListExist;
 * @returns {boolean} isLinkedListCurrent;
 * @returns {function} renderLinkedItems - обработка привязанных пользователем элементов ресурса;
 * @returns {function} resetLinkedItems - сброс привязанных пользователем элементов ресурса;
 * @returns {function} setGroupedLinkedItems - вычисляет привязанные к ресурсу позиции в зависимости от установленной конфигурации групп;
 * @returns {function} handleLinkedDepts - реализует возможность привязать к ресурсу отделение, минуя выбор дочерних элементов.
 */
const useResLinkedItems = (): IResLinkedItems => {
  /**
   * Список привязанных к ресурсу элементов прайслиста:
   * - принимает массив объектов отделений с доп. ключами,
   * соответствующих элементам ниже по иерархии
   */
  const [resLinkedItems, setResLinkedItems] = useState<TLinkedDept[]>([]);
  /**
   * Обработанные данные элементов, соответствующих ресурсу:
   * - содержит тип действия - сохранение или обновление,
   * - а также объект со списками идентификаторов привязанных к ресурсу элементов и описание их кофигурации
   */
  const [resLinkedData, setResLinkedData] = useState<TResLinkedAction | null>(null);
  /**
   * Истинность существования списка привязанных к ресурсу элементов прайслиста:
   * - истинно, если длина массива объектов групп и позиций больше нуля
   */
  const [isLinkedListExist, setLinkedListExist] = useState<boolean>(false);
  /**
   * Истинность изменения списка элементов прайслиста текущего ресурса
   */
  const [isLinkedListCurrent, setLinkedListCurrent] = useState<boolean>(true);

  const { id: resId } = useParams();

  const {
    response,
    pricelist
  } = useSelector(({ pricelist }) => ({
    response: pricelist.response,
    pricelist: [...Object.values(TYPES), RESLINKS_KEY].reduce(
      (acc, key) => ({ ...acc, [key]: pricelist[key as TPricelistExtTypes] }), {} as  TPriceList<TPricelistExtTypes>
    )
  }));

  /**
   * Сравнивает текущие данные привязки ресурса с обновлёнными
   * @property {object|undefined} item - текущие данные ресурса
   * @property {object} data - обновлённые данные
   */
  const handleCurrResLinkedData = ({ item, data }: TCurrResLinkedData) => {
    if(!item) {
      setLinkedListCurrent(Boolean(item));
      return;
    }

    const isDataCurrent = Object.keys(data).reduce((acc, key) => acc && item[key] === data[key], true);

    setLinkedListCurrent(isDataCurrent);
  };

  /**
   * Устанавливает состояние истинности изменения данных и записывает в состояние для передачи на сервер
   * @property {object} data - параметры отображения списка элементов на сайте
   */
  const handleUpdResLinkedData = (data: Record<string, string | number>) => {
    const currResLinkedData = pricelist[RESLINKS_KEY].find(item => item[ID_KEY] === Number(resId));

    handleCurrResLinkedData({ data, item: currResLinkedData });
    setResLinkedData({ data, action: currResLinkedData ? EDIT_ACTION_KEY : ADD_ACTION_KEY });
  }

  /**
   * Формирует объект обновлённых данных элементов прайслиста, привязанных к ресурсу
   * @property {object[]} arr - массив с данными отделений, соответствующих ресурсу
   * @property {object|null} config - параметры отображения списка элементов на сайте
   */
  const updateLinkedItems = ({ arr, config }: TResLinkedData) => {
    const handleLinkedItems = (
      array: TLinkedItem[] | TLinkedGroup[] | TLinkedSubdept[] | TItemsArr
    ) => JSON.stringify(
      array.map((item: TLinkedItem | TLinkedGroup | TLinkedSubdept | TItemData) => item[ID_KEY])
    );

    //const currResLinkedData = pricelist[RESLINKS_KEY].find(item => item[ID_KEY] === Number(resId));
    const data = {
      [TYPES[GROUP_KEY]]: arr.reduce(
        (acc: TLinkedGroup[], item) => {
          const groups = item[TYPES[GROUP_KEY] as TLinkedSubdeptKeys] as TLinkedGroup[];

          return [
            ...acc,
            ...groups.filter((group: TLinkedGroup) => {
              const items = group[TYPES[ITEM_KEY] as TLinkedGroupKeys] as TLinkedItem[];

              return items.length > 0;
            })
          ]
        }, []
      ),
      [TYPES[ITEM_KEY]]: arr.reduce(
        (acc: TLinkedItem[], item) => [...acc, ...item[TYPES[ITEM_KEY] as TLinkedSubdeptKeys] as TLinkedItem[]], []
      )
    } as TResItemsData;
    const params = [
        IS_COMPLEX_DATA_KEY,
        IS_GROUP_IGNORED_KEY,
        IS_GROUP_USED_KEY
      ].reduce((acc, key) => ({
        ...acc,
        [key]: config === null ? false : Boolean(config[key])
      }), {} as Record<TResLinkParams, boolean>);
    const groups = data[TYPES[GROUP_KEY] as TResItemsKeys] as TLinkedGroup[];
    const updResLinkedData = {
      [ID_KEY]: Number(resId),
      [TYPES[DEPT_KEY]]: handleLinkedItems(
        fetchArray(arr.map(item => ({ [ID_KEY]: item[DEPT_KEY] })), ID_KEY)
      ),
      [TYPES[SUBDEPT_KEY]]: handleLinkedItems(arr),
      [TYPES[GROUP_KEY]]: handleLinkedItems(data[TYPES[GROUP_KEY] as TResItemsKeys]),
      [TYPES[ITEM_KEY]]: handleLinkedItems(
        [
          ...data[TYPES[ITEM_KEY] as TResItemsKeys] as TLinkedItem[],
          ...groups.reduce(
              (acc: TLinkedItem[], item: TLinkedGroup) => [...acc, ...item[TYPES[ITEM_KEY] as TLinkedGroupKeys] as TLinkedItem[]], [] as TLinkedItem[]
            )
        ].filter(item => item[IS_VISIBLE_KEY])
      ),
      config: JSON.stringify(params)
    }

    handleUpdResLinkedData(updResLinkedData);
    /*
    handleCurrResLinkedData({
      item: currResLinkedData,
      data: updResLinkedData
    });
    setResLinkedData({
      action: currResLinkedData ? EDIT_ACTION_KEY : ADD_ACTION_KEY,
      data: updResLinkedData
    });
    */
  };

  /**
   * Реализует возможность привязать к ресурсу отделение, минуя выбор дочерних элементов
   */
  const handleLinkedDepts = (isListExist: boolean, arr: TItemsArr) => {
    if(!isListExist || arr.length !== 1) {
      return;
    }

    const params = [IS_COMPLEX_DATA_KEY, IS_GROUP_IGNORED_KEY, IS_GROUP_USED_KEY].reduce(
      (acc, key) => ({ ...acc, [key as TResLinkParams]: false }), {} as Record<TResLinkParams, boolean>
    );
    const data = {
      [ID_KEY]: Number(resId),
      [TYPES[DEPT_KEY]]: JSON.stringify(arr.map(item => item[ID_KEY])),
      config: JSON.stringify(params),
      ...( [SUBDEPT_KEY, GROUP_KEY, ITEM_KEY].reduce((acc, key) => ({ ...acc, [TYPES[key as TPricelistKeys]]: '[]' }), {} as Record<TPricelistKeys, string>) )
    };

    handleUpdResLinkedData(data);
  }

  /**
   * Обрабатывает установленные пользователем значения
   * - устанавливает состояние для отрисовки списка элементов прайслиста,
   * - устанавливает состояние истинности существования массива обработанных элементов,
   * - передаёт данные для проверки изменения данных ресурса
   * @property {object} payload - объект, содержащий массивы элементов, соответствующих ресурсу (отделения, специализации, группы, позиции)
   * @property {object|null} config - параметры отображения на сайте
   */
  const renderLinkedItems = (
    payload: TPricelistData,
    config: TCustomData<boolean> | null
  ) => {
    //console.log({payload, config});
    const updateItemsArr = (arr: TItemsArr): TLinkedItem[] => sortArrValues(
      arr.map((item: TItemData) => ({
        [ID_KEY]: item[ID_KEY] as number,
        [NAME_KEY]: item[NAME_KEY] as string,
        [PRICE_KEY]: item[PRICE_KEY] as number,
        [INDEX_KEY]: item[INDEX_KEY] as number,
        [DEPT_KEY]: item[DEPT_KEY] as number,
        [SUBDEPT_KEY]: item[SUBDEPT_KEY] as number,
        [GROUP_KEY]: item[GROUP_KEY] as number,
        [IS_VISIBLE_KEY]: item[IS_VISIBLE_KEY] as number,
      })),
      INDEX_KEY
    ) as TLinkedItem[];

    const updateGroupsArr = (arr: TItemsArr, items: TLinkedItem[]): TLinkedGroup[] => arr.map((item: TItemData) => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      [SUBDEPT_KEY]: item[SUBDEPT_KEY] as number,
      pricelist: items.filter(data => data[GROUP_KEY] === item[ID_KEY])
    }));

    const params = {
      [IS_COMPLEX_DATA_KEY]: config ? Boolean(config[IS_COMPLEX_DATA_KEY]) : false,
      [IS_GROUP_IGNORED_KEY]: config ? Boolean(config[IS_GROUP_IGNORED_KEY]) : false,
      [IS_GROUP_USED_KEY]: config ? Boolean(config[IS_GROUP_USED_KEY]) : false
    };

    const groupedItems = updateItemsArr(
      getMatchedItems(
        payload[TYPES[GROUP_KEY]],
        pricelist[TYPES[ITEM_KEY]],
        GROUP_KEY
      )
    );

    const items = updateItemsArr(
      getMatchedItems(
        payload[TYPES[SUBDEPT_KEY]],
        payload[TYPES[ITEM_KEY]],
        SUBDEPT_KEY
      )
    );

    const groups: TLinkedGroup[] = params[IS_GROUP_USED_KEY]
      ? updateGroupsArr(
          pricelist[TYPES[GROUP_KEY]].filter(
            item => fetchArray(payload[TYPES[ITEM_KEY]], GROUP_KEY).map(data => data[GROUP_KEY]).includes(item[ID_KEY])
          ),
          items
        )
      : updateGroupsArr(payload[TYPES[GROUP_KEY]], groupedItems)

    const subdepts: TLinkedSubdept[] = payload[TYPES[SUBDEPT_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      groups: groups.filter(data => data[SUBDEPT_KEY] === item[ID_KEY]),
      pricelist: params[IS_GROUP_USED_KEY]
        ? items.filter(data => data[SUBDEPT_KEY] === item[ID_KEY] && data[GROUP_KEY] === 0)
        : items.filter(
            data => params[IS_GROUP_IGNORED_KEY] ? data[SUBDEPT_KEY] === item[ID_KEY] : data[SUBDEPT_KEY] === item[ID_KEY] && data[GROUP_KEY] === 0
          )
    }));

    const depts: TLinkedDept[] = payload[TYPES[DEPT_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      subdepts: subdepts.filter(data => data[DEPT_KEY] === item[ID_KEY])
    }));

    setResLinkedItems(depts);
    setLinkedListExist([...groupedItems, ...items].length > 0);
    updateLinkedItems({
      arr: depts.reduce((acc: TLinkedSubdept[], item) => [...acc, ...item[TYPES[SUBDEPT_KEY] as TLinkedDeptKeys] as TLinkedSubdept[]], []),
      config
    })
  };

  /**
   * Формирует массив привязанных к ресурсу позиций в зависимости от конфигурации групп
   * @property {object[]} items - массив выбранных для ресурса позиций
   * @property {object[]} groups - массив выбранных для ресурса групп
   * @property {object} config - параметры конфигурации групп
   * @returns {object} - массив привязанных к ресурсу позиций
   */
  const setGroupedLinkedItems = ({ items, groups, config }: TGroupedItemsData): TItemsArr => {
    const groupedLinkedItems = items.filter((item) => item[GROUP_KEY] !== 0);
    const ungroupedLinkedItems = items.filter((item) => item[GROUP_KEY] === 0);
    const linkedItemsList = config[IS_GROUP_IGNORED_KEY] ? items : ungroupedLinkedItems;
    const complexLinkedItems = groups.length > 0 ? items : linkedItemsList

    return config[IS_COMPLEX_DATA_KEY] ? complexLinkedItems : groupedLinkedItems;
  };

  /**
   * Удаляет массив элементов, выбранных пользователем,
   * удаляет обработанные для сохранения изменений данные
   */
  const resetLinkedItems = () => {
    setResLinkedItems([]);
    setResLinkedData(null);
  };

  useEffect(() => {
    setLinkedListCurrent(Boolean(response));
  }, [
    response
  ]);

  return {
    resLinkedItems,
    resLinkedData,
    isLinkedListExist,
    isLinkedListCurrent,
    renderLinkedItems,
    resetLinkedItems,
    setGroupedLinkedItems,
    handleLinkedDepts
  }
}

export default useResLinkedItems;
