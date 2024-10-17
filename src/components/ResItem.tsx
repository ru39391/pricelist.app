import { FC, Fragment, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled, lighten, darken } from '@mui/system';
import { ArrowBack, Check, Done, RemoveRedEye } from '@mui/icons-material';

import ResLinkedItems from './ResLinkedItems';

import useResLinks from '../hooks/useResLinks';
import useResLinkedItems from '../hooks/useResLinkedItems';

import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  TITLES,
  CATEGORY_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  IS_COMPLEX_DATA_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  LINKED_RES_PARAMS,
  SAVE_TITLE
} from '../utils/constants';

const GroupHeader = styled('div')(({ theme }) => ({
  zIndex: 1,
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', { backgroundColor: darken(theme.palette.primary.main, 0.8) }),
}));

const GroupList = styled('ul')({ padding: 0, zIndex: 1 });

const ResItem: FC = () => {
  const {
    linkedDepts,
    linkedSubdepts,
    linkedGroups,
    linkedItems,

    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,

    linkedDataConfig,

    resLinkHandlers,
    isLinkedItemActive,
    handleDataConfig,
    updateLinkedItems
  } = useResLinks();
  const {
    resLinkedItems,
    isLinkedListExist,
    renderLinkedItems,
    resetLinkedItems
  } = useResLinkedItems();

  const isLinkedDataExist = (param: string): boolean => Boolean(linkedDataConfig && linkedDataConfig[param]);

  const setLinkedData = () => {
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
            loading={false}
            disabled={!isLinkedListExist}
            startIcon={<Check />}
            onClick={() => updateLinkedItems({
              [TYPES[DEPT_KEY]]: linkedDepts,
              [TYPES[SUBDEPT_KEY]]: linkedSubdepts,
              [TYPES[GROUP_KEY]]: linkedGroups,
              [TYPES[ITEM_KEY]]: linkedItems
            })}
          >
            {SAVE_TITLE}
          </LoadingButton>
        </Box>
      </>
    );
  }

  return (
    <>
      {existableDepts.length > 0 && <Autocomplete
        multiple
        filterSelectedOptions
        id={`${DEPT_KEY}-selecter`}
        sx={{ mb: 3, backgroundColor: '#fff' }}
        value={linkedDepts}
        options={existableDepts}
        getOptionLabel={(option) => option[NAME_KEY] as string}
        renderInput={(props) => <TextField {...props} label={[TITLES[DEPT_KEY]]} />}
        renderOption={(props, option) => <ListItem {...props}>{option[NAME_KEY]}</ListItem>}
        getOptionKey={(option) => option[ID_KEY]}
        onChange={(event, value, reason ) => resLinkHandlers[DEPT_KEY]({
          action: reason,
          items: reason === 'clear' ? [] : value
        })}
      />}

      {existableSubdepts.length > 0 && <Autocomplete
        multiple
        filterSelectedOptions
        id={`${SUBDEPT_KEY}-selecter`}
        sx={{ mb: 2.5, backgroundColor: '#fff' }}
        value={linkedSubdepts}
        options={existableSubdepts}
        getOptionLabel={(option) => option[NAME_KEY] as string}
        groupBy={(option) => option[CATEGORY_KEY] as string}
        renderInput={(props) => <TextField {...props} label={[TITLES[SUBDEPT_KEY]]} />}
        renderOption={(props, option) => <ListItem {...props}>{option[NAME_KEY]}</ListItem>}
        renderGroup={(props) => (
          <li key={props.key}>
            <GroupHeader>{props.group}</GroupHeader>
            <GroupList>{props.children}</GroupList>
          </li>
        )}
        getOptionKey={(option) => option[ID_KEY]}
        onChange={(event, value, reason ) => {
          console.log({value});
          resLinkHandlers[SUBDEPT_KEY]({
            action: reason,
            items: reason === 'clear' ? [] : value
          })
        }}
      />}

      {existableGroups.length > 0
        ? (<Box
          sx={{
            mb: .5,
            gap: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            <FormControlLabel
              label={existableGroups.length === linkedGroups.length ? LINKED_RES_PARAMS[REMOVE_ACTION_KEY] : LINKED_RES_PARAMS[ADD_ACTION_KEY]}
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  checked={existableGroups.length === linkedGroups.length}
                  disabled={isLinkedDataExist(IS_GROUP_IGNORED_KEY)}
                  onChange={() => resLinkHandlers[GROUP_KEY]({ items: existableGroups.length === linkedGroups.length ? [] : existableGroups })}
                />
              }
            />
            <FormControlLabel
              label={LINKED_RES_PARAMS[IS_COMPLEX_DATA_KEY]}
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  id={IS_COMPLEX_DATA_KEY}
                  checked={isLinkedDataExist(IS_COMPLEX_DATA_KEY) || isLinkedDataExist(IS_GROUP_IGNORED_KEY)}
                  disabled={isLinkedDataExist(IS_GROUP_IGNORED_KEY)}
                  onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_COMPLEX_DATA_KEY) })}
                />
              }
            />
            <FormControlLabel
              label={LINKED_RES_PARAMS[IS_GROUP_IGNORED_KEY]}
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  id={IS_GROUP_IGNORED_KEY}
                  checked={isLinkedDataExist(IS_GROUP_IGNORED_KEY)}
                  disabled={linkedGroups.length !== 0}
                  onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_GROUP_IGNORED_KEY) })}
                />
              }
            />
            {isLinkedDataExist(IS_GROUP_IGNORED_KEY)
              && <FormControlLabel
                label={LINKED_RES_PARAMS[IS_GROUP_USED_KEY]}
                sx={{ mb: .25 }}
                control={
                  <Checkbox
                    id={IS_GROUP_USED_KEY}
                    checked={isLinkedDataExist(IS_GROUP_USED_KEY)}
                    disabled={!isLinkedDataExist(IS_GROUP_IGNORED_KEY)}
                    onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_GROUP_USED_KEY) })}
                  />
                }
              />
            }
          </Box>)
        : (existableItems.length > 0
            && <Box
              sx={{
                mb: .5,
                gap: 1,
                display: 'flex',
                flexWrap: 'wrap',
              }}>
              <FormControlLabel
                label={LINKED_RES_PARAMS[IS_COMPLEX_DATA_KEY]}
                sx={{ mb: .25 }}
                control={
                  <Checkbox
                    id={IS_COMPLEX_DATA_KEY}
                    checked={isLinkedDataExist(IS_COMPLEX_DATA_KEY)}
                    disabled={existableGroups.length === 0 && existableItems.length > 0}
                    onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_COMPLEX_DATA_KEY) })}
                  />
                }
              />
              <FormControlLabel
                label={LINKED_RES_PARAMS[IS_GROUP_IGNORED_KEY]}
                sx={{ mb: .25 }}
                control={
                  <Checkbox
                    id={IS_GROUP_IGNORED_KEY}
                    checked={isLinkedDataExist(IS_GROUP_IGNORED_KEY)}
                    disabled={linkedGroups.length !== 0 || (existableGroups.length === 0 && existableItems.length > 0)}
                    onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_GROUP_IGNORED_KEY) })}
                  />
                }
              />
            </Box>
          )
      }

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
                          {/* TODO: https://skrinshoter.ru/vSESzEhTYzC - баг выбора услуг после удаления группы из списка */}
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
                            label={data[NAME_KEY]}
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

      {/* // TODO: настроить сохранение {color || 'success'} */}
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

/*
  Чекбоксы:
    - игнорировать отделения;
    - игнорировать специализации;
    - игнорировать группы;

  Радио:
    - выбрать услуги;
    - выбрать группы;
    - выбрать специализации;

  Сортировка по INDEX_KEY

  {
    res_id: 7,
    data: [{
      item_id: 7917,
      name: 'Лазерное удаление  невусов СО2 лазером',
      index: 0,
      parent: {
        dept: {
          item_id: 4,
          name: 'Медицина',
          index: 0,
          isVisible: 0,
        },
        subdept: {
          item_id: 41,
          name: 'Cпециализация',
          index: 0,
          isVisible: 1,
        },
        group: {
          item_id: 100,
          name: 'Группа',
          index: 0,
          isVisible: 0,
        }
      }
    }]
  }
*/