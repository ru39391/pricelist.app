import { FC } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  ListItem,
  TextField,
} from '@mui/material';

import useModal from '../hooks/useModal';

import type {
  TCategorySelectorHandler,
  TItemData,
  TItemsArr
} from '../types';

import {
  ID_KEY,
  NAME_KEY,
  CATEGORY_KEY,
  REMOVE_ACTION_KEY,
  TITLES,
  CLEAR_TITLE,
  REMOVE_TITLE,
  NO_ITEMS_TITLE,
  CONFIRM_MSG,
  REMOVE_CONFIRM_MSG,
  PARSER_CONFIRM_MSG
} from '../utils/constants';

interface IResItemCategoryList {
  category: string;
  sx: Record<string, string | number>;
  linkedList: TItemsArr;
  existableList: TItemsArr;
  handler: TCategorySelectorHandler;
}

const ResItemCategoryList: FC<IResItemCategoryList> = ({
  category,
  sx,
  linkedList,
  existableList,
  handler
}) => {
  const { toggleModal } = useModal();

  const handleOptionData = <T, >(
    data: T, key: string, isNumber = false
  ): number | string => isNumber ? data[key] as number : data[key] as string;

  const groupByOption = (option: TItemData): string => {
    const category = handleOptionData(option, CATEGORY_KEY);

    return category ? category.toString() : '';
  };

  const confirmCategoryAction = (value: TItemsArr, reason: AutocompleteChangeReason) => {
    const handlerConfig = { action: reason, key: category, arr: value };

    if(reason === 'clear' || reason === 'removeOption') {
      toggleModal({
        title: CONFIRM_MSG,
        formController: {
          icon: REMOVE_ACTION_KEY,
          color: 'error',
          introText: `${REMOVE_CONFIRM_MSG} ${reason === 'clear' ? `${CLEAR_TITLE.toLowerCase()} список элементов?` : `${REMOVE_TITLE.toLowerCase()} элемент из списка?`} ${PARSER_CONFIRM_MSG}`,
          actionBtnCaption: reason === 'clear' ? CLEAR_TITLE : REMOVE_TITLE,
          disabled: false,
          actionHandler: () => {
            handler(handlerConfig);
            toggleModal(null);
          }
        }
      });
    } else {
      handler(handlerConfig);
    }
  };

  return (
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
