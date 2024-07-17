import React from "react";
import classes from "./Backdrop.module.css";

type Props = React.PropsWithChildren<{
  show: boolean;
  closeHandler: () => void;
}>;

export default function Backdrop(props: Props) {
  return (
    <>
      {props.show && (
        <div className={classes.Backdrop} onClick={props.closeHandler}></div>
      )}
    </>
  );
}
