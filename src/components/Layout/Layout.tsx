"use client";

import { useState } from "react";
import Header from "../Header/Header";
import SideDrawer from "../Header/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

type Props = React.PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const handlerCloseSideDrawer = () => setOpenSideDrawer(false);

  const handlerToggleSideDrawer = () => setOpenSideDrawer((d) => !d);

  return (
    <div className={classes.TopSpacing}>
      <Header handlerToggleSideDrawer={handlerToggleSideDrawer} />
      <SideDrawer show={openSideDrawer} closeHandler={handlerCloseSideDrawer} />
      {children}
    </div>
  );
}
