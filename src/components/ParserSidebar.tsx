import { FC } from 'react';
import {
  Badge,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

import type {
  TComparedItems,
  TFileDataNav,
  TFileCategoryData,
  THandledItemKeys,
  TPricelistTypes
} from '../types';

import {
  CAPTIONS,
  ITEM_KEY,
  NO_GROUP_TITLE,
  TYPES,
  UPDATED_KEY
} from '../utils/constants';

interface IParserSidebar {
  isSidebarVisible: boolean;
  navData: TFileDataNav;
  subNavData: TComparedItems;
  currCategory: THandledItemKeys;
  currSubCategory: TPricelistTypes;
  handleClick: (data: TFileCategoryData) => void;
}

const ParserSidebar: FC<IParserSidebar> = ({
  isSidebarVisible,
  navData,
  subNavData,
  currCategory,
  currSubCategory,
  handleClick
}) => {
  const navItems = [navData[0], navData[navData.length - 1], navData[1]].map((item) => {
    const { key, counter } = item.data[item.data.length - 1];

    return {
      ...item,
      counter,
      data: {
        category: item.key as THandledItemKeys,
        subCategory: key as TPricelistTypes
      }
    };
  });

  if(!isSidebarVisible) {
    return '';
  }

  return (
    <>
      {navItems.map(
        ({
          key,
          caption,
          counter,
          data
        }) =>
        <ListItemButton
          key={key}
          selected={data.category === currCategory && data.subCategory === currSubCategory}
          sx={{ py: 0.5 }}
          onClick={() => handleClick(data)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
            <ListItemText primary={caption} sx={{ mr: 3 }} />
            <Badge badgeContent={counter} color="primary" />
          </Box>
        </ListItemButton>
      )}
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(subNavData).map(
            ([key, arr]) =>
            <ListItemButton
              key={key}
              selected={false}
              sx={{ pl: 6, color: 'grey.600', fontSize: 14 }}
              onClick={() => handleClick({ category: UPDATED_KEY, subCategory: TYPES[ITEM_KEY], arr })}
            >
              <ListItemText
                disableTypography
                primary={CAPTIONS[key] || NO_GROUP_TITLE}
                sx={{ m: 0, mr: 2, flexGrow: 0 }}
              />
              <Badge badgeContent={arr.length} color="default" showZero />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    </>
  );
};

export default ParserSidebar;
