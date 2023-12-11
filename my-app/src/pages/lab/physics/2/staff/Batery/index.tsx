import { FC } from "react";
import cn from 'classnames';

import commonClasses from '../staff.module.css'
import classes from './Batery.module.css';


export const Batery: FC = () => {
  return (
    <div className={cn([commonClasses.staff, classes.container])}>
    </div>
  )
}