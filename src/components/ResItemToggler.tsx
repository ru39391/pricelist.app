import { FC, ChangeEvent } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface IResItemToggler {
  id: string;
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ResItemToggler: FC<IResItemToggler> = ({
  id,
  label,
  isChecked,
  isDisabled,
  handler
}) => {
  return <FormControlLabel
    label={label}
    sx={{ mb: .25 }}
    control={<Checkbox id={id} checked={isChecked} disabled={isDisabled} onChange={handler} />}
  />
};

export default ResItemToggler;
