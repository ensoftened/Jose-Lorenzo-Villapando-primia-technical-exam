import { DeviceContext } from "@App";
import { theme } from "@style-helpers/theme";
import React, { useEffect, useContext, useMemo, useCallback } from "react";
import { Div } from "@common/Div/Div";
import authService from "@services/authService";
import Avatar from "@common/Avatar/Avatar";
import H6 from "@common/Headings/H6";
import IconButton from "@common/IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowDownAZ,
  faChevronDown,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { CurrentUserInfoContext } from "@contexts/CurrentUserInfoProvider";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";
import isObjectEmpty from "@utils/isObjectEmpty";
import Menu, { MenuHead, MenuItem, MenuItemList } from "@common/Menu/Menu";
import Span from "@common/Span/Span";
import { NavLink, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";

type TopNavProps = {};
const SERVER_URL = process.env.SERVER_URL
const TopNav = (props: TopNavProps) => {
  const device = useContext(DeviceContext);

  const currentUser: any = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  ////console.log("THE CURRENT", currentUser);
  const handleProfileButtonClick = () => {
    navigate("/user-profile/" + currentUser.username);
  };
  const handleAccountSettingsButtonClick = () => {
    navigate("/account-settings");
  };

  const handleLogoutButtonClick = () => {
    authService.logout();
    navigate("/login");
  };
  useEffect(() => {}, []);

  return (
    <>
      <Div
        style={{
          height: "60px",
          width: "auto",
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          marginLeft: "260px",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          padding: "0 20px",
          boxShadow: "0px 0px 6px -2px rgba(0,0,0,0.4)",
        }}
      >

      </Div>
    </>
  );
};

export default TopNav;
