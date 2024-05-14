import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "@App";

export const ProtectedRoute = ({
  redirectPath,
  responsibilities,
  children,
}: any) => {
  const currentUser: any = useContext(UserContext);

  //console.log("CURRENT USER", currentUser)

  //////////////////////////////////////////////////////////////console.log  ("THE CURRENT USER", currentUser)
  //////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("responsibilities", responsibilities)

  if (!currentUser || currentUser == null) {
    return <Navigate to={redirectPath} replace />;
  }
  // const retrievedRole = currentUser.role;

  // ////////////////////////////////////////console.log("RETRIEVED ROLE", retrievedRole)

  // let retrievedResponsibilities: any = [];
  // Object.keys(retrievedRole).map((key) => {
  //   ////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("KEY", key)
  //   if (Array.isArray(retrievedRole[key]) == true) {
  //     retrievedRole[key].forEach((item: string) => {
  //       retrievedResponsibilities.push(item);
  //     });
  //   }
  // });

  // //////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)
  // //////////////////console.log("responsibilities", responsibilities)

  // if (
  //   !currentUser ||
  //   currentUser == null ||
  //   (responsibilities &&
  //     responsibilities.every((r: any) => retrievedResponsibilities.includes(r)) ==
  //       false)
  // ) {
  //   //////////////////console.log("LELE")
  //   return <Navigate to={redirectPath} replace />;
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  return children;
};
