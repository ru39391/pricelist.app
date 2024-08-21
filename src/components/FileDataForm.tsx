import { FC, useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

import ModalFooter from './ModalFooter';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  ADD_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE,
} from '../utils/constants';

interface IFileDataForm {
  action: string;
  counter: number;
  actionHandler: () => void
}

const FileDataForm: FC<IFileDataForm> = ({
  action,
  counter,
  actionHandler
}) => {
  const [confirmationModalContent, setConfirmationModalContent] = useState<TCustomData<string> | null>();
  const {
    form: { formTitle },
    pricelist: { alertMsg }
  } = useSelector(state => ({
    form: state.form,
    pricelist: state.pricelist
  }));

  const keys = {
    [CREATED_KEY]: ADD_TITLE,
    [UPDATED_KEY]: EDIT_TITLE,
    [REMOVED_KEY]: REMOVE_TITLE
  };

  useEffect(() => {
    setConfirmationModalContent({
      caption: keys[action],
      desc: `Вы собираетесь ${formTitle.toLowerCase()}. Общее количество обновляемых записей: ${counter}. Подтвердите выполнение действия`
    });
  }, [
    action,
    counter,
    formTitle
  ]);

  useEffect(() => {
    if(alertMsg) {
      setConfirmationModalContent(null);
    }
  }, [
    alertMsg
  ]);

  return (
    <List>
      <ListItem>
        <ListItemText primary="Имя" secondary="ex72, Перья птиц: попугайчика волнистого, (e78,  Melopsittacus undulatus),  канарейки домашней (e201, Serinus canarius),   попугайчика длиннохвостого (e196), попугая (e213, Ara spp.), вьюрков (e214, Lonchura domestrica). Ig E,  ImmunoCAP® (Phadia AB), био" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Цена" secondary="1250" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Отделение" secondary="Медицина" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Специализация" secondary="Лабораторная диагностика CMD" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Группа" secondary="Скрининг аллергенов животных и домашней пыли. Ig E, ImmunoCAP® (Phadia АВ)." />
      </ListItem>
    </List>
  );

  return (
    confirmationModalContent
    ? <ModalFooter
        disabled={false}
        icon={action === REMOVED_KEY ? <Delete /> : <Check />}
        color={action === REMOVED_KEY ? 'error' : 'success'}
        actionBtnCaption={confirmationModalContent.caption}
        introText={confirmationModalContent.desc}
        actionHandler={actionHandler}
      />
    : ''
  );
}

export default FileDataForm;
