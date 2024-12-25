import { useState, useEffect } from 'react';
import { useSelector } from '../services/hooks';

import useForm from './useForm';
import useUrlHandler from './useUrlHandler';

import type {
  TCustomData,
  TItemData,
  TPricelistTypes,
  TResourceData,
  TUrlData,
  TPricelistStateKeys,
  TItemsArr
} from '../types';

import {
  RES_KEY,
  RES_ID_KEY,
  ID_KEY,
  NAME_KEY,
  TYPES,
  TITLES,
  DEPT_KEY,
  SUBDEPT_KEY,
  ITEM_KEY,
  GROUP_KEY
} from '../utils/constants';
import { sortStrArray } from '../utils';

interface ICurrentData {
  pageTitle: string;
  currentCategory: TItemData | TResourceData;
  currentFormData: TCustomData<string | number | null | TItemData>;
  setCurrentFormValues: (type: string) => TItemData;
}

/**
 * Формирование данных текущей категории
 * @returns {object} данные категории
 * @property {string} pageTitle - заголовок категории для отображения на странице, например "Аллергология-иммунология"
 * @property {object} currentCategory - данные текущей категории для отображения в форме редактирования
 * @property {object} currentFormData - данные для передачи в форму создания элемента и отображения в шапке страницы
 * @property {function} setCurrentFormValues - возвращает перечень полей формы создания элемента
 */
const useCurrentData = (): ICurrentData => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<TItemData | TResourceData>({});
  const [currentFormData, setCurrentFormData] = useState<TCustomData<string | number | null | TItemData>>({});

  const pricelist = useSelector(state => state.pricelist);
  const { currUrlData } = useUrlHandler();
  const { formFields, selecterFields } = useForm();

  const isPricelistItemData = (item: TItemData | TResourceData): item is TItemData => typeof DEPT_KEY in item;

  const handleItemData = (): void => {
    const { type, id }: TUrlData = currUrlData;
    const key = type as TPricelistStateKeys;

    if(!pricelist[key]) {
      setCurrentCategory({} as TItemData);
      setPageTitle('');
      return;
    }

    const arr = type === RES_KEY ? pricelist[key] as TResourceData[] : pricelist[key] as TItemsArr;
    const isItemExist = id !== null && Boolean(key) && Boolean(arr.length);
    const itemData: TItemData = isItemExist
      ? [...arr as TItemsArr].find((item: TItemData) => item[ID_KEY] === id) || {}
      : {};
    const resData: TResourceData = isItemExist
      ? [...arr as TResourceData[]].find((item: TResourceData) => item[RES_ID_KEY] === id) || {} as TResourceData
      : {} as TResourceData;

    setCurrentCategory(type === RES_KEY ? resData : itemData);
    setPageTitle(
      isItemExist
        ? type === RES_KEY ? resData[NAME_KEY] : itemData[NAME_KEY] as string
        : ''
    );

    setCurrentFormData({
      ...currUrlData,
      caption: Object.values(TITLES)[Object.values(TYPES).indexOf(type as TPricelistTypes)]
    });
  };

  const setCurrentFormValues = (type: string): TItemData => {
    //console.log('currentCategory: ', currentCategory);

    if(!isPricelistItemData(currentCategory)) {
      return {} as TItemData;
    }

    return {
      ...formFields[type].reduce((acc, item) => ({ ...acc, [item]: '' }), {}),
      ...selecterFields[type].reduce(
        (acc, item) => {
          const groupsArr = item === GROUP_KEY && !currentCategory[item]
            ? sortStrArray(pricelist[TYPES[GROUP_KEY]].filter((item: TItemData) => item[SUBDEPT_KEY] === currentCategory[ID_KEY]), NAME_KEY)
            : [{ [ID_KEY] : 0 }];

          if(currentCategory[DEPT_KEY]) {
            return {
              ...acc,
              [item]: currentCategory[item],
              ...(item === SUBDEPT_KEY && !currentCategory[item] && { [SUBDEPT_KEY]: currentCategory[ID_KEY] }),
              ...(
                item === GROUP_KEY && currentCategory[item] === undefined
                  ? { [GROUP_KEY]: groupsArr.length ? groupsArr[0][ID_KEY] : 0 }
                  : { [GROUP_KEY]: type === TYPES[ITEM_KEY] ? currentCategory[ID_KEY] : currentCategory[item] || currentCategory[ID_KEY] }
              ),
            };
          } else {
            return {
              ...acc,
              [item]: currentCategory[item],
              ...(item === DEPT_KEY && !currentCategory[item] && { [DEPT_KEY]: currentCategory[ID_KEY] }),
              //...(item === SUBDEPT_KEY && !currentCategory[item] && { [SUBDEPT_KEY]: selectedSubdept[ID_KEY] })
            };
          }
        }, {}
      )
    }
  }

  useEffect(() => {
    handleItemData();
  }, [
    currUrlData,
    pricelist
  ]);

  return {
    pageTitle,
    currentCategory,
    currentFormData,
    setCurrentFormValues
  }
}

export default useCurrentData;
