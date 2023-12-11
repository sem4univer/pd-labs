import { FC } from "react";
import cn from 'classnames';

import KeyImage from '../../images/electric/key1.png'

import commonClasses from '../staff.module.css'
import classes from './KeyPlate.module.css';

interface KeyPlateProps {
  throughable?: boolean;
  onClick?: () => void;
}

export const KeyPlate: FC<KeyPlateProps> = ({ onClick, throughable }) => {
  return (
    <div className={cn([commonClasses.staff, classes.container])} onClick={onClick}>
      <img src={KeyImage} alt="" className={cn([classes.key, {
        [classes.keyActive]: throughable,
      }])} />
    </div>
  )
}