import React from "react";
import Backdrop from "@/components/UI/Backdrop/Backdrop";
import Logo from "@/components/UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import { useAuthStore } from "@/providers/auth-store-provider";

type Props = React.PropsWithChildren<{
  show: boolean;
  closeHandler: () => void;
}>;

export default function SideDrawer(props: Props) {
  let sideDrawerClasses = [classes.SideDrawer];

  const { isAuthenticated } = useAuthStore(({ isAuthenticated }) => ({
    isAuthenticated,
  }));

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
          <NavigationItems isAuthenticated={isAuthenticated()} />
        </nav>
      </div>
    </>
  );
}
