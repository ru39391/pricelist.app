import { FC } from 'react';
import { Box } from '@mui/material';

import CheckboxController from './CheckboxController';

import type {
  TCategorySelectorHandler,
  TLinkedDataConfigHandler,
  TItemsArr
} from '../types';

import {
  GROUP_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  LINKED_RES_PARAMS,
} from '../utils/constants';

interface IResItemControllers {
  linkedList: TItemsArr;
  existableList: TItemsArr;
  itemsHandler: TCategorySelectorHandler;
  configHandler: TLinkedDataConfigHandler;
  paramsHandler: (param: string) => boolean;
}

const ResItemControllers: FC<IResItemControllers> = ({
  linkedList,
  existableList,
  itemsHandler,
  configHandler,
  paramsHandler,
}) => {
  return (
    existableList.length > 0 && <Box
    sx={{
      mb: .5,
      gap: 1,
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      <CheckboxController
        id={''}
        label={existableList.length === linkedList.length ? LINKED_RES_PARAMS[REMOVE_ACTION_KEY] : LINKED_RES_PARAMS[ADD_ACTION_KEY]}
        isChecked={existableList.length === linkedList.length}
        isDisabled={paramsHandler(IS_GROUP_IGNORED_KEY)}
        handler={() => itemsHandler[GROUP_KEY]({ items: existableList.length === linkedList.length ? [] : existableList })}
      />
      <CheckboxController
        id={IS_COMPLEX_DATA_KEY}
        label={LINKED_RES_PARAMS[IS_COMPLEX_DATA_KEY]}
        isChecked={paramsHandler(IS_COMPLEX_DATA_KEY) || paramsHandler(IS_GROUP_IGNORED_KEY)}
        isDisabled={paramsHandler(IS_GROUP_IGNORED_KEY)}
        handler={() => configHandler(!paramsHandler(IS_COMPLEX_DATA_KEY) ? 'SET_COMPLEX_DATA' : 'UNSET_COMPLEX_DATA')}
      />
      <CheckboxController
        id={IS_GROUP_IGNORED_KEY}
        label={LINKED_RES_PARAMS[IS_GROUP_IGNORED_KEY]}
        isChecked={paramsHandler(IS_GROUP_IGNORED_KEY)}
        isDisabled={linkedList.length !== 0}
        handler={() => configHandler(!paramsHandler(IS_GROUP_IGNORED_KEY) ? 'SET_GROUP_IGNORED' : 'UNSET_GROUP_IGNORED')}
      />
      {paramsHandler(IS_GROUP_IGNORED_KEY)
        && <CheckboxController
          id={IS_GROUP_USED_KEY}
          label={LINKED_RES_PARAMS[IS_GROUP_USED_KEY]}
          isChecked={paramsHandler(IS_GROUP_USED_KEY)}
          isDisabled={!paramsHandler(IS_GROUP_IGNORED_KEY)}
          handler={() => configHandler(!paramsHandler(IS_GROUP_USED_KEY) ? 'SET_GROUP_USED' : 'UNSET_GROUP_USED')}
        />
      }
    </Box>
  )
};

export default ResItemControllers;
