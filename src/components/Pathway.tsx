import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';

interface IPathway {
  pageTitle: string;
  currNavTitle: string;
}

// TODO: стандартизировать хлебные крошки для всех компонентов
/**
 * Хлебные крошки компонента управления записями xls-файла
 *
 */
const Pathway: FC<IPathway> = ({
  pageTitle,
  currNavTitle
}) => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>{pageTitle}</Typography>
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
          {currNavTitle}
        </Typography>
      </Breadcrumbs>
    </>
  )
};

export default Pathway;
