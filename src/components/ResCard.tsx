import { FC } from 'react';
import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import {
  Edit,
  RemoveRedEye,
  Settings
} from '@mui/icons-material';

import TooltipIconBtn from './TooltipIconBtn';

import {
  TITLES,
  NAME_KEY,
  RES_ID_KEY,
  RES_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  SITE_URL,
  EDIT_RESOURCE,
  VIEW_RESOURCE
} from '../utils/constants';

import type { TLinkedResourceData } from '../types';

interface IResCard {
  item: TLinkedResourceData;
}

const ResCard: FC<IResCard> = ({ item }) => {
  return (
    <Card
      variant="outlined"
      {...(
        item.isLinked && { sx: { borderColor: '#fff', boxShadow: '0 15px 15px 0 rgba(0,0,0,0.19)' } }
      )}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{item[PARENT_KEY][NAME_KEY]}, id: {item[PARENT_KEY][`${PARENT_KEY}_${RES_ID_KEY}`].toString()}</Typography>
        <Typography variant="h5" component="div">{item[NAME_KEY]}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item[TEMPLATE_KEY][NAME_KEY]}</Typography>
        <Typography variant="body2">
          {TITLES[IS_PARENT_KEY]}: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item[IS_PARENT_KEY] ? 'Да' : 'Нет'}</Typography><br />
          Опубликовано: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.publishedon.date}</Typography><br />
          Изменено: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.editedon.date}</Typography>
        </Typography>
      </CardContent>
      <CardActions>
      <ButtonGroup aria-label="outlined primary button group">
        {[{
          icon: <RemoveRedEye />,
          title: VIEW_RESOURCE,
          url: `${SITE_URL}${item.uri}`,
          isTargetBlank: true
        }, {
          icon: <Settings />,
          title: 'Изменить список услуг',
          url: `/${RES_KEY}/${item[RES_ID_KEY].toString()}`,
          isNavLink: true
        }, {
          icon: <Edit />,
          title: EDIT_RESOURCE,
          url: `${SITE_URL}manager/?a=resource/update&id=${item[RES_ID_KEY].toString()}`,
          isTargetBlank: true
        }].map((props, index) => <TooltipIconBtn key={index.toString()} isIconExist={true} {...props} />)}
      </ButtonGroup>
      </CardActions>
    </Card>
  )
};

export default ResCard;
