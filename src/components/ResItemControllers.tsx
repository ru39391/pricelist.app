import { FC } from 'react';
import { Box } from '@mui/material';

import CheckboxController from './CheckboxController';

import type {
  TListHandlerOptions,
  TResItemContext,
  TResLinkParams,
  TItemsArr
} from '../types';

import {
  GROUP_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  CLEAR_OPTION_KEY,
  SELECT_OPTION_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  LINKED_RES_PARAMS,
} from '../utils/constants';

interface IResItemControllers {
  linkedList: TItemsArr;
  existableList: TItemsArr;
  handleClick: TResItemContext['handleListOptions'];
  handleConfig: TResItemContext['handleLinkedListConfig'];
  isConfigParamExist: (key: TResLinkParams) => boolean;
}

const ResItemControllers: FC<IResItemControllers> = ({
  linkedList,
  existableList,
  handleClick,
  handleConfig,
  isConfigParamExist,
}) => {
  const isGroupsControllerChecked = existableList.length === linkedList.length;
  const groupsControllerLabel = isGroupsControllerChecked ? LINKED_RES_PARAMS[REMOVE_ACTION_KEY] : LINKED_RES_PARAMS[ADD_ACTION_KEY];

  /**
   * Установить/отменить выбор всех групп ресурса
   */
  const toggleGroupsList = () => {
    const payload: TListHandlerOptions = { action: SELECT_OPTION_KEY, key: GROUP_KEY, arr: existableList };

    handleClick({
      ...payload,
      ...( isGroupsControllerChecked && { action: CLEAR_OPTION_KEY, arr: [] } )
    })
  };

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
        label={groupsControllerLabel}
        isChecked={isGroupsControllerChecked}
        isDisabled={isConfigParamExist(IS_GROUP_IGNORED_KEY)}
        handleChange={toggleGroupsList}
      />
      <CheckboxController
        id={IS_COMPLEX_DATA_KEY}
        label={LINKED_RES_PARAMS[IS_COMPLEX_DATA_KEY]}
        isChecked={isConfigParamExist(IS_COMPLEX_DATA_KEY) || isConfigParamExist(IS_GROUP_IGNORED_KEY)}
        isDisabled={isConfigParamExist(IS_GROUP_IGNORED_KEY)}
        handleChange={() => handleConfig(!isConfigParamExist(IS_COMPLEX_DATA_KEY) ? 'SET_COMPLEX_DATA' : 'UNSET_COMPLEX_DATA')}
      />
      <CheckboxController
        id={IS_GROUP_IGNORED_KEY}
        label={LINKED_RES_PARAMS[IS_GROUP_IGNORED_KEY]}
        isChecked={isConfigParamExist(IS_GROUP_IGNORED_KEY)}
        isDisabled={linkedList.length !== 0 || isConfigParamExist(IS_GROUP_USED_KEY)}
        handleChange={() => handleConfig(!isConfigParamExist(IS_GROUP_IGNORED_KEY) ? 'SET_GROUP_IGNORED' : 'UNSET_GROUP_IGNORED')}
      />
      {isConfigParamExist(IS_GROUP_IGNORED_KEY)
        && <CheckboxController
          id={IS_GROUP_USED_KEY}
          label={LINKED_RES_PARAMS[IS_GROUP_USED_KEY]}
          isChecked={isConfigParamExist(IS_GROUP_USED_KEY)}
          isDisabled={!isConfigParamExist(IS_GROUP_IGNORED_KEY)}
          handleChange={() => handleConfig(!isConfigParamExist(IS_GROUP_USED_KEY) ? 'SET_GROUP_USED' : 'UNSET_GROUP_USED')}
        />
      }
    </Box>
  )
};

export default ResItemControllers;
