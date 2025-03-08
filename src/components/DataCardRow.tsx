import { FC } from 'react';
import { Alert, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';

interface IDataCardRow {
  caption: string;
  value: string;
  currentValue?: string;
  isAlertVisible: boolean;
}

const DataCardRow: FC<IDataCardRow> = ({
  caption,
  value,
  currentValue,
  isAlertVisible
}) => {
  return (
    <>
      <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{caption}</Typography>
      <Typography variant="body2" component="div" sx={{ mb: 1.5, color: 'text.secondary' }}>
        {value}
        {isAlertVisible && <Alert icon={<Check fontSize="inherit" />} severity="success">Значение на сайте: {currentValue}</Alert>}
      </Typography>
    </>
  )
}

export default DataCardRow;
