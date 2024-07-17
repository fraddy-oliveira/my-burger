import React from "react";
import Link from "next/link";
import classes from "./NavigationItem.module.css";

type Props = React.PropsWithChildren<{ link: string }>;

export default function NavigationItem(props: Props) {
  return (
    <li className={classes.NavigationItem}>
      <Link href={props.link}>{props.children}</Link>
    </li>
  );
}
