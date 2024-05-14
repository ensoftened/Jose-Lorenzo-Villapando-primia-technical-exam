import { DeviceContext } from "@App";
import Accordion from "@common/Accordion/Accordion";

import React, { useEffect, useContext, useMemo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import Output from "./Output/Output";
import TopNav from "./TopNav/TopNav";
import { theme } from "@style-helpers/theme";
import { Div } from "@common/Div/Div";
import useTokenRefresh from "@hooks/useTokenRefresh";
import useTokenExpirationCheck from "@hooks/useTokenExpirationCheck";

type MainPageProps = {};

const MainPage = (props: MainPageProps) => {
  const device = useContext(DeviceContext);
  ////////////////////////////////////console.log("MainPage RENDERED")
  // useTokenRefresh();
  // useTokenExpirationCheck();

  useEffect(() => {}, []);

  return (
    <Div
      style={{
        backgroundColor: theme.neutral.lightest,
        minHeight: "100vh",
        maxHeight: "auto",
      }}
    >
      <SideNav />

      <TopNav />

      <Output />
    </Div>
  );
};

export default MainPage;
