import { FC, Fragment, useCallback, useContext, useEffect, useMemo } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ArrowBack, Check, RemoveRedEye } from '@mui/icons-material';

import ResItemControllers from './ResItemControllers';
import ResItemCategoryList from './ResItemCategoryList';
import ResItemTogglersList from './ResItemTogglersList';
import ResLinkedItems from './ResLinkedItems';

import useResLinks from '../hooks/useResLinks';
import useResLinkedItems from '../hooks/useResLinkedItems';

import ResItemContext from '../contexts/ResItemContext';

import { useSelector, useDispatch } from '../services/hooks';
import { handleResLinkedData } from '../services/actions/pricelist';

import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  SAVE_TITLE,
} from '../utils/constants';
import { TItemData, TItemsArr, TPricelistKeys } from '../types';

const ResItem: FC = () => {
  const {
    linkedItemsData: {
      linkedDepts,
      linkedSubdepts,
      linkedGroups,
      linkedItems,
      existableDepts,
      existableSubdepts,
      existableGroups,
      existableItems,
    },
    linkedDataConfig,
    resLinkHandlers,
    handleDataConfig
  } = useContext(ResItemContext);
  const { isPricelistLoading } = useSelector(state => state.pricelist);

  const dispatch = useDispatch();
  const { isLinkedItemActive } = useResLinks();
  const {
    resLinkedItems,
    resLinkedData,
    isLinkedListExist,
    isLinkedListCurrent,
    renderLinkedItems,
    resetLinkedItems
  } = useResLinkedItems();

  const isDeptTogglerVisible = useMemo(
    () => linkedDepts.length === 1 && linkedSubdepts.length === 0,
    [linkedDepts, linkedSubdepts]
  );

  const isLinkedDataExist = useCallback(
    (param: string): boolean => Boolean(linkedDataConfig && linkedDataConfig[param]),
    [linkedDataConfig]
  );

  const currLinkedItems = useMemo(() => {
    // TODO: поправить присоединение услуг при установленном чекбоксе "Игнорировать группы", когда для существующей привязки сняли выбор групп - "Приём врача-отоларинголога": снимаю выбранные группы, выбираю "Игнорировать группы" - отображение корректное
    // предусмотреть случай выбора позиций без групп при комплексном выборе, когда linkedGroups.length === 0 - "Приём врача-отоларинголога": снимаю выбранные группы, выбираю "Комплексный выбор", выбираю услуги - отображение корректное
    const groupedLinkedItems = linkedItems.filter((item) => item[GROUP_KEY] !== 0);
    const ungroupedLinkedItems = linkedItems.filter((item) => item[GROUP_KEY] === 0);
    const linkedItemsList = isLinkedDataExist(IS_GROUP_IGNORED_KEY) ? linkedItems : ungroupedLinkedItems;
    const complexLinkedItems = linkedGroups.length > 0 ? linkedItems : linkedItemsList

    return isLinkedDataExist(IS_COMPLEX_DATA_KEY) ? complexLinkedItems : groupedLinkedItems;
  }, [
    linkedGroups,
    linkedItems,
    isLinkedDataExist
  ]);

  const filterList = (arr: TItemsArr, data: TItemData, key: TPricelistKeys): TItemsArr => arr.filter((item) => item[key] === data[ID_KEY]);

  const setLinkedData = () => {
    // console.log({linkedDataConfig});
    if(isLinkedDataExist(IS_COMPLEX_DATA_KEY) && isLinkedDataExist(IS_GROUP_IGNORED_KEY)) {
      return;
    }

    // TODO: неясный момент - проверить, нужно ли это
    if(existableGroups.length === 0 && existableItems.length > 0) {
      handleDataConfig('SET_GROUP_IGNORED');
    }
  };

  const dispatchResLinkedData = useCallback(() => {
    console.log({resLinkedData, isLinkedListExist});
    if(resLinkedData) dispatch(handleResLinkedData(resLinkedData));
  }, [
    dispatch,
    resLinkedData
  ]);

  useEffect(() => {
    setLinkedData();
  }, [
    linkedSubdepts,
    existableGroups,
    existableItems
  ]);

  if(resLinkedItems.length > 0) {
    return (
      <>
        <ResLinkedItems isLinkedListExist={isLinkedListExist} linkedItems={resLinkedItems} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={resetLinkedItems}
          >
            Назад
          </Button>
          <LoadingButton
            color='success'
            variant="outlined"
            loadingPosition="start"
            loading={isPricelistLoading}
            disabled={!isLinkedListExist || isLinkedListCurrent}
            startIcon={<Check />}
            onClick={dispatchResLinkedData}
          >
            {SAVE_TITLE}
          </LoadingButton>
        </Box>
      </>
    );
  }

  return (
    <>
      {[{
        category: DEPT_KEY,
        sx: { mb: 3, backgroundColor: '#fff' },
        linkedList: linkedDepts,
        existableList: existableDepts
      }, {
        category: SUBDEPT_KEY,
        sx: { mb: 2.5, backgroundColor: '#fff' },
        linkedList: linkedSubdepts,
        existableList: existableSubdepts
      }].map((props) => <ResItemCategoryList key={props.category} handler={resLinkHandlers} {...props} />)}

      {isDeptTogglerVisible
        ? <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <LoadingButton
              color='success'
              variant="outlined"
              loadingPosition="start"
              loading={isPricelistLoading}
              disabled={isLinkedListCurrent}
              startIcon={<Check />}
              onClick={dispatchResLinkedData}
            >
              {SAVE_TITLE}
            </LoadingButton>
          </Box>
        : <>
          <ResItemControllers
            linkedList={linkedGroups}
            existableList={existableGroups}
            itemsHandler={resLinkHandlers}
            configHandler={handleDataConfig}
            paramsHandler={isLinkedDataExist}
          />
          {linkedSubdepts.map(
            (subdept) => <Box key={subdept[ID_KEY].toString()} sx={{ mb: 1.5, gap: 1, display: 'flex', flexDirection: 'column' }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>{subdept[NAME_KEY]}</Typography>
                  {isLinkedDataExist(IS_GROUP_IGNORED_KEY)
                    ? (filterList(existableGroups, subdept, SUBDEPT_KEY).map(
                        (options) => <ResItemTogglersList
                          key={options[ID_KEY].toString()}
                          handler={resLinkHandlers}
                          paramsHandler={isLinkedItemActive}
                          arr={filterList(existableItems, options, GROUP_KEY)}
                          linkedList={linkedItems}
                          category={ITEM_KEY}
                          styles={{ mb: 2 }}
                          warningStyles={{ mb: 2 }}
                          warningMess="Группа не содержит услуг"
                          caption={<Typography variant="subtitle1" color="textPrimary" component="div" sx={{ mb: .5 }}>{options[NAME_KEY]}</Typography>}
                        />)
                      )
                    : <ResItemTogglersList
                        handler={resLinkHandlers}
                        paramsHandler={isLinkedItemActive}
                        arr={filterList(existableGroups, subdept, SUBDEPT_KEY)}
                        linkedList={linkedGroups}
                        category={GROUP_KEY}
                        styles={{ mb: 0 }}
                        sx={{ backgroundColor: '#fff' }}
                        warningMess="Специализация не содержит групп"
                        variant="outlined"
                      />
                  }

                  {(isLinkedDataExist(IS_COMPLEX_DATA_KEY) || isLinkedDataExist(IS_GROUP_IGNORED_KEY))
                    && filterList(existableItems, subdept, SUBDEPT_KEY).filter((item) => item[GROUP_KEY] === 0).length > 0
                    && <ResItemTogglersList
                        handler={resLinkHandlers}
                        paramsHandler={isLinkedItemActive}
                        arr={filterList(existableItems, subdept, SUBDEPT_KEY).filter((item) => item[GROUP_KEY] === 0)}
                        linkedList={linkedItems}
                        category={ITEM_KEY}
                        styles={{ mb: 0, ...(!isLinkedDataExist(IS_GROUP_IGNORED_KEY) && { mt: 2 }) }}
                        caption={
                          isLinkedDataExist(IS_GROUP_IGNORED_KEY)
                            ? <Typography variant="subtitle1" color="textPrimary" component="div" sx={{ mb: .5 }}>Без группы</Typography>
                            : <Fragment />
                        }
                      />
                  }
                </CardContent>
              </Card>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
            <Button
              variant="outlined"
              disabled={[...linkedGroups, ...linkedItems].length === 0}
              startIcon={<RemoveRedEye />}
              onClick={() => renderLinkedItems(
                {
                  [TYPES[DEPT_KEY]]: linkedDepts,
                  [TYPES[SUBDEPT_KEY]]: linkedSubdepts,
                  [TYPES[GROUP_KEY]]: linkedGroups,
                  [TYPES[ITEM_KEY]]: currLinkedItems
                },
                linkedDataConfig
              )}
            >
              Предпросмотр
            </Button>
          </Box>
        </>
      }
    </>
  )
};

export default ResItem;

/*
// TODO: поправить баг "Выбранные категории не содержат услуг"
https://skrinshoter.ru/vUOAPn8lw7z
*/
