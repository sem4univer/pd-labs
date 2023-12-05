import { FC, PropsWithChildren } from "react";

import classes from "./Container.module.css";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes["container"]}>{children}</div>;
};
