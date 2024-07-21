"use client";

import Logo from "../UI/Logo/Logo";
import DrawerToggle from "./DrawerToggle/DrawerToggle";
import classes from "./Header.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import { useAuthStore } from "@/providers/auth-store-provider";

type Props = React.PropsWithChildren<{
  handlerToggleSideDrawer: () => void;
}>;

export default function Header({ handlerToggleSideDrawer }: Props) {
  const { isAuthenticated } = useAuthStore(({ isAuthenticated }) => ({
    isAuthenticated,
  }));

  return (
    <header className={`${classes.Header} section-bg-color`}>
      <DrawerToggle clickHandler={handlerToggleSideDrawer} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated()} />
      </nav>
    </header>
  );
}
