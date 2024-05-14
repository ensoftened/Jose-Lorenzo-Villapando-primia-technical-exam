import jwtDecode from "jwt-decode";
import http from "./httpService";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";
import decryptLS from "@utils/decryptLS";

let url = `${process.env.REACT_APP_SERVER_API_URL}`;

const apiEndpoint = url + "user-authentication/";
const localStorageKey = "userInfo";

http.setJwt(getJwt());

export async function login(username: any, password: any) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("LOGGING IN", username, password)
  const { data } = await axios.post(
    `${apiEndpoint}login-user`,
    { username, password },
    // {withCredentials: true}
  );

  //alert("THE JWT" + jwt)

  localStorage.setItem(localStorageKey, data);
}

export async function checkPassword(data: any) {
  return axios.post(`${apiEndpoint}check-password`, data, {
    // withCredentials: true,
  });
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem(localStorageKey, jwt);
}

export function logout() {
  try {
    const response = axios.get(`${apiEndpoint}logout-user`, {
      withCredentials: true,
    });
    localStorage.removeItem(localStorageKey);
  } catch (error) {
    //console.log("LOGOUT ERROR", error);
  }
}

export function getCurrentUserInfoFromLocalStorage() {
  try {
    const encryptedUserInfo: string =
      localStorage.getItem(localStorageKey) || "";

    const userInfo: string = decryptLS(encryptedUserInfo) || "";

   // console.log("MY USER INFO", jwtDecode(userInfo))

    return JSON.parse(JSON.stringify(jwtDecode(userInfo)));
  } catch (ex) {
    console.log("ERROR", ex)
    return null;
  }
}

export function getToken() {
  const jwt: string = localStorage.getItem(localStorageKey) || "";

  return jwt;
}

export function getResponsibilities() {
  try {
    const encryptedUserInfo: string =
      localStorage.getItem(localStorageKey) || "";

    const userInfo: any = JSON.parse(decryptLS(encryptedUserInfo) || "");

    const retrievedRole = userInfo.role;
    
    //console.log("THE RETRIEVED", userInfo)

    let retrievedResponsibilities: string[] = [];
    Object.keys(retrievedRole).map((key) => {
      if (Array.isArray(retrievedRole[key]) == true) {
        retrievedRole[key].forEach((item: string) => {
          retrievedResponsibilities.push(item);
        });
      }
    });

    //////////////////////console.log  ("retrievedResponsibilities", retrievedResponsibilities)

    return retrievedResponsibilities;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(localStorageKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUserInfoFromLocalStorage,
  getJwt,
  getResponsibilities,
};
