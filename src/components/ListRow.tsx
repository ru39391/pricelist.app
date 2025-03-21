import { FC } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import type { TLinkedItem } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  IS_VISIBLE_KEY
} from '../utils/constants';

interface IListRow {
  caption?: string;
  items: TLinkedItem[];
}

const ListRow: FC<IListRow> = ({
  caption,
  items
}) => {
  if(items.length === 0) {
    return '';
  }

  return (
    <>
      {caption && <Typography variant="body2" component="div" sx={{ mb: .5 }}>{caption}</Typography>}
      <List sx={{ pt: 0 }}>{items.map(
        (item: TLinkedItem) => <ListItem
          key={item[ID_KEY].toString()}
          sx={{ py: 0 }}
        >
          <ListItemText
            primary={
              item[IS_VISIBLE_KEY]
                ? `${item[INDEX_KEY].toString()}. ${item[NAME_KEY]}`
                : <Typography color="textSecondary">{`${item[INDEX_KEY].toString()}. ${item[NAME_KEY]}`}</Typography>
            }
            {...(
              !item[IS_VISIBLE_KEY] && { sx: { textDecoration: 'line-through' } }
            )}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            {...(
              !item[IS_VISIBLE_KEY] && { sx: { textDecoration: 'line-through' } }
            )}
          >
            {item[PRICE_KEY].toString()} руб.
          </Typography>
        </ListItem>
      )}</List>
    </>
  )
};

export default ListRow;
