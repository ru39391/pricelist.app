import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Collapse,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, DeleteOutlined, FolderOpen, Sync } from '@mui/icons-material';

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
  ITEM_KEY
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

  const file = useSelector(state => state.file);
  const { isFileUploading } = file;

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

    if(category === currCategory && subCategory === currSubCategory) {
      return;
    }
    console.log({ category, subCategory });

    const data = category === UPDATED_KEY && subCategory === TYPES[ITEM_KEY]
      ? {
          ...comparedFileData[category],
          [TYPES[ITEM_KEY]]: Array.isArray(arr) ? arr : fetchArray(Object.values(comparedItems).flat(), ID_KEY)
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

  const setConfirmModalVisible = (
    {
      currCategory,
      currSubCategory
    }:{
      currCategory: THandledItemKeys;
      currSubCategory: TPricelistTypes;
    }
  ): void => {
    const { key, title }: TCustomData<string> = params[currCategory];

    toggleModal({
      title: `${title} ${categoryTypes && categoryTypes[currSubCategory].toLowerCase()}`,
      desc: `Вы собираетесь ${title.toLowerCase()} ${categoryTypes && categoryTypes[currSubCategory].toLowerCase()}. Общее количество обновляемых записей: ${tableData ? tableData.rows.length : 0}`,
      isParserData: true
    });
    dispatch(setFormData({
      data: {
        isFormHidden: true,
        action: key as TActionKeys,
        type: currSubCategory,
        items: comparedFileData ? comparedFileData[currCategory][currSubCategory] : [],
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
      console.log({fileDataNav});
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
            {fileDataNav.length > 0 && <ParserSidebar
              isSidebarVisible={isFileDataExist}
              navData={fileDataNav}
              subNavData={comparedItems}
              currCategory={currCategory}
              currSubCategory={currSubCategory}
              handleClick={selectFileCategory}
            />}
            <hr />
            {/* // TODO: возможно, вынести в отдельный компонент */}
            {isFileDataExist && fileDataNav.map(({ key, caption, counter, data }) =>
              (<Fragment key={key}>
                <ListItemButton selected={true} sx={{ py: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
                    <ListItemText primary={caption} sx={{ mr: 3 }} />
                    <Badge badgeContent={counter} color="primary" />
                  </Box>
                </ListItemButton>
                {categoryTypes && counter > 0 && <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {data.map(
                      (item) =>
                      <ListItemButton
                        key={categoryTypes[item.key as string]}
                        selected={currCategory === key as THandledItemKeys && currSubCategory === item.key as string}
                        sx={{ pl: 6, color: 'grey.600', fontSize: 14 }}
                        onClick={() => selectFileCategory({category: key as THandledItemKeys, subCategory: item.key as TPricelistTypes })}
                      >
                        <ListItemText
                          disableTypography
                          primary={categoryTypes[item.key as string]}
                          sx={{ m: 0, mr: 2, flexGrow: 0 }}
                        />
                        <Badge badgeContent={item.counter as number} color="default" showZero />
                      </ListItemButton>
                    )}
                  </List>
                </Collapse>}
              </Fragment>)
            )}
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

          <Box
            sx={{
              mb: 2,
              gap: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ typography: 'body1' }}>{tableData !== null ? `${FILE_ITEMS_TITLE} ${tableData.rows.length}` : NO_FILE_ITEMS_TITLE}</Typography>
            <Box
              sx={{
                gap: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              {tableData && tableData.rows.length > 0
                ? <>
                    <Button
                      variant="outlined"
                      startIcon={<Sync />}
                      onClick={() => setConfirmModalVisible({currCategory, currSubCategory})}
                    >
                      {APPLY_TITLE}
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteOutlined />}
                      onClick={resetFileData}
                    >
                      {CLEAR_TITLE}
                    </Button>
                  </>
                : ''
              }
            </Box>
          </Box>

          {tableData !== null
            ? <DataGrid
                sx={{
                  border: 0,
                  flexGrow: 1,
                  height: 'auto',
                  boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
                  bgcolor: 'background.default',
                }}
                columns={tableData ? tableData.cols : []}
                rows={tableData ? tableData.rows : []}
                // TODO: необязательная доработка - возможность удалять группы записей
                onRowClick={({ row }: { row: TItemData }) => handleItemData({ values: row, currCategory, currSubCategory })}
              />
            : ''
          }
        </Grid>
      </Layout>
    </>
  )
};

export default Parser;
