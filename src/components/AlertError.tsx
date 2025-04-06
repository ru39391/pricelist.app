import { FC } from 'react';
import {
  IconButton,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert';

import { useSelector, useDispatch } from '../services/hooks';
import { resetPricelist } from '../services/slices/pricelist-slice';

const AlertError: FC = () => {
  const dispatch = useDispatch();
  const {
    fileAlertMsg,
    pricelistAlertType,
    pricelistAlertMsg
  } = useSelector(({ file, pricelist }) => ({
    fileAlertMsg: file.errorMsg,
    pricelistAlertType: pricelist.alertType,
    pricelistAlertMsg: pricelist.alertMsg
  }));
  const alertType: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> = pricelistAlertType as OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  const alertMsg = fileAlertMsg || pricelistAlertMsg;

  const closeAlert = () => {
    [
      resetPricelist()
    ].forEach((action) => dispatch(action));
  }

  return (
    alertMsg && <Snackbar
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open
      autoHideDuration={4000}
      message={alertMsg}
      onClose={closeAlert}
      key={alertType || 'info'}
    >
      <Alert
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
        severity={alertType || 'info'}
        variant={alertType ? 'filled' : 'standard'}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ mr: 3 }}>{alertMsg}</Box>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeAlert}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Alert>
    </Snackbar>
  )
};

export default AlertError;
