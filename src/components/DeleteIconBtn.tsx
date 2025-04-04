import { FC } from 'react';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

import type { TFormData, TItemData, TUrlData, TPricelistTypes } from '../types';

import { EDIT_ACTION_KEY, PARSER_KEY } from '../utils/constants';

interface IDeleteIconBtn {
  formData: TFormData | null;
  urlData: TUrlData;
  openModal: (payload: { data: TItemData; type: TPricelistTypes; isParserData: boolean; }) => Promise<void>;
}

const DeleteIconBtn: FC<IDeleteIconBtn> = ({ formData, urlData, openModal }) => {
  const isParserData = urlData.type === PARSER_KEY;
  const isIconVisible = () => {
    if(!formData) {
      return Boolean(formData);
    }

    const { action, type } = formData;

    return isParserData || (action === EDIT_ACTION_KEY && type !== urlData.type)
  };
  const openConfirmModal = () => {
    if(!formData) {
      return;
    }

    const { data, type } = formData;

    openModal({ data, type, isParserData });
  };

  if(!isIconVisible()) {
    return '';
  }

  return (
    <IconButton
      sx={{ p: 1, color: 'red' }}
      onClick={openConfirmModal}
    >
      <DeleteOutlined fontSize="medium" />
    </IconButton>
  )
}

export default DeleteIconBtn;
