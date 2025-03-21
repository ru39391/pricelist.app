import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { TUrlData, TPricelistTypes } from '../types';

interface IUrlHandler {
  currUrlData: TUrlData;
}

/**
 * Обработка текущего URL
 * @returns {object} данные текущей категории
 * @property {string} type - тип категории данных ('depts' | 'subdepts' | 'groups' | 'pricelist')
 * @property {number|null} id - item_id категории
 */
const useUrlHandler = (): IUrlHandler => {
  const [currUrlData, setCurrUrlData] = useState<TUrlData>({ type: '', id: null });

  const { pathname } = useLocation();

  const handleCurrUrl = (): void => {
    const urlArr = pathname.split('/');
    const type = urlArr[1] as TPricelistTypes;
    const id = urlArr[urlArr.length - 1] === type
      ? null
      : Number(urlArr[urlArr.length - 1]);

    setCurrUrlData({ type, id } as { type: TPricelistTypes; id: number; });
  };

  useEffect(() => {
    handleCurrUrl();
  }, [
    pathname
  ]);

  return {
    currUrlData
  }
}

export default useUrlHandler;
