import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, DeleteOutlined, Sync } from '@mui/icons-material';

import Layout from '../components/Layout';
import ParserSidebar from '../components/ParserSidebar';

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
  TActionKeys,
  TCustomData,
  TFileCategoryData,
  THandledItemKeys,
  TItemData,
  TPricelistData,
  TPricelistTypes,
} from '../types';

import { fetchArray } from '../utils';
import {
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  HANDLED_ITEMS_CAPTIONS,
  DEFAULT_DOC_TITLE,
  NO_FILE_ITEMS_TITLE,
  FILE_ITEMS_TITLE,
  APPLY_TITLE,
  CLEAR_TITLE,
  ADD_TITLE,
  REMOVE_TITLE,
  EDIT_ITEM_TITLE,
  ID_KEY,
  NAME_KEY,
  TYPES,
  ITEM_KEY,
  PRICE_KEY
} from '../utils/constants';

const InvisibleInput = styled('input')({
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  opacity: 0
});

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

  const params = {
    [CREATED_KEY]: {
      key: ADD_ACTION_KEY,
      title: ADD_TITLE
    },
    [UPDATED_KEY]: {
      key: EDIT_ACTION_KEY,
      title: EDIT_ITEM_TITLE
    },
    [REMOVED_KEY]: {
      key: REMOVE_ACTION_KEY,
      title: REMOVE_TITLE
    }
  };

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

  const handleItemData = (
    {
      values,
      currCategory,
      currSubCategory
    }: {
      values: TItemData;
      currCategory: THandledItemKeys;
      currSubCategory: TPricelistTypes;
    }
  ) => {
    const { key, title }: TCustomData<string> = params[currCategory];
    const items = comparedFileData ? comparedFileData[currCategory][currSubCategory] : [];
    const data = items.length ? items.find((item: TItemData) => item[ID_KEY] === values[ID_KEY]) : {};

    toggleModal({ title: `${title} «${values[NAME_KEY]}»` });
    dispatch(setFormData({
      data: {
        isFormHidden: true,
        action: key as TActionKeys,
        type: currSubCategory,
        values,
        ...( data ? { data } : { data: {} } )
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
        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              top: 24,
              height: '100%',
              maxHeight: '100vh',
              position: 'sticky',
              overflow: 'hidden',
              boxShadow: '4px 0 16px 0 rgba(0,0,0,.045)',
              bgcolor: 'background.default',
            }}
          >
            <Button
              sx={{ mb: 2, width: '100%' }}
              component="label"
              variant="contained"
              disabled={isFileUploading || isFileDataExist}
              startIcon={<CloudUpload />}
            >
              Загрузить файл
              <InvisibleInput type="file" accept=".xlsx, .xls" onChange={uploadFile} />
            </Button>
            {isFileDataExist && <ParserSidebar
              navData={fileDataNav}
              subNavData={comparedItems}
              subNavCounter={tableData ? tableData.rows.length : 0}
              currCategory={currCategory}
              currSubCategory={currSubCategory}
              handleClick={selectFileCategory}
            />}
          </Box>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3, pr: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ mb: 1 }}>{DEFAULT_DOC_TITLE}</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4, typography: 'subtitle2' }}>
            <Link
              component={NavLink}
              to="/"
              color="inherit"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Главная
            </Link>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {HANDLED_ITEMS_CAPTIONS[currCategory]}, {categoryTypes && categoryTypes[currSubCategory].toLowerCase()}
            </Typography>
          </Breadcrumbs>

          {isFileDataExist && <>
            <Box sx={{ mb: 2, gap: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ typography: 'body1' }}>{tableData !== null ? `${FILE_ITEMS_TITLE} ${tableData.rows.length}` : NO_FILE_ITEMS_TITLE}</Typography>
              <Box sx={{ gap: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {/*
                  // TODO: блокировать кнопки, пока данные обрабатываются сервером
                  // TODO: возможно, перенести кнопку в сайдбар
                */}
                <Button
                  variant="outlined"
                  startIcon={<Sync />}
                  disabled={isFileUploading || isPricelistLoading}
                  onClick={() => setConfirmModalVisible()}
                >
                  {APPLY_TITLE}
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteOutlined />}
                  disabled={isFileUploading || isPricelistLoading}
                  onClick={resetFileData}
                >
                  {CLEAR_TITLE}
                </Button>
              </Box>
            </Box>
            {/* // TODO: настроить сброс данных таблицы comparedFileData после успешного ответа сервера */}
            {tableData !== null && <DataGrid
              sx={{ border: 0, flexGrow: 1, height: 'auto', boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)', bgcolor: 'background.default' }}
              columns={tableData ? tableData.cols : []}
              rows={tableData ? tableData.rows : []}
              // TODO: необязательная доработка - возможность удалять группы записей
              onRowClick={({ row }: { row: TItemData }) => handleItemData({ values: row, currCategory, currSubCategory })}
            />}
          </>}
        </Grid>
      </Layout>
    </>
  )
};

export default Parser;
