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
  handleClick: TCategorySelectorHandler;
  isTogglerActive: (arr: TItemsArr, data: TItemData) => boolean;
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
  handleClick,
  isTogglerActive,
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
    <>
      {caption}
      {arr.length > 0
        ?
          <Box sx={{ gap: 1, display: 'flex',flexWrap: 'wrap', ...(styles && {...styles}) }}>
            {arr.map(
              (data) => <Chip
                key={data[ID_KEY].toString()}
                label={data[NAME_KEY]}
                onClick={() => handleClick({ arr: linkedList, key: category, data })}
                {...(variant && {variant})}
                {...( isTogglerActive({ arr: linkedList, [ID_KEY]: data[ID_KEY] }) && { color: 'primary', icon: <Done />, ...(sx && {sx}) } )}
              />
            )}
          </Box>
        : (warningMess ? <Typography variant="body2" color="textSecondary" component="div" {...(warningStyles && {...warningStyles})}>{warningMess}</Typography> : '')
      }
    </>
  )
};

export default ResItemTogglersList;
