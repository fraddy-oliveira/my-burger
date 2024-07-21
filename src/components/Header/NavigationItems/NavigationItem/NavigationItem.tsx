import React from "react";
import Link from "next/link";
import classes from "./NavigationItem.module.css";

type Props = React.PropsWithChildren<{
  link: string;
  clickHandler?: () => void;
}>;

export default function NavigationItem(props: Props) {
  return (
    <li className={classes.NavigationItem}>
      {props.clickHandler ? (
        <a onClick={props.clickHandler}>{props.children}</a>
      ) : (
        <Link href={props.link}>{props.children}</Link>
      )}
    </li>
  );
}
