// MyContextProvider.js
import authService from "@services/authService";
import { getSingleUser } from "@services/userService";
import React, { useState, createContext, useEffect } from "react";

export const CurrentUserInfoContext = createContext<any>({});

const CurrentUserInfoProvider = ({ children }: any) => {
  const currentUser: any = authService.getCurrentUserInfoFromLocalStorage();
  const [currentUserInfo, setCurrentUserInfo] = useState<any>(null);

  useEffect(() => {
    const getInfo = async () => {
        const retrievedUser = await getSingleUser(currentUser.username)

        if(retrievedUser) updateUserInfo(retrievedUser.data.user)
    };

    getInfo();
  }, []);

  const updateUserInfo = (newUserInfo: any) => {
    ////////console.log("newUserInfo", newUserInfo)
    setCurrentUserInfo(newUserInfo);
  };

  return (
    <CurrentUserInfoContext.Provider value={{ currentUserInfo, updateUserInfo }}>
      {children}
    </CurrentUserInfoContext.Provider>
  );
};

export default CurrentUserInfoProvider;
