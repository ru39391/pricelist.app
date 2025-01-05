import { useEffect, useState } from 'react';
import { fetchArray, sortArrValues } from '../utils';
import { NAME_KEY, DEPT_KEY } from '../utils/constants';

import type { TItemsArr } from '../types';

interface ISubNav {
  categoryIds: number[];
  currCategory: number | null;
  categoryData: TItemsArr;
  setSubNav: (parentId: number) => void;
}

const useSubNav = (arr: TItemsArr): ISubNav => {
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [currCategory, setCurrCategory] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<TItemsArr>([]);

  const handleCategoryIds = (): void => {
    const fetchedArr: number[] = fetchArray(arr, DEPT_KEY).map(({ dept }) => dept as number);

    setCategoryIds(fetchedArr);
  };

  const setSubNav = (parentId: number): void => {
    setCurrCategory(parentId === currCategory ? null : parentId);

    setCategoryData(
      parentId === currCategory
        ? []
        : sortArrValues([...arr.filter(({ dept }) => dept === parentId)], NAME_KEY)
    );
  };

  useEffect(() => {
    handleCategoryIds();
    setSubNav(categoryIds[0]);
  }, [
    arr
  ]);

  return {
    categoryIds,
    currCategory,
    categoryData,
    setSubNav
  }
}

export default useSubNav;
