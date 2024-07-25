import React from "react";
import Image from "next/image";
import logoImage from "@/assets/images/burger-logo.png";
import classes from "./Logo.module.css";

type Props = React.PropsWithChildren<{
  width?: number;
  height?: number;
}>;

export default function Logo({ width, height }: Props) {
  return (
    <div className={classes.Logo} style={{ width, height }}>
      <Image
        src={logoImage}
        width={width ?? 45}
        height={height ?? 29}
        alt="Burger"
      />
    </div>
  );
}
