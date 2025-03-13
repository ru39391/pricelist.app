import { FC } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  ListItem,
  TextField,
} from '@mui/material';

import useModal from '../hooks/useModal';

import type {
  TItemData,
  TItemsArr,
  TListHandlerOptions,
  TResItemContext,
  TPricelistKeys
} from '../types';

import {
  ID_KEY,
  NAME_KEY,
  CATEGORY_KEY,
  REMOVE_ACTION_KEY,
  CLEAR_OPTION_KEY,
  REMOVE_OPTION_KEY,
  TITLES,
  CLEAR_TITLE,
  REMOVE_TITLE,
  NO_ITEMS_TITLE,
  CONFIRM_MSG,
  REMOVE_CONFIRM_MSG,
  PARSER_CONFIRM_MSG
} from '../utils/constants';

interface IResItemCategoryList {
  category: TPricelistKeys;
  sx: Record<string, string | number>;
  linkedList: TItemsArr;
  existableList: TItemsArr;
  handleChange: TResItemContext['handleListOptions'];
}

const ResItemCategoryList: FC<IResItemCategoryList> = ({
  category,
  sx,
  linkedList,
  existableList,
  handleChange
}) => {
  const { toggleModal } = useModal();

  /**
   * Приведение типа параметра в объекте элемента прасйлиста
   * @returns {number | string} значение параметра
   * @property {string} key - ключ параметра в объекте
   * @property {boolean} isNumber - является ли значение числом
   */
  const handleOptionData = <T, >(
    data: T, key: string, isNumber = false
  ): number | string => isNumber ? data[key] as number : data[key] as string;

  /**
   * Группировка элементов выпадающего списка по категории
   * @returns {string} наименование категории
   * @property {TItemData} option - объект данных элемента прайслиста
   */
  const groupByOption = (option: TItemData): string => {
    const category = handleOptionData(option, CATEGORY_KEY);

    return category ? category.toString() : '';
  };

  /**
   * Отображение модального окна с предупреждением или выполнение действия
   * @property {TItemsArr} value - массив присвоенных ресурсу элементов прайслиста
   * @property {AutocompleteChangeReason} reason - тип действия
   */
  const confirmCategoryAction = (value: TItemsArr, reason: AutocompleteChangeReason) => {
    const handlerConfig: TListHandlerOptions = { action: reason, key: category, arr: value };

    if(reason === CLEAR_OPTION_KEY || reason === REMOVE_OPTION_KEY) {
      toggleModal({
        title: CONFIRM_MSG,
        formController: {
          icon: REMOVE_ACTION_KEY,
          color: 'error',
          introText: `${REMOVE_CONFIRM_MSG} ${reason === CLEAR_OPTION_KEY ? `${CLEAR_TITLE.toLowerCase()} список элементов?` : `${REMOVE_TITLE.toLowerCase()} элемент из списка?`} ${PARSER_CONFIRM_MSG}`,
          actionBtnCaption: reason === CLEAR_OPTION_KEY ? CLEAR_TITLE : REMOVE_TITLE,
          disabled: false,
          actionHandler: () => {
            handleChange(handlerConfig);
            toggleModal(null);
          }
        }
      });
    } else {
      handleChange(handlerConfig);
    }
  };

  return (
    // TODO: настроить disabled
    (existableList.length + linkedList.length) > 0 && <Autocomplete
      multiple
      filterSelectedOptions
      id={`${category}-selecter`}
      sx={sx}
      value={linkedList}
      options={existableList}
      clearText={CLEAR_TITLE}
      closeText={REMOVE_TITLE}
      noOptionsText={NO_ITEMS_TITLE}
      getOptionLabel={(option) => handleOptionData(option, NAME_KEY).toString()}
      renderInput={(props) => <TextField {...props} label={[TITLES[category]]} />}
      renderOption={(props, option) => <ListItem {...props}>{handleOptionData(option, NAME_KEY)}</ListItem>}
      getOptionKey={(option) => handleOptionData(option, ID_KEY, true)}
      groupBy={(option) => groupByOption(option)}
      onChange={(_, value, reason ) => confirmCategoryAction(value, reason)}
    />
  )
};

export default ResItemCategoryList;
