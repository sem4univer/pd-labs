import { FC } from "react";
import cn from 'classnames';

import commonClasses from '../staff.module.css'
import classes from './Ampermetr.module.css';


interface AmpermetsProps {
  currentStrength?: number;
}

export const Ampermetr: FC<AmpermetsProps> = ({ currentStrength }) => {
  return (
    <div className={cn([commonClasses.staff, classes.container])}>
      <span className={classes.title}>Ma</span>
      <span className={classes.text}>{currentStrength}</span>
    </div>
  )
}