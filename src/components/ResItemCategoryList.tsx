import { FC } from 'react';
import {
  Autocomplete,
  ListItem,
  TextField,
} from '@mui/material';

import type {
  TCategorySelectorHandler,
  TItemData,
  TItemsArr
} from '../types';

import {
  ID_KEY,
  NAME_KEY,
  CATEGORY_KEY,
  TITLES,
  CLEAR_TITLE,
  REMOVE_TITLE,
  NO_ITEMS_TITLE
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
  const handleOptionData = <T, >(data: T, key: string, isNumber = false): number | string => isNumber ? data[key] as number : data[key] as string;

  const groupByOption = (option: TItemData): string => {
    const category = handleOptionData(option, CATEGORY_KEY);

    return category ? category.toString() : '';
  }

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
      onChange={(_, value, reason ) => {
        // TODO: вызвать модальное окно с подтверждением действия
        if(reason === 'clear' || reason === 'removeOption') {
          console.log('Вызвать модальное окно с подтверждением действия');
        }
        handler[category]({
          action: reason,
          items: reason === 'clear' ? [] : value as TItemsArr
        })
      }}
    />
  )
};

export default ResItemCategoryList;
