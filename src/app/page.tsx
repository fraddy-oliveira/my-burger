"use client";

import { useState } from "react";
import Header from "@app/components/Header/Header";
import Footer from "@app/components/Footer/Footer";
import SideDrawer from "@app/components/Header/SideDrawer/SideDrawer";

export default function Home() {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const handlerCloseSideDrawer = () => setOpenSideDrawer(false);

  const handlerToggleSideDrawer = () => setOpenSideDrawer((d) => !d);

  return (
    <>
      <Header handlerToggleSideDrawer={handlerToggleSideDrawer} />
      <SideDrawer show={openSideDrawer} closeHandler={handlerCloseSideDrawer} />
      Content
      <br />
      <Footer />
    </>
  );
}
