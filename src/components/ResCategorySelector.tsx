import { FC } from 'react';
import {
  Autocomplete,
  ListItem,
  TextField,
} from '@mui/material';

import useResLinks from '../hooks/useResLinks';

import type { TItemsArr } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  SUBDEPT_KEY,
  CATEGORY_KEY,
  TITLES,
  CLEAR_TITLE,
  REMOVE_TITLE,
  NO_ITEMS_TITLE
} from '../utils/constants';

interface IResCategorySelector {
  category: string;
  sx: Record<string, string | number>;
}

const ResCategorySelector: FC<IResCategorySelector> = ({
  category,
  sx
}) => {
  const {
    linkedDepts,
    existableDepts,
    linkedSubdepts,
    existableSubdepts,
    resLinkHandlers
  } = useResLinks();

  const { linkedList, existableList } = {
    linkedList: category === SUBDEPT_KEY ? linkedSubdepts : linkedDepts,
    existableList: category === SUBDEPT_KEY ? existableSubdepts : existableDepts
  }

  const handleOptionData = <T, >(data: T, key: string, isNumber = false): number | string => isNumber ? data[key] as number : data[key] as string;

  // (existableList.length + linkedList.length) > 0 &&

  return <Autocomplete
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
    onChange={(_, value, reason ) => resLinkHandlers[category]({
      action: reason,
      items: reason === 'clear' ? [] : value as TItemsArr
    })}
    {...( category === SUBDEPT_KEY && { groupBy: (option) => handleOptionData(option, CATEGORY_KEY) } )}
  />;
};

export default ResCategorySelector;
