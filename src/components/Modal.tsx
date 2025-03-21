import {
  FC,
  forwardRef,
  FunctionComponent
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

import DeleteIconBtn from './DeleteIconBtn';
import ModalControllers from './ModalControllers';

import useModal from '../hooks/useModal';
import useUrlHandler from '../hooks/useUrlHandler';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import type { TItemData, TPricelistTypes } from '../types';

import {
  NAME_KEY,
  REMOVE_ACTION_KEY,
  REMOVE_TITLE,
  REMOVE_CONFIRM_MSG
} from '../utils/constants';

interface IModal {
  fc?: FunctionComponent;
  payload?: {};
}

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FC<IModal> = ({ fc, payload }) => {
  const dispatch = useDispatch();
  const {
    isVisible,
    formData,
    formTitle,
    formDesc,
    isParserData,
    formController
  } = useSelector(state => state.form);

  const { currUrlData } = useUrlHandler();
  const { modalContent, toggleModal } = useModal({ fc, payload });

  const closeModal = (): Promise<{ isSucceed: boolean; }> => {
    const isSucceed = false;

    toggleModal(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ isSucceed: !isSucceed });
      }, 200);
    });
  }

  const openConfirmModal = async (payload: { data: TItemData; type: TPricelistTypes; isParserData: boolean; } | null) => {
    if(!payload) {
      return;
    }

    const { data, type, isParserData } = payload;

    try {
      const { isSucceed } = await closeModal();

      if(isSucceed) {
        dispatch(setFormData({
          data: {
            action: REMOVE_ACTION_KEY,
            type,
            data
          }
        }));

        toggleModal({
          title: `${REMOVE_TITLE} ${data[NAME_KEY] && (`«${data[NAME_KEY]}»`)}`,
          desc: isParserData ? '' : `${REMOVE_CONFIRM_MSG} ${REMOVE_TITLE.toLocaleLowerCase()} ${data[NAME_KEY] && (`«${data[NAME_KEY]}»`)}?`,
          isParserData
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog
      open={isVisible}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => toggleModal(null)}
      //@ts-expect-error
      TransitionComponent={Transition}
      keepMounted
    >
      {formTitle &&
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <span>
            {formTitle}
            {!isParserData && <DeleteIconBtn formData={formData} urlData={currUrlData} openModal={openConfirmModal} />}
          </span>
          <IconButton
            sx={{
              p: 1,
              color: 'text.secondary'
            }}
            size="small"
            aria-label="close"
            onClick={() => toggleModal(null)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      }
      <DialogContent>
        {formDesc && <DialogContentText>{formDesc}</DialogContentText>}
        {modalContent}
        {formController && <ModalControllers {...formController} />}
      </DialogContent>
    </Dialog>
  )
}

export default Modal;
