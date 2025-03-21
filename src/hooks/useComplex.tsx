import {
  useState,
  useEffect
} from 'react';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistTypes
} from '../types';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  COMPLEX_KEY,
  IS_COMPLEX_KEY,
  IS_COMPLEX_ITEM_KEY,
  QUANTITY_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ITEM_KEY,
  TYPES
} from '../utils/constants';
import { sortArrValues } from '../utils';

type TComplexData = {
  [COMPLEX_KEY]: string;
  [IS_COMPLEX_KEY]: number;
};

interface IComplex {
  complexItems: TItemsArr;
  currComplexItems: TItemsArr;
  currComplexSumm: number;
  setItemId: (type: TPricelistTypes) => TCustomData<number>;
  handleComplexItem: (data: TItemData) => void;
}

const useComplex = (): IComplex => {
  const [complexItems, setComplexItems] = useState<TItemsArr>([]);
  const [currComplexItems, setCurrComplexItems] = useState<TItemsArr>([]);
  const [currComplexSumm, setCurrComplexSumm] = useState<number>(0);

  const dispatch = useDispatch();
  const {
    formData,
    formValues,
    pricelist
  } = useSelector(state => ({
    formData: state.form.formData,
    formValues: state.form.formValues,
    pricelist: state.pricelist
  }));

  const setItemId = (type: TPricelistTypes): TCustomData<number> => ({ [ID_KEY]: Math.max(...pricelist[type].map((item: TItemData) => Number(item[ID_KEY]))) + 1 });

  const fetchComplexItems = () => {
    const complexItemsArr: TItemsArr = pricelist[TYPES[ITEM_KEY]].filter((item: TItemData) => item[IS_COMPLEX_ITEM_KEY] === 1);

    setComplexItems(sortArrValues(complexItemsArr, NAME_KEY));
  }

  const handleComplexItemsPrice = (arr: TItemsArr = []): number => {
    const summ = arr
      .reduce(
        (acc, item) => {
          const data = {
            [PRICE_KEY]: item[PRICE_KEY] as number,
            [QUANTITY_KEY]: item[QUANTITY_KEY] as number
          };

          return acc + data[QUANTITY_KEY] * data[PRICE_KEY]
        }, 0
      );

    setCurrComplexSumm(summ);

    return summ;
  }

  const updateComplex = (arr: TItemsArr = []) => {
    const complexData: TCustomData<number>[] = arr
      .reduce(
        (acc: TCustomData<number>[], item: TItemData) => {
          const data = {
            [ID_KEY]: item[ID_KEY] as number,
            [QUANTITY_KEY]: item[QUANTITY_KEY] as number
          };

          return [...acc, {[data[ID_KEY].toString()]: data[QUANTITY_KEY]}];
        }, []
      );

    const summ = handleComplexItemsPrice(arr);
    setCurrComplexItems(sortArrValues(arr, NAME_KEY));

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          ...(formValues[IS_COMPLEX_KEY] && { [PRICE_KEY]: summ }),
          [COMPLEX_KEY]: formValues[IS_COMPLEX_KEY] ? JSON.stringify(complexData) : '[]'
        }
      })
    );
  }

  const handleComplexData = (payload: TComplexData) => {
    if(!payload[IS_COMPLEX_KEY]) {
      return;
    }

    const complexDataArr: TCustomData<number>[] = JSON.parse(payload[COMPLEX_KEY])
      .map((data: TCustomData<number>) => ({
        [ID_KEY]: Number(Object.keys(data)[0]),
        [QUANTITY_KEY]: Object.values(data)[0]
      }));
    const currComplexItemsArr: TItemsArr = complexDataArr.reduce(
      (acc: TItemsArr, data: TCustomData<number>, index, arr) => {
        const itemData: TItemData | undefined = pricelist[TYPES[ITEM_KEY]].find((item: TItemData) => item[ID_KEY] === data[ID_KEY]);

        return itemData
          ? [
            ...acc,
            {
              ...itemData,
              [QUANTITY_KEY]: arr[index][QUANTITY_KEY]
            }
          ]
          : acc
      }, []
    );

    handleComplexItemsPrice(currComplexItemsArr);
    setCurrComplexItems(sortArrValues(currComplexItemsArr, NAME_KEY));
  }

  const removeComplexItem = (data: TCustomData<number>) => {
    const complexItemsArr = [...currComplexItems].filter(item => item[ID_KEY] !== data[ID_KEY]);

    updateComplex(complexItemsArr);
  }

  const editComplexItem = (data: TCustomData<number>) => {
    const complexItemsArr = [...currComplexItems].filter(item => item[ID_KEY] !== data[ID_KEY]);
    const complexItemData: TItemData | undefined = [...complexItems].find((item: TItemData) => item[ID_KEY] === data.value);

    updateComplex(complexItemData ? [...complexItemsArr, {...complexItemData, [QUANTITY_KEY]: data[QUANTITY_KEY]}] : complexItemsArr);
  }

  const addComplexItem = (data: TCustomData<number>) => {
    const currComplexItemIds: number[] = [...currComplexItems].map(item => item[ID_KEY] as number);
    const complexItemsArr = [...complexItems].filter(item => !currComplexItemIds.includes(item[ID_KEY] as number));

    updateComplex([...currComplexItems, {...complexItemsArr[0], [QUANTITY_KEY]: data[QUANTITY_KEY]}]);
  }

  const handleComplexItem = (data: TItemData) => {
    // console.log(data);

    switch(data.action) {
      case `${REMOVE_ACTION_KEY}`:
        removeComplexItem({
          [ID_KEY]: data[ID_KEY] as number,
          [COMPLEX_KEY]: data[COMPLEX_KEY] as number
        });
        break;

      case `${EDIT_ACTION_KEY}`:
        editComplexItem({
          value: data.value as number,
          [ID_KEY]: data[ID_KEY] as number,
          [COMPLEX_KEY]: data[COMPLEX_KEY] as number,
          [QUANTITY_KEY]: data[QUANTITY_KEY] as number
        });
        break;

      default:
        addComplexItem({
          [COMPLEX_KEY]: data[COMPLEX_KEY] as number,
          [QUANTITY_KEY]: data[QUANTITY_KEY] as number
        });
        break;
    }
  }

  const resetCurrComplexItems = () => {
    if(!Object.values(formValues).length) {
      setCurrComplexSumm(0);
      setCurrComplexItems([]);
    }
  }

  useEffect(() => {
    fetchComplexItems();
  }, []);

  useEffect(() => {
    handleComplexData({
      [COMPLEX_KEY]: formData && formData.data[COMPLEX_KEY] ? formData.data[COMPLEX_KEY].toString() : '[]',
      [IS_COMPLEX_KEY]: formData && formData.data[IS_COMPLEX_KEY] ? Number(formData.data[IS_COMPLEX_KEY]) : 0
    });
  }, [
    formData
  ]);

  useEffect(() => {
    resetCurrComplexItems();
  }, [
    formValues
  ]);

  return {
    complexItems,
    currComplexItems,
    currComplexSumm,
    setItemId,
    handleComplexItem
  };
}

export default useComplex;
