import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistKeys
} from '../types';

import { sortArrValues } from '../utils';
import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  RES_ID_KEY,
  TYPES,
  NO_GROUP_TITLE
} from '../utils/constants';

type TSelectedItem = {
  type: TPricelistKeys;
  [ID_KEY]: number;
}

interface ISelecter {
  deptsList: TItemsArr;
  subdeptsList: TItemsArr;
  groupsList: TItemsArr;
  selectedDept: TItemData;
  selectedSubdept: TItemData;
  selectedGroup: TItemData;
  selectOption: (data: TSelectedItem) => void;
}
// TODO: поправить назначение id группы для услуги, вложенной непосредственно в родительскую специализацию
const useSelecter = (): ISelecter => {
  const [deptsList, setDeptsList] = useState<TItemsArr>([]);
  const [subdeptsList, setSubdeptsList] = useState<TItemsArr>([]);
  const [groupsList, setGroupsList] = useState<TItemsArr>([]);

  const [selectedDept, setSelectedDept] = useState<TItemData>({});
  const [selectedSubdept, setSelectedSubdept] = useState<TItemData>({});
  const [selectedGroup, setSelectedGroup] = useState<TItemData>({});

  const [selectedData, setSelectedData] = useState<TCustomData<TItemData | null>>({});

  const dispatch = useDispatch();
  const {
    pricelist,
    form: { formData, formValues }
  } = useSelector(state => ({
    pricelist: state.pricelist,
    form: state.form,
  }));

  const setDefaultGroupData = (data: TItemData): TItemData => ({
    ...pricelist[TYPES[GROUP_KEY]][0],
    ...data,
    [ID_KEY]: 0,
    [GROUP_KEY]: 0,
    [RES_ID_KEY]: 10000,
    [NAME_KEY]: NO_GROUP_TITLE
  });

  const handleSelectedItem = (
    payload: TSelectedItem
  ): TItemData => pricelist[TYPES[payload.type]].find((item: TItemData) => item[ID_KEY] === payload[ID_KEY]) as TItemData;

  const handleItemsList = (
    arr: TItemsArr,
    key: string,
    id: number
  ): TItemsArr => sortArrValues([...arr.filter((item) => item[key] === id)], NAME_KEY);

  const handleFormData = (type: TPricelistKeys): TItemData | null => formData
    ? handleSelectedItem({ type, [ID_KEY]: formData.data[type] as number })
    : null;

  const handleDeptsList = () => {
    const arr = sortArrValues([...pricelist[TYPES[DEPT_KEY]]], NAME_KEY);

    setDeptsList(arr);
  }

  const handleSubeptsList = () => {
    const arr = handleItemsList(
      pricelist[TYPES[SUBDEPT_KEY]],
      DEPT_KEY,
      selectedDept && selectedDept[ID_KEY] as number
    );

    setSubdeptsList(arr);

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [DEPT_KEY]: selectedDept ? selectedDept[ID_KEY] as number : 0
        }
      })
    );
  }

  const handleGroupsList = () => {
    const arr = handleItemsList(
      pricelist[TYPES[GROUP_KEY]],
      SUBDEPT_KEY,
      selectedSubdept && selectedSubdept[ID_KEY] as number
    );

    setGroupsList(arr.length > 0 ? [...arr, setDefaultGroupData(arr[0])] : arr);

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [SUBDEPT_KEY]: selectedSubdept ? selectedSubdept[ID_KEY] as number : 0
        }
      })
    );
  }

  const selectOption = (data: TSelectedItem) => {
    const optionData = data.type === GROUP_KEY && data[ID_KEY] === 0
      ? setDefaultGroupData({ [DEPT_KEY]: selectedDept[ID_KEY], [SUBDEPT_KEY]: selectedSubdept[ID_KEY] })
      : handleSelectedItem(data);

    setSelectedData({});

    switch(data.type) {
      case `${SUBDEPT_KEY}`:
        setSelectedSubdept(optionData);
        break;

      case `${GROUP_KEY}`:
        setSelectedGroup(optionData);
        break;

      default:
        setSelectedDept(optionData);
        break;
    }
  }

  useEffect(() => {
    setSelectedData({
      [DEPT_KEY]: handleFormData(DEPT_KEY),
      [SUBDEPT_KEY]: handleFormData(SUBDEPT_KEY),
      [GROUP_KEY]: handleFormData(GROUP_KEY),
    });
  }, [
    formData
  ]);

  useEffect(() => {
    handleDeptsList();
  }, [
    pricelist
  ]);

  useEffect(() => {
    setSelectedDept(
      selectedData[DEPT_KEY] || deptsList[0]
    );
  }, [
    deptsList,
    formData
  ]);

  /**/
  useEffect(() => {
    handleSubeptsList();
  }, [
    selectedDept
  ]);

  useEffect(() => {
    setSelectedSubdept(
      selectedData[SUBDEPT_KEY] || subdeptsList[0]
    );
  }, [
    subdeptsList,
    formData
  ]);

  /**/
  useEffect(() => {
    handleGroupsList();
  }, [
    selectedSubdept
  ]);

  useEffect(() => {
    setSelectedGroup(
      selectedData[GROUP_KEY] || groupsList[0]
    );
  }, [
    groupsList
  ]);

  useEffect(() => {
    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [GROUP_KEY]: selectedGroup ? selectedGroup[ID_KEY] as number : 0
        }
      })
    );
  }, [
    selectedGroup
  ]);


  return {
    deptsList,
    subdeptsList,
    groupsList,
    selectedDept,
    selectedSubdept,
    selectedGroup,
    selectOption
  };
}

export default useSelecter;
