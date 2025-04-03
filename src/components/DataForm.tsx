import { FC, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import Selecter from './Selecter';
import ModalControllers from './ModalControllers';
import ComplexItemsList from './ComplexItemsList';

import useForm from '../hooks/useForm';
import useComplex from '../hooks/useComplex';
import useCategoryCounter from '../hooks/useCategoryCounter';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';
import { getPricelistFailed } from '../services/slices/pricelist-slice';

import { removeFileItems } from '../services/actions/file';
import { handlePricelistData } from '../services/actions/pricelist';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  IS_VISIBLE_KEY,
  IS_NAME_IMMUTABLE_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  COMPLEX_KEY,
  IS_COMPLEX_KEY,
  IS_COMPLEX_ITEM_KEY,
  SORT_CAPTION,
  CAPTIONS,
  REMOVE_TITLE,
  SAVE_TITLE,
  NOT_EMPTY_CATEGORY,
  CONFIRM_MSG,
  DATA_ERROR_MSG,
  TYPES
} from '../utils/constants';

type TVisibilityValues = Record<typeof IS_VISIBLE_KEY | typeof IS_NAME_IMMUTABLE_KEY, number>;

const DataForm: FC = () => {
  const dispatch = useDispatch();
  const { formData, formValues, isParserData } = useSelector(state => state.form);
  const { subCategoryCounter, setSubCategories } = useCategoryCounter();
  const { currComplexSumm, setItemId } = useComplex();
  const {
    isDisabled,
    formFields,
    selecterFields,
    requiredFormFields,
    textFieldValues,
    handleTextFields,
    setDataParams
  } = useForm();

  const complexKeys: string[] = [IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY];
  const handlersData = {
    [ADD_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
        return;
      }

      const { type, data } = formData;

      dispatch(handlePricelistData({
        action: ADD_ACTION_KEY,
        type,
        items: setDataParams({
          type,
          data: {...data, ...formValues, ...( !data[ID_KEY] && { ...setItemId(type) })}
        })
      }));
    }, [
      dispatch,
      formData,
      formValues,
      setItemId
    ]),
    [EDIT_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
        return;
      }

      const { type, data } = formData;

      dispatch(handlePricelistData({
        action: EDIT_ACTION_KEY,
        type,
        items: setDataParams({
          type,
          data: { [ID_KEY]: data[ID_KEY], ...formValues }
        })
      }));
    }, [
      dispatch,
      formData,
      formValues
    ]),
    [REMOVE_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
        return;
      }

      const { type, data } = formData;

      dispatch(handlePricelistData({
        action: REMOVE_ACTION_KEY,
        type,
        items: [{ [ID_KEY]: data[ID_KEY] }]
      }));
    }, [
      dispatch,
      formData
    ]),
  };

  const removeFileData = useCallback(() => {
    if(!formData) {
      dispatch(getPricelistFailed({ alertMsg: DATA_ERROR_MSG }));
      return;
    }

    const { type, data } = formData;

    dispatch(removeFileItems({
      type,
      items: [{ [ID_KEY]: data[ID_KEY] }]
    }));
  }, [
    dispatch,
    formData
  ]);

  const handlePriceValue = (data: { [PRICE_KEY]: number; [COMPLEX_KEY]: string }): number => {
    if(data[COMPLEX_KEY] === undefined) {
      return currComplexSumm;
    }

    const arr = data[COMPLEX_KEY] ? JSON.parse(data[COMPLEX_KEY]) : [];

    return arr.length === 0 ? data[PRICE_KEY] : data[PRICE_KEY] || currComplexSumm;
  }

  const handleInput = (input: EventTarget & (HTMLInputElement | HTMLTextAreaElement), key: string) => {
    input.value = key === NAME_KEY ? input.value : input.value.replace(/\D/g, '');

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: key === NAME_KEY ? input.value : Number(input.value)
        }
      })
    );

    if(key == PRICE_KEY) {
      handleTextFields({ [PRICE_KEY]: Number(input.value) });
    }
  };

  const changeVisibility = (data: TVisibilityValues) => {
    if(!formData || formData.action === REMOVE_ACTION_KEY || formData.type !== TYPES[ITEM_KEY]) {
      return;
    }

    const [key, value] = Object.entries(data)[0];

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: value
        }
      })
    )
  };

  const changeComplexData = ({key, value}: {key: string, value: number | string}) => {
    if(!formData || formData.action === REMOVE_ACTION_KEY || formData.type !== TYPES[ITEM_KEY]) {
      return;
    }

    const data = {
      [COMPLEX_KEY]: formData ? formData.data[COMPLEX_KEY] : '[]',
      [PRICE_KEY]: formData ? formData.data[PRICE_KEY] : 0
    };
    const isComplexItemsExist = data[COMPLEX_KEY] === undefined
      ? data[COMPLEX_KEY]
      : JSON.parse(data[COMPLEX_KEY] as string).length > 0;


    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: value,
          ...(key === IS_COMPLEX_ITEM_KEY && value === 1 && {
            [IS_COMPLEX_KEY]: 0,
            [COMPLEX_KEY]: '[]',
            [PRICE_KEY]: formData && formData.action === ADD_ACTION_KEY ? formValues[PRICE_KEY] : data[PRICE_KEY]
          }),
          ...(key === IS_COMPLEX_KEY && {
            ...( value === 1
                ? {
                  [IS_COMPLEX_ITEM_KEY]: 0,
                  [PRICE_KEY]: isComplexItemsExist ? data[PRICE_KEY] : 0,
                  ...(isComplexItemsExist && { [COMPLEX_KEY]: data[COMPLEX_KEY] })
                }
                : {
                  ...data,
                  [COMPLEX_KEY]: '[]',
                }
              )
          }),
        }
      })
    )
  };

  useEffect(() => {
    //console.log(formData);

    setSubCategories({
      type: formData ? formData.type : null,
      data: formData ? formData.data as TCustomData<number> : null
    });

    handleTextFields({ [PRICE_KEY]: formData ? formData.data[PRICE_KEY] as number : 0 });
  }, [
    formData
  ]);

  useEffect(() => {
    //console.log('formValues: ', formValues);

    handleTextFields({
      [PRICE_KEY]: formData && formValues[PRICE_KEY] === undefined
        ? formData.data[PRICE_KEY] as number
        : handlePriceValue({
          [PRICE_KEY]: formValues[PRICE_KEY] as number,
          [COMPLEX_KEY]: formValues[COMPLEX_KEY] as string
        })
    });

    [IS_VISIBLE_KEY, IS_NAME_IMMUTABLE_KEY].forEach((key) => {
      if(formData && formValues[key] === undefined) {
        changeVisibility(
          { [key]: formData.action === EDIT_ACTION_KEY ? formData.data[key] as number : 1 } as TVisibilityValues
        );
      }
    });

    [...complexKeys].forEach(key => {
      if(formData && formValues[key] === undefined) {
        changeComplexData({
          key,
          value: formData.action === EDIT_ACTION_KEY ? formData.data[key] : 0
        });
      }
    });
  }, [
    formValues
  ]);

  if(formData && formData.action === REMOVE_ACTION_KEY) {
    return <ModalControllers
      icon={REMOVE_ACTION_KEY}
      color='error'
      disabled={false}
      actionBtnCaption={REMOVE_TITLE}
      introText={subCategoryCounter ? `${NOT_EMPTY_CATEGORY}${subCategoryCounter}` : CONFIRM_MSG}
      isParserData={isParserData}
      handleClick={isParserData ? removeFileData : handlersData[formData.action]}
    />;
  }

  return (
    <>
      {formData && formFields[formData.type].map(
        (key, index) =>
          <TextField
            key={index.toString()}
            id={key}
            name={key}
            label={key === INDEX_KEY ? SORT_CAPTION : CAPTIONS[key]}
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
            required={requiredFormFields.includes(key)}
            disabled={key === PRICE_KEY && Boolean(formValues[IS_COMPLEX_KEY])}
            onChange={({ target }) => handleInput(target, key)}
            {...(
              key === PRICE_KEY
                ? { value: textFieldValues ? textFieldValues[key] : '0' }
                : { defaultValue: formData.data[key] ? formData.data[key].toString() : '' }
            )}
          />
        )
      }
      {formData && formData.action !== REMOVE_ACTION_KEY
        && <>
          <Box sx={{ mb: 4 }}>
            <Selecter keys={selecterFields[formData.type]} />
            {formData.type === TYPES[ITEM_KEY] && (
              <>
                <FormGroup>
                  {[IS_NAME_IMMUTABLE_KEY, IS_VISIBLE_KEY].map(
                    (key, index) => <FormControlLabel
                      key={index}
                      label={CAPTIONS[key]}
                      control={
                        <Checkbox
                          checked={Boolean(formValues[key])}
                          onChange={() => changeVisibility({ [key]: Number(!formValues[key]) } as TVisibilityValues)}
                        />
                      }
                    />
                  )}
                  {complexKeys.map(
                    (key) =>
                      <FormControlLabel
                        key={key}
                        label={CAPTIONS[key]}
                        control={
                          <Checkbox
                            checked={Boolean(formValues[key])}
                            onChange={() => changeComplexData({
                              key,
                              value: Number(!formValues[key])
                            })}
                          />
                        }
                      />
                    )
                  }
                </FormGroup>
                {formValues[IS_COMPLEX_KEY]
                  ? <ComplexItemsList itemId={formData.data[ID_KEY] as number} />
                  : ''
                }
              </>
            )}
          </Box>
          <ModalControllers
            disabled={isDisabled}
            actionBtnCaption={SAVE_TITLE}
            handleClick={handlersData[formData.action]}
          />
        </>
      }
    </>
  )
}

export default DataForm;
