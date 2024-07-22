"use client";

import Logo from "../UI/Logo/Logo";
import DrawerToggle from "./DrawerToggle/DrawerToggle";
import classes from "./Header.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import { useAuthStore } from "@/providers/auth-store-provider";
import { isAuthenticated } from "@/utils/auth-helper";

type Props = React.PropsWithChildren<{
  handlerToggleSideDrawer: () => void;
}>;

export default function Header({ handlerToggleSideDrawer }: Props) {
  const { token } = useAuthStore(({ token }) => ({
    token,
  }));

  return (
    <header className={`${classes.Header} section-bg-color`}>
      <DrawerToggle clickHandler={handlerToggleSideDrawer} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated(token)} />
      </nav>
    </header>
  );
}
