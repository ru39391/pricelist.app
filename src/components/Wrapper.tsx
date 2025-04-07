import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

import Layout from './Layout';
import Header from './Header';
import Nav from './Nav';

interface IWrapper {
  children: ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => {
  return (
    <Layout>
      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}><Nav /></Grid>
      <Grid item xs={9} sx={{ pl: 3, pr: 2, display: 'flex', flexDirection: 'column' }}>
        <Header />
        {children}
      </Grid>
    </Layout>
  )
};

export default Wrapper;
