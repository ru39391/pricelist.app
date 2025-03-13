import { FC, ChangeEvent } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface ICheckboxController {
  id: string;
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxController: FC<ICheckboxController> = ({
  id,
  label,
  isChecked,
  isDisabled,
  handleChange
}) => {
  return <FormControlLabel
    label={label}
    sx={{ mb: .25 }}
    control={<Checkbox id={id} checked={isChecked} disabled={isDisabled} onChange={handleChange} />}
  />
};

export default CheckboxController;
