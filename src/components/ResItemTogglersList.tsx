import { FC, ReactNode } from 'react';
import {
  Box,
  BoxProps,
  Chip,
  ChipOwnProps,
  Typography,
  TypographyOwnProps
} from '@mui/material';
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
  handler: TCategorySelectorHandler;
  paramsHandler: (arr: TItemsArr, data: TItemData) => boolean;
  arr: TItemsArr;
  linkedList: TItemsArr;
  category: string;
  styles?: BoxProps['sx'];
  sx?: ChipOwnProps['sx'];
  warningStyles?: TypographyOwnProps['sx'];
  warningMess?: string;
  variant?: ChipOwnProps['variant'];
  caption?: ReactNode;
}

const ResItemTogglersList: FC<IResItemTogglersList> = ({
  handler,
  paramsHandler,
  arr,
  linkedList,
  category,
  styles,
  sx,
  warningStyles,
  warningMess,
  variant,
  caption
}) => {
  return (
    arr.length > 0
      ? <>
          {caption}
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
      </>
      : (warningMess ? <Typography variant="body2" color="textSecondary" component="div" {...(warningStyles && {...warningStyles})}>{warningMess}</Typography> : '')
  )
};

export default ResItemTogglersList;
