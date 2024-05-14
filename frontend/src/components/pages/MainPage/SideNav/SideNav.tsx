import { DeviceContext } from "@App";
import React, { useEffect, useContext, useMemo, useCallback } from "react";
import logo from "@static-images/logo.png";
import NavItem from "@common/NavItem/NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { useMatch } from "react-router";
import { theme } from "@style-helpers/theme";
import sideNavSchema from "@nav-schemas/sideNavSchema";
import NavList from "@common/NavList/NavList";
import { Div } from "@common/Div/Div";
type SideNavProps = {};

const SideNav = (props: SideNavProps) => {
  const device = useContext(DeviceContext);
  ////////////////////////////////////console.log("SideNav RENDERED")

  useEffect(() => {}, []);

  return (
    <Div
      style={{
        zIndex: 2,
        position: "fixed",
        top: 0,

        left: 0,
        height: "100%",
        width: "260px",
        backgroundColor: theme.primary.darkest,
      }}
    >
      <Div style={{ height: "60px", position: "relative" }}>
        <Div
          style={{
            height: "inherit",
            width: "100%",
            padding: "20px",
            fontSize: "20px",
            color: "white",
            fontFamily: "Helvetica Neue"
          }}
        >
          HR HIRING MODULE
        </Div>
      </Div>

      <Div
        style={{
          position: "absolute",
          top: "50px",
          width: "100%",
          padding: "20px 0",
          zIndex: 3,
        }}
      >
        <NavList navSchema={sideNavSchema} />
      </Div>
    </Div>
  );
};

export default SideNav;
