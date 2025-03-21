import { FC, Fragment } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import ListRow from './ListRow';

import type {
  TLinkedItem,
  TLinkedGroup,
  TLinkedSubdept,
  TLinkedDept,
  TLinkedDeptKeys,
  TLinkedSubdeptKeys,
  TLinkedGroupKeys
} from '../types';

import {
  ID_KEY,
  NAME_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  EMPTY_CATEGORY
} from '../utils/constants';

interface IResLinkedItems {
  isLinkedListExist: boolean,
  linkedItems: TLinkedDept[];
}

const ResLinkedItems: FC<IResLinkedItems> = ({ isLinkedListExist, linkedItems }) => {
  if(!isLinkedListExist) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="div">{EMPTY_CATEGORY}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    {linkedItems.map(
      (dept) => <Card key={dept[ID_KEY].toString()} variant="outlined" sx={{ mb: 1 }}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="div" sx={{ mb: .5 }}>{dept[NAME_KEY]}</Typography>
          {[...dept[TYPES[SUBDEPT_KEY] as TLinkedDeptKeys] as TLinkedSubdept[]].map(
            (subdept: TLinkedSubdept) => <Fragment key={subdept[ID_KEY].toString()}>
              <Typography variant="subtitle1" color="textSecondary" component="div" sx={{ mb: .5 }}>
              {[
                ...[...subdept[TYPES[ITEM_KEY] as TLinkedSubdeptKeys] as TLinkedItem[]],
                ...[...subdept[TYPES[GROUP_KEY] as TLinkedSubdeptKeys] as TLinkedGroup[]].reduce(
                  (acc: TLinkedItem[], data: TLinkedGroup) => [...acc, ...data[TYPES[ITEM_KEY] as TLinkedGroupKeys] as TLinkedItem[]], []
                )
              ].length === 0 ? `Ничего на выбрано для специализации "${subdept[NAME_KEY]}"` : subdept[NAME_KEY]}
              </Typography>
              <ListRow items={subdept[TYPES[ITEM_KEY] as TLinkedSubdeptKeys] as TLinkedItem[]} />

              {[...subdept[TYPES[GROUP_KEY] as TLinkedSubdeptKeys] as TLinkedGroup[]].length > 0
                && [...subdept[TYPES[GROUP_KEY] as TLinkedSubdeptKeys] as TLinkedGroup[]].map(
                  (group: TLinkedGroup) => <ListRow
                      key={group[ID_KEY].toString()}
                      caption={group[NAME_KEY]}
                      items={group[TYPES[ITEM_KEY] as TLinkedGroupKeys] as TLinkedItem[]}
                    />
                )
              }
            </Fragment>
          )}
        </CardContent>
      </Card>
    )}
    </>
  )
}

export default ResLinkedItems;
