import React from "react";
import Backdrop from "@app/components/UI/Backdrop/Backdrop";
import Logo from "@app/components/UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

type Props = React.PropsWithChildren<{
  show: boolean;
  closeHandler: () => void;
}>;

export default function SideDrawer(props: Props) {
  let sideDrawerClasses = [classes.SideDrawer];

  if (props.show) {
    sideDrawerClasses.push(classes.Open);
  } else {
    sideDrawerClasses.push(classes.Close);
  }

  return (
    <>
      <Backdrop show={props.show} closeHandler={props.closeHandler} />
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo width={72} />
        </div>
        <nav>
          {/* TODO: fetch isAuthenticated from root state */}
          <NavigationItems isAuthenticated={false} />
        </nav>
      </div>
    </>
  );
}
