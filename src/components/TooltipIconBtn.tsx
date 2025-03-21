import { FC, ReactNode } from 'react';
import { NavLink, To } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';

interface ITooltipIconBtn {
  icon: ReactNode;
  title: string;
  url?: string;
  isNavLink?: boolean;
  isIconExist: boolean;
  isTargetBlank?: boolean;
  sx?: Record<string, string | number>;
  onClick?: () => void;
}

const TooltipIconBtn: FC<ITooltipIconBtn> = ({
  icon,
  title,
  url,
  isNavLink,
  isIconExist,
  isTargetBlank,
  sx,
  onClick
}) => {
  return isIconExist && <Tooltip placement="top" title={title}>
      {isNavLink
        ? <IconButton component={NavLink} to={url as To}>{icon}</IconButton>
        : <IconButton
            {...( sx && { sx } )}
            {...( isTargetBlank && { target: '_blank' } )}
            { ...( onClick ? { onClick } : { href: url } ) }
          >
            {icon}
          </IconButton>
      }
    </Tooltip>;
}

export default TooltipIconBtn;
