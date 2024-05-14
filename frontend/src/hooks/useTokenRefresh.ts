// useTokenExpirationCheck.js
import { useEffect } from "react";
import authService, { getJwt, getToken, logout } from "@services/authService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import axios from "axios";
import httpService from "@services/httpService";

const useTokenRefresh = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refreshToken = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_API_URL + "user-authentication/refresh-token", {withCredentials: true})
        console.log("REFRESHING . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . .")
        //console.log("THE RESPONSE", response)
        localStorage.setItem("userInfo", response.data.newToken)
        // localStorage.setItem("token", newToken.data.token);
        // httpService.setJwt(newToken.data.token);
        ////console.log("new TOKEN", newToken.data.token)
    };


    const tokenCheckInterval = setInterval(refreshToken, 1000 * 60); // Check every minute

    return () => {
      clearInterval(tokenCheckInterval); // Cleanup interval on component unmount
    };
  }, []);
};

export default useTokenRefresh;
