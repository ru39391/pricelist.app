import { FC } from 'react';
import {
  Badge,
  Box,
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

import { CAPTIONS } from '../utils/constants';

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
        }) => <ListItemButton
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
    </>
  );
};

export default ParserSidebar;
