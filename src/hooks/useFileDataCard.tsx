import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { handlePricelistData } from '../services/actions/pricelist';

import type {
  TActionKeys,
  TCategoryData,
  TCustomData,
  THandledItemKeys,
  TItemData,
  TItemsArr,
  TPricelistData,
  TPricelistDataThunk,
  TPricelistTypes
} from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  IS_NAME_IMMUTABLE_KEY,
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

// TODO: пересмотреть используемые в хуках типы, опираясь на interface компонента
interface IFileDataCard {
  fileCardData: TCategoryData | null;
  fileCardDates: Record<typeof CREATEDON_KEY | typeof UPDATEDON_KEY, string>;
  handleFileCardData: () => void;
  handleFileData: () => void;
}

/**
 * Обработка данных, полученных после парсинга xls-документа, для отображения в модальном окне и отправки на сервер
 *
 * @returns {IFileDataCard} данные элемента обработанного файла;
 * @property {IFileDataCard['fileCardData']} fileCardData - данные обновляемого элемента для отображения в модальном окне;
 * @property {IFileDataCard['fileCardDates']} fileCardDates - даты сохранения и изменения обновляемого элемента для отображения в модальном окне;
 * @property {function} handleFileCardData - формирует данные карточки элемента обработанного файла и отправляет их на сервер;
 * @property {function} handleFileData - передаёт на сервер данные, полученные после обработки xls-документа, для внесения изменений во все записи прайслиста.
 */
const useFileDataCard = (): IFileDataCard => {
  const dispatch = useDispatch();
  const {
    formData,
    pricelist,
    immutableNameItems
  } = useSelector(({ form, pricelist }) => ({
    formData: form.formData,
    pricelist,
    immutableNameItems: pricelist[TYPES[ITEM_KEY]].filter(item => item[IS_NAME_IMMUTABLE_KEY])
  }));

  const actionKeys: Record<TActionKeys, THandledItemKeys> = {
    [ADD_ACTION_KEY]: CREATED_KEY,
    [EDIT_ACTION_KEY]: UPDATED_KEY,
    [REMOVE_ACTION_KEY]: REMOVED_KEY
  };

  /**
   * Данные услуг с неизменяемыми названиями
   */
  const immutableNameData = useMemo(
    () => immutableNameItems.length > 0
      ? immutableNameItems.reduce(
          (acc: TCustomData<string>, item) => ({ ...acc, [item[ID_KEY].toString()]: item[NAME_KEY].toString() }),
          {} as TCustomData<string>
        )
      : null,
    [immutableNameItems]
  );

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
   * Отправить данные карточки таблицы обработанного документа для внесения изменений в параметры элемента прайслиста
   */
  const handleFileCardData = useCallback(() => {
    if(!formData) {
      return;
    }

    const { action, data: itemData, items, type } = formData;
    const arr: TItemsArr = items && action && items[actionKeys[action]] ? items[actionKeys[action]][type] : [];
    const data = itemData && immutableNameData?.[itemData[ID_KEY]?.toString()]
      ? { ...itemData, [NAME_KEY]: immutableNameData[itemData[ID_KEY].toString()] }
      : itemData;
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

  /**
   * Отправить данные обработанного документа для внесения всех изменений в записи прайслиста
   * @returns {Promise<TPricelistDataThunk>}
   * @property {TPricelistDataThunk} data - данные для передачи на сервер
   */
  const dispatchFileData = (data: TPricelistDataThunk): Promise<TPricelistDataThunk> => {
    dispatch(handlePricelistData(data));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 200);
    });
  }

  const fetchFileData = async (arr: TPricelistDataThunk[]) => {
    try {
      const res = await Promise.all(arr.map(item => dispatchFileData(item)));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Обработать изменённые записи прайслиста для сохранения обновлений
   */
  const handleFileData = useCallback(() => {
    if(!formData) {
      return;
    }

    const { items } = formData;

    if(!items) {
      return;
    }

    let pricelistDataThunks: TPricelistDataThunk[] = [];
    const dataKeys = Object.entries(actionKeys).reverse().reduce(
      (acc, [key, value]) => ({ ...acc,  [value]: key }), {} as TCustomData<string>
    );

    for (const key in dataKeys) {
      const handledItemKey = key as THandledItemKeys;

      pricelistDataThunks = [...pricelistDataThunks, ...Object.entries(items[handledItemKey]).reduce(
        (acc, [type, arr]) => {
          const payload = {
            type: type as TPricelistTypes,
            items: dataKeys[key] === REMOVE_ACTION_KEY
              ? arr.map(data => ({ [ID_KEY]: data[ID_KEY] } as TItemData))
              : immutableNameData
                ? arr.map(data => ({
                  ...data,
                  ...(immutableNameData[data[ID_KEY].toString()] && { [NAME_KEY]: immutableNameData[data[ID_KEY].toString()] })
                })) as TItemsArr
                : arr as TItemsArr
          };

          return payload.items.length > 0 ? [...acc, { ...payload, action: dataKeys[key] }] : acc
        },
        [] as TPricelistDataThunk[]
      )];
    }

    fetchFileData(pricelistDataThunks);
  }, [
    dispatch,
    formData,
  ]);

  return {
    fileCardData,
    fileCardDates,
    handleFileCardData,
    handleFileData
  }
}

export default useFileDataCard;
