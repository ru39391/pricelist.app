import { useState } from 'react';

import type {
  TComparedFileData,
  TFileDataNav,
  THandledItemKeys,
  TPriceListData
} from '../types';

import { HANDLED_ITEMS_CAPTIONS } from '../utils/constants';

interface IFileDataNav {
  fileDataNav: TFileDataNav;
  updateFileDataNav: (data: TComparedFileData | null) => void;
}

const useFileDataNav = (): IFileDataNav => {
  const [fileDataNav, setFileDataNav] = useState<TFileDataNav>([]);

  const updateFileDataNav = (data: TComparedFileData | null): void => {
    if(!data) {
      setFileDataNav([]);
    }

    const [keys, items] = [
      data ? Object.keys(data) : [],
      data ? Object.values(data) : []
    ] as [THandledItemKeys[], TPriceListData[]];

    setFileDataNav(
      keys.reduce(
        (acc, key, index) => [
          ...acc,
          {
            key,
            caption: HANDLED_ITEMS_CAPTIONS[key],
            counter: data
              ? Object.values(items[index]).reduce((acc, item) => acc + item.length, 0)
              : 0,
            data: data
              ? Object.keys(items[index]).map(
                (item, idx) => ({ key: item, counter: Object.values(items[index])[idx].length })
              )
              : []
          }
        ], [] as TFileDataNav
      )
    );

  }

  return {
    fileDataNav,
    updateFileDataNav
  }
}

export default useFileDataNav;
