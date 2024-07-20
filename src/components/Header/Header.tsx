import Logo from "../UI/Logo/Logo";
import DrawerToggle from "./DrawerToggle/DrawerToggle";
import classes from "./Header.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";

type Props = React.PropsWithChildren<{
  handlerToggleSideDrawer: () => void;
}>;

export default function Header({ handlerToggleSideDrawer }: Props) {
  return (
    <header className={`${classes.Header} section-bg-color`}>
      <DrawerToggle clickHandler={handlerToggleSideDrawer} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        {/* TODO: fetch isAuthenticated from root state */}
        <NavigationItems isAuthenticated={false} />
      </nav>
    </header>
  );
}
