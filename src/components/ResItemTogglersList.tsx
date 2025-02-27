import { FC } from 'react';
import { Box, BoxOwnProps, Chip, ChipOwnProps } from '@mui/material';
import { Done } from '@mui/icons-material';

import type {
  TCategorySelectorHandler,
  TItemsArr,
  TItemData
} from '../types';

import {
  ID_KEY,
  NAME_KEY
} from '../utils/constants';

interface IResItemTogglersList {
  styles?: BoxOwnProps['sx'];
  sx?: ChipOwnProps['sx'];
  variant?: ChipOwnProps['variant'];
  arr: TItemsArr;
  linkedList: TItemsArr;
  category: string;
  handler: TCategorySelectorHandler;
  paramsHandler: (arr: TItemsArr, data: TItemData) => boolean;
}

const ResItemTogglersList: FC<IResItemTogglersList> = ({
  styles,
  sx,
  variant,
  arr,
  linkedList,
  category,
  handler,
  paramsHandler
}) => {
  return (
    <Box
      sx={{
        gap: 1,
        display: 'flex',
        flexWrap: 'wrap',
        ...(styles && {...styles})
      }}
    >
      {arr.map(
        (data) => <Chip
          key={data[ID_KEY].toString()}
          label={data[NAME_KEY]}
          onClick={() => handler[category]({ data })}
          {...(variant && {variant})}
          {...( paramsHandler(linkedList, data) && { color: 'primary', icon: <Done />, ...(sx && {...sx}) } )}
        />
      )}
    </Box>
  )
};

export default ResItemTogglersList;
