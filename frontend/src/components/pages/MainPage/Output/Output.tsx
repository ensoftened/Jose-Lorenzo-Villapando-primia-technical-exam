import { DeviceContext } from "@App";
import React, { useEffect, useContext, useMemo, useCallback } from "react";
import { Route, Routes } from "react-router";

import Error404Page from "./Error404Page/Error404Page";
import { ProtectedRoute } from "@common/ProtectedRoute/ProtectedRoute";
import { Div } from "@common/Div/Div";

import ManagePositions from "./ManagePositions/ManagePositions";
import PositionProfile from "./PositionProfile/PositionProfile";
import SystemUsers from "./SystemUsers/SystemUsers";

type OutputProps = {};

const Output = (props: OutputProps) => {
  const device = useContext(DeviceContext);
  ////////////////////////////////////console.log("Output RENDERED")

  useEffect(() => {}, []);

  return (
    <Div
      style={{
        margin: "90px 30px 30px 290px",

        minHeight: "calc(100vh - 110px)",
      }}
    >
      <Routes>
        <Route path="/" element={<></>} />
        <Route path={"/manage-positions"} element={<ManagePositions />} />
        <Route path={"/position/*"} element={<PositionProfile />} />
        <Route path={"/system-users/*"} element={<SystemUsers />} />

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Div>
  );
};

export default Output;
