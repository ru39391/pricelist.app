import {
  FC,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Grid } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

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
  TFileDataNav,
  THandledItemKeys,
  TPricelistData
} from '../types';

import {
  CREATED_KEY,
  HANDLED_ITEMS_CAPTIONS,
  DEFAULT_DOC_TITLE,
  NO_FILE_ITEMS_TITLE,
  FILE_ITEMS_TITLE,
  TYPES,
} from '../utils/constants';

const ParserContent: FC = () => {
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

  /**
   * Устанавливает локальное состояние категории (тип изменения) и подкатегории (тип элементов) для навигации по обработанным данным xls-файла
   */
  const setCategoryData = ({ category, subCategory }: TFileCategoryData) => {
    setCurrCategory(category);
    setCurrSubCategory(subCategory);
  };

  /**
   * Объект категоризированных массивов из полученных при парсинге xls-файла элементов:
   * если все массивы пусты, равен null
   */
  const currFileData = useMemo(() => {
    const data = Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: file[type]}), {} as TPricelistData);
    const dataItems = Object.values(data).filter(item => item.length === 0);

    return Object.values(data).length === dataItems.length ? null : data;
  }, [file]);

  /**
   * Список категорий навигации в сайдбаре
   */
  const navData = useMemo(
    () => fileDataNav.length > 0 ? [fileDataNav[0], fileDataNav[fileDataNav.length - 1], fileDataNav[1]] : [] as TFileDataNav,
    [fileDataNav]
  );

  /**
   * Истинность существования данных обработанного файла при условии наличия элементов навигации
   */
  const isFileDataExist = useMemo(() => navData.length > 0, [navData]);

  useEffect(() => {
    compareFileData(currFileData);
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
    console.log({fileDataNav});
  }, [
    fileDataNav
  ]);

  return (
    <>
      <ParserSidebar
        isUploadBtnDisabled={isFileUploading || isFileDataExist}
        handleUploadInput={uploadFile}
      >
        <ParserNav
          fileData={comparedFileData}
          currFileData={currFileData}
          navData={navData}
          subNavData={comparedItems}
          subNavCounter={tableData ? tableData.rows.length : 0}
          categoryData={{ category: currCategory, subCategory: currSubCategory }}
          handleTableData={handleTableData}
          handleCategoryData={setCategoryData}
        />
      </ParserSidebar>
      <Grid item xs={9} sx={{ pl: 3, pr: 2, display: 'flex', flexDirection: 'column' }}>
        {/* // TODO: пересмотреть типы для categoryTypes */}
        <Pathway
          pageTitle={DEFAULT_DOC_TITLE}
          currNavTitle={`${HANDLED_ITEMS_CAPTIONS[currCategory]}, ${categoryTypes && categoryTypes[currSubCategory as string].toLowerCase()}`}
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
          categoryTypes={categoryTypes}
        />
      </Grid>
    </>
  )
};

export default ParserContent;
