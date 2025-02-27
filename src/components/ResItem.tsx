import { FC, Fragment, useCallback, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ArrowBack, Check, Done, RemoveRedEye } from '@mui/icons-material';

import ResItemControllers from './ResItemControllers';
import ResItemCategoryList from './ResItemCategoryList';
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

  const isLinkedDataExist = (param: string): boolean => Boolean(linkedDataConfig && linkedDataConfig[param]);

  const setLinkedData = () => {
    console.log({linkedDataConfig});
    if(isLinkedDataExist(IS_COMPLEX_DATA_KEY) && isLinkedDataExist(IS_GROUP_IGNORED_KEY)) {
      return;
    }

    if(existableGroups.length === 0 && existableItems.length > 0) {
      handleDataConfig({
        [IS_COMPLEX_DATA_KEY]: true,
        [IS_GROUP_IGNORED_KEY]: true,
      });
    }
  };

  const dispatchResLinkedData = useCallback(() => {
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

      <ResItemControllers
        linkedList={linkedGroups}
        existableList={existableGroups}
        itemsHandler={resLinkHandlers}
        configHandler={handleDataConfig}
        paramsHandler={isLinkedDataExist}
      />

      {linkedSubdepts.map(
        (subdept) => <Box
          key={subdept[ID_KEY].toString()}
          sx={{
            mb: 1.5,
            gap: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>{subdept[NAME_KEY]}</Typography>
              {isLinkedDataExist(IS_GROUP_IGNORED_KEY)
                ? (existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY])
                    && existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY]).map(
                    (options) => <Fragment key={options[ID_KEY].toString()}>
                      <Typography variant="subtitle1" color="textPrimary" component="div" sx={{ mb: .5 }}>{options[NAME_KEY]}</Typography>
                      {existableItems.filter((item) => item[GROUP_KEY] === options[ID_KEY]).length > 0
                        ? <Box
                          sx={{
                            mb: 2,
                            gap: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                          }}
                        >
                          {existableItems.filter((item) => item[GROUP_KEY] === options[ID_KEY]).map(
                            (data) => <Chip
                              key={data[ID_KEY].toString()}
                              label={data[NAME_KEY]}
                              onClick={() => resLinkHandlers[ITEM_KEY]({ data })}
                              {...( isLinkedItemActive(linkedItems, data) && { color: 'primary', icon: <Done /> } )}
                            />
                          )}
                        </Box>
                        : <Typography variant="body2" color="textSecondary" component="div" sx={{ mb: 2 }}>Группа не содержит услуг</Typography>
                      }
                    </Fragment>)
                  )
                : (existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY]).length > 0
                    ? <Box
                        sx={{
                          mb: 0,
                          gap: 1,
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        {existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY]).map(
                          (data) => <Chip
                            key={data[ID_KEY].toString()}
                            label={`${data[NAME_KEY]}`}
                            variant="outlined"
                            onClick={() => resLinkHandlers[GROUP_KEY]({ data })}
                            {...( isLinkedItemActive(linkedGroups, data) && { color: 'primary', icon: <Done />, sx: { backgroundColor: '#fff' } } )}
                          />
                        )}
                      </Box>
                    : <Typography variant="body2" color="textSecondary" component="div">Специализация не содержит групп</Typography>
                  )
              }

              {(isLinkedDataExist(IS_COMPLEX_DATA_KEY) || isLinkedDataExist(IS_GROUP_IGNORED_KEY))
                && existableItems.filter((item) => item[SUBDEPT_KEY] === subdept[ID_KEY] && item[GROUP_KEY] === 0).length > 0
                && <>
                  {isLinkedDataExist(IS_GROUP_IGNORED_KEY)
                    && <Typography variant="subtitle1" color="textPrimary" component="div" sx={{ mb: .5 }}>Без группы</Typography>}
                  <Box
                    sx={{
                      ...( !isLinkedDataExist(IS_GROUP_IGNORED_KEY) && { mt: 2 } ),
                      mb: 0,
                      gap: 1,
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    {existableItems.filter((item) => item[SUBDEPT_KEY] === subdept[ID_KEY] && item[GROUP_KEY] === 0).map(
                      (data) => <Chip
                        key={data[ID_KEY].toString()}
                        label={data[NAME_KEY]}
                        onClick={() => resLinkHandlers[ITEM_KEY]({ data })}
                        {...( isLinkedItemActive(linkedItems, data) && { color: 'primary', icon: <Done /> } )}
                      />
                    )}
                  </Box>
                </>
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
              [TYPES[ITEM_KEY]]: linkedItems,
            },
            linkedDataConfig
        )}
        >
          Предпросмотр
        </Button>
      </Box>
    </>
  )
};

export default ResItem;
