import { FC } from 'react';
import { Alert, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';

interface IDataCardAlert {
  sx?: Record<string, number>;
  message?: string;
}

interface IDataCardRow {
  caption: string;
  value?: string;
  currValue?: string;
  isAlertVisible: boolean;
  complexValues?: string[];
  currComplexValues?: string[];
}

const DataCardAlert: FC<IDataCardAlert> = ({
  sx,
  message
}) => {
  return (
    message && <Alert icon={<Check fontSize="inherit" />} severity="success" sx={{ mt: 1, ...( sx && {...sx} ) }}>Значение на сайте: {message}</Alert>
  )
}

const DataCardRow: FC<IDataCardRow> = ({
  caption,
  value,
  currValue,
  isAlertVisible,
  complexValues,
  currComplexValues
}) => {
  return (
    <>
      <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{caption}</Typography>
      {complexValues
        ? <>
            {complexValues.map((item, index) => <Typography key={index} variant="body2" sx={{ mb: .05, color: 'text.secondary' }}>{item}</Typography>)}
            {isAlertVisible
              ? <DataCardAlert sx={{ mb: 1.5 }} message={currValue} />
              : currComplexValues && currComplexValues.map((item, index) => <DataCardAlert key={index} message={item} />)
            }
          </>
        : <Typography variant="body2" component="div" sx={{ mb: 1.5, color: 'text.secondary' }}>
            {value}
            {isAlertVisible && <DataCardAlert message={currValue} />}
          </Typography>
      }
    </>
  )
}

export default DataCardRow;
