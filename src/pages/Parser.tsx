import {
  FC,
  useCallback,
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

import useModal from '../hooks/useModal';
import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';
import useFileUploader from '../hooks/useFileUploader';
import useDataComparer from '../hooks/useDataComparer';
import useFileDataNav from '../hooks/useFileDataNav';

import { useSelector, useDispatch } from '../services/hooks';
import { resetFileList } from '../services/actions/file';
import { setFormData } from '../services/slices/form-slice';

import type {
  TFileCategoryData,
  THandledItemKeys,
  TPricelistData
} from '../types';

import { fetchArray } from '../utils';
import {
  EDIT_ACTION_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  HANDLED_ITEMS_CAPTIONS,
  DEFAULT_DOC_TITLE,
  NO_FILE_ITEMS_TITLE,
  FILE_ITEMS_TITLE,
  EDIT_ITEM_TITLE,
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

  const dispatch = useDispatch();
  const { toggleModal } = useModal();
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

  const setConfirmModalVisible = () => {
    let desc = '';

    if(comparedFileData) {
      for (const key in comparedFileData) {
        const handledItemKey = key as THandledItemKeys;
        const itemCounters = Object.keys(comparedFileData[handledItemKey]).reduce(
          (acc, item, index) => `${acc}${index > 0 ? ', ' : ''}${categoryTypes && categoryTypes[item].toLowerCase()} - ${Object.values(comparedFileData[handledItemKey])[index].length.toString()}`,
          ''
        );

        desc = `${desc}${HANDLED_ITEMS_CAPTIONS[handledItemKey]}: ${itemCounters}. `;
      }
    }

    toggleModal({
      title: `Вы собираетесь ${EDIT_ITEM_TITLE.toLowerCase()}`,
      desc,
      isParserData: true
    });
    dispatch(setFormData({
      data: {
        isFormHidden: true,
        action: EDIT_ACTION_KEY,
        type: currSubCategory,
        items: comparedFileData || undefined,
        data: {}
      }
    }));
  }

  const resetFileData =  useCallback(() => {
    dispatch(resetFileList());
  }, [
    dispatch
  ]);

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
            handleConfirmBtnClick={setConfirmModalVisible}
            handleResetBtnClick={resetFileData}
          />
        </Grid>
      </Layout>
    </>
  )
};

export default Parser;
