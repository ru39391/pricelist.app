import { useMemo, useState } from 'react';

import { useSelector, useDispatch } from '../services/hooks';

import type {
  TCategoryData,
  TItemData,
  TItemsArr,
  TPricelistData
} from '../types';

import {
  ID_KEY,
  EDIT_ACTION_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  NOT_CREATED_KEY,
  NOT_UPDATED_KEY,
  TYPES
} from '../utils/constants';

interface IFileDataCard {
  fileCardData: TCategoryData | null;
  fileCardDates: Record<typeof CREATEDON_KEY | typeof UPDATEDON_KEY, string>;
}

const useFileDataCard = (): IFileDataCard => {
  const {
    form: { formDesc, formData },
    pricelist
  } = useSelector(({ form, pricelist }) => ({ form, pricelist }));

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

  return {
    fileCardData,
    fileCardDates
  }
}

export default useFileDataCard;
