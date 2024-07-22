import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useRouter } from "next/navigation";

type Props = React.PropsWithChildren<{
  isAuthenticated: boolean;
}>;

export default function NavigationItems({ isAuthenticated }: Props) {
  const router = useRouter();

  const { logout } = useAuthStore(({ logout }) => ({
    logout,
  }));

  const handlerLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger builder</NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!isAuthenticated ? (
        <NavigationItem link="/auth">Auth</NavigationItem>
      ) : (
        <NavigationItem link="" clickHandler={handlerLogout}>
          Logout
        </NavigationItem>
      )}
    </ul>
  );
}
