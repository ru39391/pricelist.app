import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import useSelecter from '../hooks/useSelecter';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TITLES
} from '../utils/constants';

interface ISelecter {
  category: string;
  categoryData: TCustomData<number>;
}

const Selecter: FC<ISelecter> = ({
  category,
  categoryData
}) => {
  const { categoryList } = useSelecter({
    ...Object.keys(categoryData).reduce(
      (acc, item) => ({
        ...acc,
        key: item,
        value: categoryData[item]
      }),
    {}),
    category
  });

  return (
    categoryList.length && <FormControl sx={{ my: 1 }} fullWidth>
      <InputLabel id={`${category}-select-label`}>{TITLES[category]} - {category}</InputLabel>
      <Select
        labelId={`${category}-select-label`}
        id={`${category}-select`}
        value={categoryList[0][ID_KEY]}
        label={TITLES[category]}
        onChange={({ target }) => console.log(target.value)}
      >
        {categoryList.map(
          (item: TCustomData<string | number | null>) =>
            <MenuItem
              key={item[ID_KEY] && item[ID_KEY].toString()}
              value={item[ID_KEY] as number}
            >
              {item[NAME_KEY]}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
};

export default Selecter;
