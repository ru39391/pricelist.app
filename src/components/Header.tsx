import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Link,
  Typography,
  Breadcrumbs
} from '@mui/material';
import { Add, Edit, EditOutlined, RemoveRedEye } from '@mui/icons-material';

import TooltipIconBtn from './TooltipIconBtn';

import useModal from '../hooks/useModal';
import useCurrentData from '../hooks/useCurrentData';

import { useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import {
  RES_KEY,
  EDIT_TITLE,
  EDIT_ITEM_TITLE,
  ADD_CATEGORY_TITLE,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  EDIT_RESOURCE,
  VIEW_RESOURCE,
  SITE_URL
} from '../utils/constants';
import { TItemData, TPricelistTypes, TActionKeys } from '../types';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { toggleModal } = useModal();
  const {
    pageTitle,
    currentCategory,
    currentFormData,
    setCurrentFormValues
  } = useCurrentData();
  const title = pageTitle || currentFormData.caption as string;

  const dispatchFormData = (action: TActionKeys) => {
    const { type } = currentFormData;

    dispatch(setFormData({
      data: {
        action,
        type: type as TPricelistTypes,
        data: action === ADD_ACTION_KEY ? setCurrentFormValues(type as string) : currentCategory as TItemData
      }
    }));
  }

  const addCategory = () => {
    toggleModal({ title: `${currentFormData.caption}, ${ADD_CATEGORY_TITLE.toLocaleLowerCase()}` });
    dispatchFormData(ADD_ACTION_KEY);
  }

  const editCategory = () => {
    toggleModal({ title: `${EDIT_TITLE} ${pageTitle && (`«${pageTitle}»`)}` });
    dispatchFormData(EDIT_ACTION_KEY);
  }

  return (
    title && <>
      <Box
        sx={{
          mb: 1,
          gap: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {currentFormData.type === RES_KEY
          ? [{
              icon: <RemoveRedEye />,
              title: VIEW_RESOURCE,
              url: `${SITE_URL}${currentCategory.uri}`,
              isTargetBlank: true
            }, {
              icon: <Edit />,
              title: EDIT_RESOURCE,
              url: `${SITE_URL}manager/?a=resource/update&id=${currentCategory.id.toString()}`,
              isTargetBlank: true
            }].map((props, index) => <TooltipIconBtn key={index.toString()} isIconExist={Boolean(currentFormData.id)} {...props} />)
          : [{
              sx: { p: 1, color: 'text.secondary' },
              icon: <EditOutlined fontSize="medium" />,
              title: EDIT_ITEM_TITLE,
              onClick: editCategory
            }, {
              sx: { p: 0, color: 'text.secondary' },
              icon: <Add fontSize="large" />,
              title: ADD_CATEGORY_TITLE,
              onClick: addCategory
            }].map((props, index) => <TooltipIconBtn key={index.toString()} isIconExist={Boolean(currentFormData.id)} {...props} />)
        }
      </Box>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 4, typography: 'subtitle2' }}
      >
        <Link
          component={NavLink}
          to="/"
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Главная
        </Link>
        {currentFormData.type !== RES_KEY && <Link
          component={NavLink}
          to={`/${currentFormData.type}`}
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          >
            {currentFormData.caption as string}
        </Link>}
        {pageTitle && <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {pageTitle}
        </Typography>}
      </Breadcrumbs>
    </>
  )
};

export default Header;
