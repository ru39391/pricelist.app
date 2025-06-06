import { FC, useEffect, useMemo } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

import DataCardRow from './DataCardRow';
import ModalControllers from './ModalControllers';

import useFileDataCard from '../hooks/useFileDataCard';
import useForm from '../hooks/useForm';
import useTableData from '../hooks/useTableData';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  INDEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  IS_NAME_IMMUTABLE_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  ROW_INDEX_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  SAVE_TITLE,
  EDIT_TITLE,
  EDIT_ITEM_TITLE,
  REMOVE_TITLE,
  CAPTIONS,
  CONFIRM_MSG,
  TYPES,
  EDIT_ACTION_KEY,
} from '../utils/constants';

/**
 * Блок данных позиции обработанного при парсинге xls-файла для отображения в модальном окне
 *
 */
const DataCard: FC = () => {
  const { formDesc, formData } = useSelector(({ form }) => form);

  const { fileCardData, fileCardDates, immutableNameData, handleFileCardData, handleFileData, setNameImmutable } = useFileDataCard();
  const { formFields, selecterFields } = useForm();
  const { tableData, handleTableData } = useTableData();

  const complexKeys: string[] = [IS_VISIBLE_KEY, IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY];

  /**
   * Перечень дочерних позиций для комплексной услуги
   */
  const complexData: TCustomData<string> = useMemo(
    () => ({[COMPLEX_KEY]: formData && formData.values ? formData.values[COMPLEX_KEY] as string : ''}),
    [formData]
  );

  /**
   * Истинно, если id текущего элемента совпадает с id элемента из списка услуг с неизменяемым названием
   */
  const isFetchBtnDisabled = useMemo(
    () => {
      if(!tableData) {
        return false;
      }

      const immutableNameItems = immutableNameData ? Object.keys(immutableNameData).map(item => Number(item)) : [] as number[];

      return immutableNameItems.includes(tableData.rows[0]?.[ID_KEY]);
    },
    [immutableNameData, tableData]
  );

  /**
   * Если глобальное хранилище содержит данные формы и тип действия не является удалением, в модальном окне отображаются данные обновляемого элемента
   */
  const isDetailsListVisible = useMemo(() => formData && formData.values && formData.action !== REMOVE_ACTION_KEY, [formData]);

  useEffect(() => {
    handleTableData(fileCardData, null);
  }, [
    fileCardData
  ]);

  if(formData && isDetailsListVisible) {
    return (
      <>
        {formData.action === EDIT_ACTION_KEY && <FormControlLabel
          label={CAPTIONS[IS_NAME_IMMUTABLE_KEY]}
          control={
            <Checkbox
              checked={Boolean(formData.data[IS_NAME_IMMUTABLE_KEY])}
              onChange={() => setNameImmutable()}
            />
          }
        />}
        <Box sx={{ mb: 4 }}>
          {formFields[formData.type].map(
            (key) => <DataCardRow
              key={key}
              caption={key === INDEX_KEY ? CAPTIONS[ROW_INDEX_KEY] : CAPTIONS[key]}
              value={formData.data[key].toString()}
              currValue={tableData ? tableData.rows[0][key] : ''}
              isAlertVisible={Boolean(tableData && formData.data[key] !== tableData.rows[0][key])}
              {...( tableData && key === NAME_KEY && { [IS_NAME_IMMUTABLE_KEY]: Boolean(formData.data[IS_NAME_IMMUTABLE_KEY]) } )}
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
                {caption: 'Дата создания:', value: fileCardDates[CREATEDON_KEY], isAlertVisible: false},
                {caption: 'Дата обновления:', value: fileCardDates[UPDATEDON_KEY], isAlertVisible: false}
              ].map((props, index) => <DataCardRow key={index} {...props} />)
            : ''
          }
        </Box>
        <ModalControllers
          color='success'
          disabled={isFetchBtnDisabled}
          actionBtnCaption={formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_TITLE}
          handleClick={handleFileCardData}
        />
      </>
    );
  }

  return (
    formData
      ? <ModalControllers
          icon={formData.action}
          color={formData.action === REMOVE_ACTION_KEY ? 'error' : 'success'}
          actionBtnCaption={
            formData.action === REMOVE_ACTION_KEY
              ? REMOVE_TITLE
              : formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_ITEM_TITLE
          }
          introText={
            formDesc ? CONFIRM_MSG : `Вы собираетесь ${REMOVE_TITLE.toLowerCase()} позиции прайс-листа. Общее количество удаляемых записей: 1. ${CONFIRM_MSG}`
          }
          disabled={false}
          handleClick={formData.action === REMOVE_ACTION_KEY ? () => handleFileCardData : handleFileData}
        />
      : ''
  )
}

export default DataCard;
