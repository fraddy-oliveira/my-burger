import React from "react";
import classes from "./Button.module.css";

type Props = React.PropsWithChildren<{
  clickHandler?: () => void;
  btnType: string;
}>;

export default function Button(props: Props) {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  );
}
