import { FC } from "react";
import cn from 'classnames';

import commonClasses from '../staff.module.css'
import classes from './Lamp.module.css';


interface LampProps {
  percent?: number;
}

export const Lamp: FC<LampProps> = ({ percent }) => {
  return (
    <div className={cn([commonClasses.staff, classes.container, {
      [classes.containerActive]: percent === 100,
    }])}>
    </div>
  )
}