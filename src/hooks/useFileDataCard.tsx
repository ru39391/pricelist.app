import { useCallback, useMemo, useState } from 'react';

import { useSelector, useDispatch } from '../services/hooks';

import { handlePricelistData } from '../services/actions/pricelist';

import type {
  TActionKeys,
  TCategoryData,
  THandledItemKeys,
  TItemData,
  TItemsArr,
  TPricelistData
} from '../types';

import {
  ID_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  NOT_CREATED_KEY,
  NOT_UPDATED_KEY,
  TYPES
} from '../utils/constants';

interface IFileDataCard {
  fileCardData: TCategoryData | null;
  fileCardDates: Record<typeof CREATEDON_KEY | typeof UPDATEDON_KEY, string>;
  handleFileCardData: () => void;
}

const useFileDataCard = (): IFileDataCard => {
  const dispatch = useDispatch();
  const {
    form: { formDesc, formData },
    pricelist
  } = useSelector(({ form, pricelist }) => ({ form, pricelist }));

  const actionKeys: Record<TActionKeys, THandledItemKeys> = {
    [ADD_ACTION_KEY]: CREATED_KEY,
    [EDIT_ACTION_KEY]: UPDATED_KEY,
    [REMOVE_ACTION_KEY]: REMOVED_KEY
  };

  /**
   * Данные обновляемого элемента для отображения в модальном окне,
   * вызываемом по клику на строке таблицы, сформированной при парсинге xls-файла
   */
  const fileCardData: IFileDataCard['fileCardData'] = useMemo(() => {
    if(!formData) {
      return null;
    }

    const { action, type, data } = formData;
    const isDataExist = formData ? Boolean(data) : Boolean(formData);

    return !isDataExist || action !== EDIT_ACTION_KEY
      ? null
      : {
          data: {
            ...Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: pricelist[type]}), {} as TPricelistData),
            [type]: data ? [pricelist[type].find((item: TItemData) => item[ID_KEY] === data[ID_KEY])] as TItemsArr : [] as TItemsArr
          },
          category: type as string, // TODO: пересмотреть тип для category в пользу TPricelistTypes
          params: null
        };
  }, [
    formData,
    pricelist
  ]);

  /**
   * Объект, содержащий форматированные даты создания и обновления элемента прасйлиста
   */
  const fileCardDates: IFileDataCard['fileCardDates'] = useMemo(() => {
    const defaultValues = {
      [CREATEDON_KEY]: NOT_CREATED_KEY,
      [UPDATEDON_KEY]: NOT_UPDATED_KEY,
    };

    if(!formData) {
      return defaultValues;
    }

    const formatDate = (value: TItemData[keyof TItemData], mess: string): string => {
      if(!value) {
        return mess;
      }

      const [date, time] = value.toString().split(' ');
      const formatedDate: string = date.split('-').reverse().join('.');

      return `${formatedDate} ${time}`;
    };

    const { data, type } = formData;
    const item = pricelist[type].find(item => item[ID_KEY] === data[ID_KEY]);

    return Object.entries(defaultValues).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: item && item[key] ? formatDate(item[key], value) : value }),
      {} as IFileDataCard['fileCardDates']
    );
  }, [
    formData,
    pricelist
  ]);

  /**
   * Отправить данные для внесения изменений в записи прайслиста
   */
  const handleFileCardData = useCallback(() => {
    if(!formData) {
      return;
    }

    const { action, data, items, type } = formData;
    const arr: TItemsArr = items && action && items[actionKeys[action]] ? items[actionKeys[action]][type] : [];
    const payload = {
      type,
      items: Array.isArray(arr) && arr.length > 0
        ? arr
        : data ? [{...data}] : [] as TItemsArr
    };

    dispatch(handlePricelistData({
      ...payload,
      ...(action === REMOVE_ACTION_KEY && { items: payload.items.map(item => ({ [ID_KEY]: item[ID_KEY] })) }),
      action
    }));
  }, [
    dispatch,
    formData,
  ]);

  return {
    fileCardData,
    fileCardDates,
    handleFileCardData
  }
}

export default useFileDataCard;
