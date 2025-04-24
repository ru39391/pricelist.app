import { FC } from 'react';
import { Box } from '@mui/material';

import CheckboxController from './CheckboxController';

import type {
  TItemsArr,
  TListHandlerOptions,
  TPricelistKeys,
  TResItemContext,
  TResLinkParams
} from '../types';

import {
  ITEM_KEY,
  GROUP_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  REMOVE_OPTION_KEY,
  CLEAR_OPTION_KEY,
  SELECT_OPTION_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  LINKED_RES_PARAMS,
  LINKED_GROUPS_PARAMS,
  LINKED_ITEMS_PARAMS
} from '../utils/constants';

type TListTogglerData = {
  arr: TItemsArr;
  key: TPricelistKeys;
  isControllerChecked: boolean;
  isGroupIgnored?: boolean;
}

interface IResItemControllers {
  linkedList: TItemsArr;
  existableList: TItemsArr;
  groupedLinkedItems: TItemsArr;
  ungroupedLinkedItems: TItemsArr;
  existableItems: TItemsArr;
  handleClick: TResItemContext['handleListOptions'];
  handleConfig: TResItemContext['handleLinkedListConfig'];
  isConfigParamExist: (key: TResLinkParams) => boolean;
}

interface ICurrItemsController {
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
  data: TListTogglerData;
  handleData: (data: TListTogglerData) => void;
}

const CurrItemsController: FC<ICurrItemsController> = ({
  label,
  isChecked,
  isDisabled,
  data,
  handleData
}) => {
  return (
    <CheckboxController
    id={''}
    label={label}
    isChecked={isChecked}
    isDisabled={isDisabled}
    handleChange={() => handleData(data)}
  />
  )
}

const ResItemControllers: FC<IResItemControllers> = ({
  linkedList,
  existableList,
  groupedLinkedItems,
  ungroupedLinkedItems,
  existableItems,
  handleClick,
  handleConfig,
  isConfigParamExist,
}) => {
  const isItemsControllerChecked = existableItems.length === ungroupedLinkedItems.length;
  const isGroupsControllerChecked = existableList.length === linkedList.length;
  const itemsControllerLabel = isItemsControllerChecked ? LINKED_ITEMS_PARAMS[REMOVE_ACTION_KEY] : LINKED_ITEMS_PARAMS[ADD_ACTION_KEY];
  const groupsControllerLabel = isGroupsControllerChecked ? LINKED_GROUPS_PARAMS[REMOVE_ACTION_KEY] : LINKED_GROUPS_PARAMS[ADD_ACTION_KEY];
  const isItemsControllerVisible = existableItems.length > 0;

  /**
   * Установить/отменить выбор всех групп ресурса
   */
  const toggleGroupsList = (data: TListTogglerData) => {
    const payload: TListHandlerOptions = { action: SELECT_OPTION_KEY, ...data };
    const options = data[IS_GROUP_IGNORED_KEY]
      ? { action: REMOVE_OPTION_KEY, arr: groupedLinkedItems }
      : { action: CLEAR_OPTION_KEY, arr: [] };


    handleClick({
      ...payload,
      ...( data.isControllerChecked && options )
    })
  };

  const itemsControllerProps: ICurrItemsController = {
    label: itemsControllerLabel,
    isChecked: isItemsControllerChecked,
    isDisabled: !isConfigParamExist(IS_COMPLEX_DATA_KEY),
    data: {
      arr: existableItems,
      key: ITEM_KEY,
      isControllerChecked: isItemsControllerChecked,
      [IS_GROUP_IGNORED_KEY]: isConfigParamExist(IS_GROUP_IGNORED_KEY)
    },
    handleData: toggleGroupsList
  };

  return (
    <Box sx={{ mb: .5, gap: 1, display: 'flex', flexWrap: 'wrap', }}>
      {existableList.length > 0
        ? <>
            <CurrItemsController {...itemsControllerProps} />
            <CurrItemsController
              label={groupsControllerLabel}
              isChecked={isGroupsControllerChecked}
              isDisabled={isConfigParamExist(IS_GROUP_IGNORED_KEY)}
              data={{
                arr: existableList,
                key: GROUP_KEY,
                isControllerChecked: isGroupsControllerChecked
              }}
              handleData={toggleGroupsList}
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
          </>
        : isItemsControllerVisible && <CurrItemsController {...itemsControllerProps} />
      }
    </Box>
  )
};

export default ResItemControllers;
