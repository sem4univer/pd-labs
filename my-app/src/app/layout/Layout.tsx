import { FC } from "react";
import { Outlet } from "react-router-dom";

import classes from "./Layout.module.css";

export const Layout: FC = () => {
  return (
    <div className={classes["body"]}>
      <div className={classes["bodyCard"]}>
        {/* <header className={classes["header"]}>header</header> */}
        <main className={classes["main"]}>
          <Outlet />
        </main>
        <footer className={classes["footer"]}>Московский политех 2023</footer>
      </div>
    </div>
  );
};
