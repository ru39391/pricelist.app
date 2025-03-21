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
  FormControl,
  Grid,
  InputLabel,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, DeleteOutlined, FolderOpen, Sync } from '@mui/icons-material';

import Layout from '../components/Layout';

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
  TCustomData,
  TPricelistData,
  TItemData,
  TPricelistTypes,
  THandledItemKeys,
  TActionKeys
} from '../types';

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
  INDEX_KEY,
  NAME_KEY,
  PRICE_KEY,
  ROW_INDEX_KEY,
  CREATEDON_KEY,
  UPDATEDON_KEY,
  QUANTITY_KEY,
  TYPES,
  CAPTIONS,
  LINKED_RES_PARAMS,
  IS_GROUP_IGNORED_KEY
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
  // TODO: необязательная доработка - переделать для использования useReducer или вынести значение по умолчанию в переменную
  const [currParamData, setCurrParamData] = useState<Record<string, string> | undefined>({key: PRICE_KEY, value: CAPTIONS[PRICE_KEY]});

  const file = useSelector(state => state.file);
  const { isFileUploading } = file;

  const dispatch = useDispatch();
  const { toggleModal } = useModal();
  const { uploadFile } = useFileUploader();
  const { comparedFileData, compareFileData } = useDataComparer();
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
  const categoryKeys = Object.entries(CAPTIONS).reduce((acc: Record<string, string>[], item) => {
    const [key, value] = item;

    if([ID_KEY, CREATEDON_KEY, UPDATEDON_KEY, QUANTITY_KEY].includes(key)) {
      return acc;
    } else {
      return [
        ...acc,
        {
          value,
          ...( key === ROW_INDEX_KEY ? { key: INDEX_KEY } : { key } )
        }
      ];
    }

  }, []);

  const handleCurrParamData = (key: string) => {
    if(key === IS_GROUP_IGNORED_KEY) {
      setCurrParamData(undefined);
      return;
    }

    const value = categoryKeys.find(item => item.key === key);

    setCurrParamData(value);
  }

  const setDataItems = (): TPricelistData | null => {
    const data:TPricelistData = Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: file[type]}), {});
    const dataItems = Object.values(data).filter(item => item.length === 0);

    return Object.values(data).length === dataItems.length ? null : data;
  };

  const selectFileCategory = (
    {
      category,
      subCategory
    }: {
      category: THandledItemKeys;
      subCategory: TPricelistTypes;
    }
  ): void => {
    if(!comparedFileData) {
      handleTableData(null);
      return;
    }

    setCurrCategory(category);
    setCurrSubCategory(subCategory);
    handleTableData(
      {
        data: comparedFileData[category],
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
    setCurrParamData({key: PRICE_KEY, value: CAPTIONS[PRICE_KEY]});
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
      setDataItems(),
      currParamData ? currParamData.key : undefined
    );
  }, [
    file
  ]);

  // TODO: настроить сброс comparedFileData при успешном сохранении данных обработанного документа
  useEffect(() => {
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
              <FormControl sx={{ minWidth: 200, backgroundColor: '#fff' }} size="small">
                <InputLabel id="demo-select-small-label">Изменения</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={currParamData ? currParamData.key : IS_GROUP_IGNORED_KEY}
                  label={currParamData ? currParamData.value : LINKED_RES_PARAMS[IS_GROUP_IGNORED_KEY]}
                  disabled={isFileDataExist}
                  onChange={({ target }) => handleCurrParamData(target.value)}
                >
                  {[
                    ...categoryKeys,
                    { key: IS_GROUP_IGNORED_KEY, value: LINKED_RES_PARAMS[IS_GROUP_IGNORED_KEY] }
                  ].map(({ key, value }) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
                </Select>
              </FormControl>
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
