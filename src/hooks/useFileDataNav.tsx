import { useState } from 'react';

import type {
  TCustomData,
  TFileDataNav,
  THandledItemKeys,
  TPricelistData
} from '../types';

import { HANDLED_ITEMS_CAPTIONS } from '../utils/constants';

interface IFileDataNav {
  fileDataNav: TFileDataNav;
  updateFileDataNav: (data: TCustomData<TPricelistData> | null) => void;
}

const useFileDataNav = (): IFileDataNav => {
  const [fileDataNav, setFileDataNav] = useState<TFileDataNav>([]);

  const updateFileDataNav = (data: TCustomData<TPricelistData> | null): void => {
    const [keys, items] = data ? [Object.keys(data) as THandledItemKeys[], Object.values(data)] : [[], []];

    setFileDataNav(
      keys.reduce(
        (acc: TFileDataNav, key: THandledItemKeys, index) => [
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
        ], []
      )
    );

  }

  return {
    fileDataNav,
    updateFileDataNav
  }
}

export default useFileDataNav;
