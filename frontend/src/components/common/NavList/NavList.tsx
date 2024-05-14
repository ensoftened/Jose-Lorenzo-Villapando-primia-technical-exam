import { DeviceContext } from "@App";
import NavItem from "@common/NavItem/NavItem";
import authService from "@services/authService";
import React, { useEffect, useContext, useMemo, useCallback } from "react";
import { SUl } from "./NavList.style";

type NavListProps = {
  navSchema: any;
};

const NavList = (props: NavListProps) => {
  const device = useContext(DeviceContext);

  const { navSchema } = props;
  const retrievedResponsibilities: any = authService.getResponsibilities();

  //////////////////console.log("NavList RENDERED")

  useEffect(() => {}, []);

  const parentNavLink = (item: any) => {
    ////////////////console.log("ITEM", item)
    return (
      <NavItem linkLabel={item.linkLabel} key={item.key} icon={item.icon}>
        {Object.keys(item.children).map((childNavLink, index) => {
          if (
            item.children[childNavLink].responsibilities &&
            item.children[childNavLink].responsibilities.every((r: any) =>
              retrievedResponsibilities.includes(r)
            ) == true
          ) {
            //////////////////////////////////////////////////////////////////////////console.log  ("NAVLINK", navSchema[item].children[childNavLink].linkLabel )
            if (!item.children[childNavLink].children) {
              return (
                <NavItem
                  linkLabel={item.children[childNavLink].linkLabel}
                  key={item.children[childNavLink].key}
                  icon={item.children[childNavLink].icon}
                  to={item.children[childNavLink].to}
                />
              );
            } else {
              return parentNavLink(item.children[childNavLink]);
            }
          } else {
            return;
          }
        })}
      </NavItem>
    );
  };

  return (
    <SUl>
      {Object.keys(navSchema).map((item: any, index: number) => {
        if (
          navSchema[item].responsibilities &&
          navSchema[item].responsibilities.every((r: any) =>
            retrievedResponsibilities.includes(r)
          ) == true
        ) {
          const navLink = !navSchema[item].children /* If no children */ ? (
            <NavItem
              linkLabel={navSchema[item].linkLabel}
              key={navSchema[item].key}
              icon={navSchema[item].icon}
              to={navSchema[item].to}
            />
          ) : (
            parentNavLink(navSchema[item])
          );
          return navLink;
        }
      })}
    </SUl>
  );
};

export default NavList;
