import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

import {
  PARSER_KEY,
  PARSER_TITLE,
  CMS_TITLE,
  CMS_URL,
  SITE_URL
} from '../utils/constants';

const NavParserItem: FC = () => {
  return (
    [{
      url: `/${PARSER_KEY}`,
      caption: PARSER_TITLE,
    }, {
      url: `${SITE_URL}${CMS_URL}`,
      caption: CMS_TITLE,
    }].map(
      (item, index) =>
        <ListItem
          key={index.toString()}
          component={NavLink}
          to={item.url}
          sx={{ py: 0.5, color: 'text.primary' }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
            <ListItemText primary={item.caption} sx={{ mr: 1 }} />
          </Box>
        </ListItem>
    )
  )
};

export default NavParserItem;
