import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getPricelistLoading,
  getPricelistSucceed,
  getPricelistFailed,
  createItems,
  updateItems,
  removeItems,
} from '../slices/pricelist-slice';
import {
  setFormVisible,
  setFormHidden,
  setFormData
} from '../slices/form-slice';

import type {
  TCustomData,
  TErrorResponse,
  TItemsArr,
  TItemData,
  TPricelistDataThunk,
  TResponseData,
  TResponseDefault,
  TResponseItems,
} from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';
import type { TPricelistAction } from '../slices/pricelist-slice';

import {
  RES_KEY,
  RESLINKS_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  FETCHING_ERROR_MSG,
  CREATE_ITEM_SUCCESS_MSG,
  CREATE_ITEM_WARNING_MSG,
  CREATE_ITEM_ERROR_MSG,
  UPDATE_ITEM_SUCCESS_MSG,
  UPDATE_ITEM_WARNING_MSG,
  UPDATE_ITEM_ERROR_MSG,
  REMOVE_ITEM_SUCCESS_MSG,
  REMOVE_ITEM_WARNING_MSG,
  REMOVE_ITEM_ERROR_MSG,
  ACTION_ERROR_MSG,
  DATA_ERROR_MSG,
  API_URL,
  TYPES
} from '../../utils/constants';
import { handleRespData, setRespMessage } from '../../utils';

type TActionData = {
  handler: (url: string, data: TCustomData<TItemData>) => Promise<{ data: TResponseDefault; }>;
  dispatcher: (data: TPricelistAction['payload']) => PayloadAction<TPricelistAction['payload'], string>;
  modalTitle?: string;
  successMsg: string;
  errorMsg: string;
};

type THandlerRespData = {
  success: boolean;
  succeedValue: number;
  inValidValue: number;
  failedValue: number;
  itemsArr: TItemsArr;
  inValidItemsArr: TItemsArr;
  failedItemsArr: TItemsArr;
  message: string[];
};

const fetchPricelistData = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getPricelistLoading());

  const keys = [...Object.values(TYPES), RES_KEY, RESLINKS_KEY];

  try {
    const response = await Promise.all(keys.map(type => axios.get(`${API_URL}${type}`)));

    const { success, data }: TResponseData = response
      .map(({ data }) => data)
      .reduce((acc: TResponseData, item: TResponseDefault, index ) => ({
        ...acc,
        success: [...acc.success, item.success],
        data: {
          ...acc.data,
          [keys[index]]: item.data && Object.values(item.data).filter((value) => typeof value !== 'boolean')
        }
      }), {
        success: [],
        data: {}
      });

    if(success.every(item => item)) {
      dispatch(getPricelistSucceed({ ...data }));
    } else {
      dispatch(getPricelistFailed({ alertMsg: FETCHING_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getPricelistFailed({ alertMsg: FETCHING_ERROR_MSG }));
  }
};

const handlePricelistData = ({ action, type, items }: TPricelistDataThunk): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  if(!action) {
    dispatch(getPricelistFailed({ alertMsg: ACTION_ERROR_MSG }));
    return;
  }

  if(!type) {
    dispatch(getPricelistFailed({ alertMsg: 'Не удалось определить тип переданного элемента' }));
    return;
  }

  if(!items) {
    dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
    return;
  }

  dispatch(getPricelistLoading());

  const actionData: Record<string, TActionData> = {
    [ADD_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => {
        const response = await axios.post(url, data);

        return { data: response.data as TResponseDefault };
      },
      dispatcher: (data: TPricelistAction['payload']) => createItems(data),
      modalTitle: CREATE_ITEM_WARNING_MSG,
      successMsg: CREATE_ITEM_SUCCESS_MSG,
      errorMsg: CREATE_ITEM_ERROR_MSG,
    },
    [EDIT_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => {
        const response = await axios.patch(url, data);

        return { data: response.data as TResponseDefault };
      },
      dispatcher: (data: TPricelistAction['payload']) => updateItems(data),
      modalTitle: UPDATE_ITEM_WARNING_MSG,
      successMsg: UPDATE_ITEM_SUCCESS_MSG,
      errorMsg: UPDATE_ITEM_ERROR_MSG,
    },
    [REMOVE_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => {
        const response = await axios.delete(url, data);

        return { data: response.data as TResponseDefault };
      },
      dispatcher: (data: TPricelistAction['payload']) => removeItems(data),
      modalTitle: REMOVE_ITEM_WARNING_MSG,
      successMsg: REMOVE_ITEM_SUCCESS_MSG,
      errorMsg: REMOVE_ITEM_ERROR_MSG,
    },
  };
  const {
    handler,
    dispatcher,
    modalTitle,
    successMsg,
    errorMsg
  } = actionData[action];


  const payload = items.reduce((acc: TItemsArr[], _, index, arr) => index % 250 === 0 ? [...acc, arr.slice(index, index + 250)] : acc, []);

  try {
    const response = await Promise.all(
      payload.map((arr) => {
        const data = arr.reduce((acc: TCustomData<TItemData>, item: TItemData, index: number) => ({...acc, [index]: item }), {});

        return handler(`${API_URL}${type}`, action === REMOVE_ACTION_KEY ? { data } : data);
      })
    );

    const {
      success,
      succeedValue,
      inValidValue,
      failedValue,
      itemsArr,
      inValidItemsArr,
      failedItemsArr,
      message
    } = response.reduce((acc: THandlerRespData, item) => {
      const { success, data, errors } = item.data;
      const {
        message,
        counter,
        succeed,
        failed,
        inValid
      } = success ? data as TResponseItems : errors as TResponseItems;
      const {
        succeed: succeedValue,
        failed: failedValue,
        inValid: inValidValue
      } = counter;
      const itemsArr = handleRespData(succeed);
      const failedItemsArr = handleRespData(failed);
      const inValidItemsArr = handleRespData(inValid);

      return {
        ...acc,
        success: acc.success || success,
        succeedValue: acc.succeedValue + succeedValue,
        inValidValue: acc.inValidValue + inValidValue,
        failedValue: acc.failedValue + failedValue,
        itemsArr: [...acc.itemsArr, ...itemsArr],
        inValidItemsArr: [...acc.inValidItemsArr, ...inValidItemsArr],
        failedItemsArr: [...acc.failedItemsArr, ...failedItemsArr],
        message: [...acc.message, message || '']
      };
    }, {
      success: false,
      succeedValue: 0,
      inValidValue: 0,
      failedValue: 0,
      itemsArr: [],
      inValidItemsArr: [],
      failedItemsArr: [],
      message: []
    });

    const handleFailedData = () => {
      dispatch(setFormData({}));

      dispatch(setFormVisible({
        title: message.find(item => Boolean(item)) || modalTitle,
        desc: setRespMessage({failedValue, inValidValue, failedItemsArr, inValidItemsArr})
      }));
    }

    if(success) {
      dispatch(dispatcher({
        type,
        items: itemsArr,
        alertMsg: `${successMsg}, обработано элементов: ${succeedValue}`
      }));
      failedValue || inValidValue
        ? handleFailedData()
        : dispatch(setFormHidden());
    } else {
      dispatch(getPricelistFailed({ alertMsg: message.find(item => Boolean(item)) || errorMsg }));
    }
  } catch(error) {
    const { response } = error as TErrorResponse;
    const { errors } = response ? response.data : { errors: { message: errorMsg } };

    dispatch(getPricelistFailed({ alertMsg: errors ? errors.message as string : errorMsg }));
  }
};

const handleResLinkedData = (payload: { action: string; data: TItemData; }): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  if(!payload) {
    dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
    return;
  }

  if(payload && !payload.action) {
    dispatch(getPricelistFailed({ alertMsg: ACTION_ERROR_MSG }));
    return;
  }

  if(payload && !payload.data) {
    dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
    return;
  }

  dispatch(getPricelistLoading());

  const actionData: Record<string, TActionData> = {
    [ADD_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.post(url, data),
      dispatcher: (data: TPricelistAction['payload']) => createItems(data),
      successMsg: CREATE_ITEM_SUCCESS_MSG,
      errorMsg: CREATE_ITEM_ERROR_MSG
    },
    [EDIT_ACTION_KEY]: {
      handler: async (url: string, data: TCustomData<TItemData>) => await axios.patch(url, data),
      dispatcher: (data: TPricelistAction['payload']) => updateItems(data),
      successMsg: UPDATE_ITEM_SUCCESS_MSG,
      errorMsg: UPDATE_ITEM_ERROR_MSG
    }
  };
  const {
    handler,
    dispatcher,
    successMsg,
    errorMsg
  } = actionData[payload.action];

  try {
    const { data: { success, data } } = await handler(`${API_URL}${RESLINKS_KEY}`, { 0: payload.data });

    if(success && data) {
      dispatch(dispatcher({
        type: RESLINKS_KEY,
        items: data.succeed || [],
        alertMsg: successMsg
      }));
    } else {
      dispatch(getPricelistFailed({ alertMsg: errorMsg }));
    }
  } catch(error) {
    const { response } = error as TErrorResponse;
    const { errors } = response ? response.data : { errors: { message: errorMsg } };

    dispatch(getPricelistFailed({ alertMsg: errors ? errors.message as string : errorMsg }));
  }
};

export {
  fetchPricelistData,
  handlePricelistData,
  handleResLinkedData
}
