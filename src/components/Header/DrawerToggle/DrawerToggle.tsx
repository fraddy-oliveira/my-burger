import React from "react";
import classes from "./DrawerToggle.module.css";

type Props = React.PropsWithChildren<{
  clickHandler: () => void;
}>;

export default function DrawerToggle(props: Props) {
  return (
    <div className={classes.DrawerToggle} onClick={props.clickHandler}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
