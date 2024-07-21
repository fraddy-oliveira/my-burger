import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useAuthStore } from "@/providers/auth-store-provider";

type Props = React.PropsWithChildren<{
  isAuthenticated: boolean;
}>;

export default function NavigationItems(props: Props) {
  const { logout } = useAuthStore(({ logout }) => ({
    logout,
  }));

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger builder</NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Auth</NavigationItem>
      ) : (
        <NavigationItem link="" clickHandler={logout}>
          Logout
        </NavigationItem>
      )}
    </ul>
  );
}
