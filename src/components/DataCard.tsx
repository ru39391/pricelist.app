import { FC, useCallback, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';

import DataCardRow from './DataCardRow';
import ModalControllers from './ModalControllers';

import useForm from '../hooks/useForm';
import useTableData from '../hooks/useTableData';

import { useSelector, useDispatch } from '../services/hooks';
import { TFormData } from '../services/slices/form-slice';

import { handlePricelistData } from '../services/actions/pricelist';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  INDEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  ROW_INDEX_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  NOT_CREATED_KEY,
  NOT_UPDATED_KEY,
  SAVE_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE,
  CAPTIONS,
  CONFIRM_MSG,
  TYPES
} from '../utils/constants';

const DataCard: FC = () => {
  const dispatch = useDispatch();
  const {
    form: { formDesc, formData },
    pricelist
  } = useSelector(state => ({
    form: state.form,
    pricelist: state.pricelist
  }));

  const { formFields, selecterFields } = useForm();
  const { tableData, handleTableData } = useTableData();

  const complexKeys: string[] = [IS_VISIBLE_KEY, IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY];
  const complexData: TCustomData<string> = useMemo(() => ({
    [COMPLEX_KEY]: formData && formData.values ? formData.values[COMPLEX_KEY] as string : ''
  }), [
    formData
  ]);
  const formHandlerData = useMemo(() => ({
    type: formData ? formData.type : null,
    items: formData && formData.items
      ? formData.items
      : formData && formData.data ? [{...formData.data}] : []
  }), [
    formData
  ]);
  const dates: Record<typeof CREATEDON_KEY | typeof UPDATEDON_KEY, string> = useMemo(() => {
    const formatDate = (value: TItemData[keyof TItemData], mess: string): string => {
      if(!value) {
        return mess;
      }

      const [date, time] = value.toString().split(' ');
      const formatedDate: string = date.split('-').reverse().join('.');

      return `${formatedDate} ${time}`;
    };

    if(!formData) {
      return {
        [CREATEDON_KEY]: NOT_CREATED_KEY,
        [UPDATEDON_KEY]: NOT_UPDATED_KEY,
      };
    }

    const { data, type } = formData;
    const item = pricelist[type].find(item => item[ID_KEY] === data[ID_KEY]);

    return {
      [CREATEDON_KEY]: item && item[CREATEDON_KEY] ? formatDate(item[CREATEDON_KEY], NOT_CREATED_KEY) : NOT_CREATED_KEY,
      [UPDATEDON_KEY]: item && item[UPDATEDON_KEY] ? formatDate(item[UPDATEDON_KEY], NOT_UPDATED_KEY) : NOT_UPDATED_KEY,
    };
  }, [
    pricelist,
    formData
  ]);
  const isDetailsListVisible = useMemo(() => formData && formData.values && formData.action !== REMOVE_ACTION_KEY, [formData]);

  const handlersData = {
    [ADD_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        return;
      }

      dispatch(handlePricelistData({ ...formHandlerData, action: ADD_ACTION_KEY }));
    }, [
      dispatch,
      formData,
      formHandlerData
    ]),
    [EDIT_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        return;
      }

      dispatch(handlePricelistData({ ...formHandlerData, action: EDIT_ACTION_KEY }));
    }, [
      dispatch,
      formData,
      formHandlerData
    ]),
    [REMOVE_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        return;
      }

      dispatch(handlePricelistData({
        ...formHandlerData,
        items: formHandlerData.items.map(item => ({ [ID_KEY]: item[ID_KEY] })),
        action: REMOVE_ACTION_KEY
      }));
    }, [
      dispatch,
      formData,
      formHandlerData
    ]),
  };

  const handleCurrFormData = useCallback((formData: TFormData | null) => {
    if(!formData) {
      return;
    }

    const { action, type, data } = formData;
    const isDataExist = formData
      ? Boolean(data)
      : Boolean(formData);

    if(!isDataExist || action !== EDIT_ACTION_KEY) {
      return;
    }

    handleTableData(
      {
        data: {
          ...Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: pricelist[type]}), {}),
          [type]: data ? [pricelist[type].find((item: TItemData) => item[ID_KEY] === data[ID_KEY])] : []
        },
        category: type,
        params: null
      },
      null
    );
  }, [
    pricelist
  ]);

  useEffect(() => {
    handleCurrFormData(formData);
    //console.log('formData', formData);
    //console.log('formFields', formFields);
    //console.log('selecterFields', selecterFields);
  }, [
    formData
  ]);

  if(formData && isDetailsListVisible) {
    return (
      <>
        <Box sx={{ mb: 4 }}>
          {formFields[formData.type].map(
            (key) => <DataCardRow
              key={key}
              caption={key === INDEX_KEY ? CAPTIONS[ROW_INDEX_KEY] : CAPTIONS[key]}
              value={formData.data[key].toString()}
              currValue={tableData ? tableData.rows[0][key] : ''}
              isAlertVisible={Boolean(tableData && formData.data[key] !== tableData.rows[0][key])}
            />)
          }
          {selecterFields[formData.type].map(
            (key) => <DataCardRow
              key={key}
              caption={CAPTIONS[key]}
              value={formData.values && formData.values[key] ? `${formData.values[key]}, id: ${formData.data[key]}` : 'Не указано'}
              currValue={tableData && tableData.rows[0][key] || 'Не указано'}
              isAlertVisible={Boolean(tableData && formData.values && formData.values[key] !== tableData.rows[0][key])}
            />)
          }
          {formData.type === TYPES[ITEM_KEY] && complexKeys.map(
            (key) => <DataCardRow
              key={key}
              caption={CAPTIONS[key]}
              value={formData.values ? formData.values[key].toString() : ''}
              currValue={tableData ? tableData.rows[0][key] : ''}
              isAlertVisible={Boolean(tableData && formData.values && formData.values[key] !== tableData.rows[0][key])}
            />)
          }
          {formData.data && formData.data[IS_COMPLEX_KEY]
            ? <DataCardRow
                caption={CAPTIONS[COMPLEX_KEY]}
                complexValues={complexData[COMPLEX_KEY].split(', ')}
                currComplexValues={tableData ? tableData.rows[0][COMPLEX_KEY].split(', ') : undefined}
                isAlertVisible={!(tableData && complexData[COMPLEX_KEY] !== tableData.rows[0][COMPLEX_KEY] && tableData.rows[0][COMPLEX_KEY] && tableData.rows[0][COMPLEX_KEY].split(', ').length > 0)}
                currValue='список услуг не указан'
              />
            : ''
          }
          {formData.data
            ? [
                {caption: 'Дата создания:', value: dates[CREATEDON_KEY], isAlertVisible: false},
                {caption: 'Дата обновления:', value: dates[UPDATEDON_KEY], isAlertVisible: false}
              ].map((props, index) => <DataCardRow key={index} {...props} />)
            : ''
          }
        </Box>
        <ModalControllers
          color='success'
          disabled={false}
          actionBtnCaption={formData && formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_TITLE}
          actionHandler={handlersData[formData.action]}
        />
      </>
    );
  }

  return (
    formData
      ? <ModalControllers
          icon={formData && formData.action}
          color={formData && formData.action === REMOVE_ACTION_KEY ? 'error' : 'success'}
          actionBtnCaption={
            formData && formData.action === REMOVE_ACTION_KEY
              ? REMOVE_TITLE
              : formData && formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_TITLE
          }
          introText={
            formDesc ? CONFIRM_MSG : `Вы собираетесь ${REMOVE_TITLE.toLowerCase()} позиции прайс-листа. Общее количество удаляемых записей: ${formData && 1}. ${CONFIRM_MSG}`
          }
          disabled={false}
          actionHandler={handlersData[formData.action]}
        />
      : ''
  )
}

export default DataCard;
