import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

import Preloader from './Preloader';
import AlertError from './AlertError';
import Modal from './Modal';
import DataForm from './DataForm';
import DataCard from './DataCard';

import { useSelector } from '../services/hooks';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const { formData } = useSelector(state => state.form);

  return (
    <>
      <Preloader />
      <AlertError />
      <Grid
        container
        sx={{
          px: 2,
          py: 3,
          height: '100%',
          minHeight: '100vh',
          bgcolor: '#F4F5FA'
        }}
      >
        {children}
      </Grid>
      {formData ? <Modal {...({ fc: formData.isFormHidden ? DataCard : DataForm })} /> : <Modal />}
    </>
  )
};

export default Layout;
