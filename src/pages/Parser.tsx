import {
  FC,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Grid } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import Layout from '../components/Layout';
import ParserNav from '../components/ParserNav';
import ParserSidebar from '../components/ParserSidebar';
import ParserTable from '../components/ParserTable';
import Pathway from '../components/Pathway';

import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';
import useFileUploader from '../hooks/useFileUploader';
import useDataComparer from '../hooks/useDataComparer';
import useFileDataNav from '../hooks/useFileDataNav';

import { useSelector } from '../services/hooks';

import type {
  TFileCategoryData,
  THandledItemKeys,
  TPricelistData
} from '../types';

import { fetchArray } from '../utils';
import {
  CREATED_KEY,
  UPDATED_KEY,
  HANDLED_ITEMS_CAPTIONS,
  DEFAULT_DOC_TITLE,
  NO_FILE_ITEMS_TITLE,
  FILE_ITEMS_TITLE,
  ID_KEY,
  NAME_KEY,
  TYPES,
  ITEM_KEY,
  PRICE_KEY
} from '../utils/constants';

const Parser: FC = () => {
  const [currCategory, setCurrCategory] = useState<THandledItemKeys>(CREATED_KEY);

  const {
    file,
    isFileUploading,
    isPricelistLoading
  } = useSelector(({ file, pricelist }) => ({
    file,
    isFileUploading: file.isFileUploading,
    isPricelistLoading: pricelist.isPricelistLoading
  }));

  const { uploadFile } = useFileUploader();
  const { comparedItems, comparedFileData, compareFileData } = useDataComparer();
  const { currSubCategory, categoryTypes, setCurrSubCategory } = useCategoryItems();
  const { fileDataNav, updateFileDataNav } = useFileDataNav();
  const { tableData, handleTableData } = useTableData();

  const setDataItems = (): TPricelistData | null => {
    const data:TPricelistData = Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: file[type]}), {});
    const dataItems = Object.values(data).filter(item => item.length === 0);

    return Object.values(data).length === dataItems.length ? null : data;
  };

  const selectFileCategory = ({ category, subCategory, arr }: TFileCategoryData): void => {
    if(!comparedFileData) {
      handleTableData(null);
      return;
    }

    /*
    if(category === currCategory && subCategory === currSubCategory && !arr) {
      return;
    }
    */

    const data = category === UPDATED_KEY && subCategory === TYPES[ITEM_KEY]
      ? {
          ...comparedFileData[category],
          [TYPES[ITEM_KEY]]: Array.isArray(arr)
            ? arr
            : fetchArray([...comparedItems[NAME_KEY], ...comparedItems[PRICE_KEY]], ID_KEY)
        }
      : comparedFileData[category];

    setCurrCategory(category);
    setCurrSubCategory(subCategory);

    handleTableData(
      {
        data,
        category: subCategory,
        params: null
      },
      setDataItems()
    );
  };

  const isFileDataExist = useMemo(
    () => {
      if(!fileDataNav.length) {
        return fileDataNav.length > 0;
      }

      const value = fileDataNav.reduce((acc, { counter }) => acc + counter, 0);

      return value > 0;
    },
    [fileDataNav]
  );

  useEffect(() => {
    compareFileData(
      setDataItems()
    );
  }, [
    file
  ]);

  useEffect(() => {
    console.log({comparedFileData});
    updateFileDataNav(comparedFileData);
  }, [
    comparedFileData
  ]);

  useEffect(() => {
    selectFileCategory({
      category: currCategory,
      subCategory: currSubCategory
    });
  }, [
    fileDataNav
  ]);

  return (
    <>
      <Layout>
        <ParserSidebar
          isUploadBtnDisabled={isFileUploading || isFileDataExist}
          isFileDataExist={isFileDataExist}
          handleUploadInput={uploadFile}
        >
          <ParserNav
            navData={fileDataNav}
            subNavData={comparedItems}
            subNavCounter={tableData ? tableData.rows.length : 0}
            currCategory={currCategory}
            currSubCategory={currSubCategory}
            handleClick={selectFileCategory}
          />
        </ParserSidebar>
        <Grid item xs={9} sx={{ pl: 3, pr: 2, display: 'flex', flexDirection: 'column' }}>
          <Pathway
            pageTitle={DEFAULT_DOC_TITLE}
            currNavTitle={`${HANDLED_ITEMS_CAPTIONS[currCategory]}, ${categoryTypes && categoryTypes[currSubCategory].toLowerCase()}`}
          />
          <ParserTable
            isBtnDisabled={isFileUploading || isPricelistLoading}
            isFileDataExist={isFileDataExist}
            isTableGridVisible={tableData !== null}
            tableTitle={tableData !== null ? `${FILE_ITEMS_TITLE} ${tableData.rows.length}` : NO_FILE_ITEMS_TITLE}
            tableGridCols={tableData ? tableData.cols : [] as GridColDef<GridValidRowModel>[]}
            tableGridRows={tableData ? tableData.rows : [] as GridValidRowModel[]}
            fileData={comparedFileData}
            categoryData={{ category: currCategory, subCategory: currSubCategory }}
          />
        </Grid>
      </Layout>
    </>
  )
};

export default Parser;
