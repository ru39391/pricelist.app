import { FC } from 'react';
import { Box, Button, DialogContentText } from '@mui/material';
import { ButtonOwnProps } from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Check, Delete } from '@mui/icons-material';

import useModal from '../hooks/useModal';

import { useSelector } from '../services/hooks';

import { PARSER_CONFIRM_MSG, REMOVE_ACTION_KEY } from '../utils/constants';

interface IModalControllers {
  icon?: string;
  color?: string;
  actionBtnCaption: string;
  introText?: string;
  disabled: boolean;
  isParserData?: boolean;
  actionHandler: () => void;
}

const ModalControllers: FC<IModalControllers> = ({
  icon,
  color,
  actionBtnCaption,
  introText,
  disabled,
  isParserData,
  actionHandler
}) => {
  const { isPricelistLoading } = useSelector(state => state.pricelist);

  const { toggleModal } = useModal();

  const btnColor: ButtonOwnProps['color'] = color as ButtonOwnProps['color'] || 'success';

  return (
    <>
      {introText && !isParserData && <DialogContentText sx={{ mb: 4 }}>{introText}.</DialogContentText>}
      {isParserData && <DialogContentText sx={{ mb: 4 }}>{PARSER_CONFIRM_MSG}.</DialogContentText>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LoadingButton
          color={btnColor}
          variant="outlined"
          loadingPosition="start"
          startIcon={(icon && icon === REMOVE_ACTION_KEY && <Delete />) || <Check />}
          loading={isPricelistLoading}
          disabled={disabled}
          onClick={actionHandler}
        >
          {actionBtnCaption}
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={() => toggleModal(null)}
        >
          Отмена
        </Button>
      </Box>
    </>
  )
}

export default ModalControllers;
