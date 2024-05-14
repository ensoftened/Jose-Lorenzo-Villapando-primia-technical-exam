// useTokenExpirationCheck.js
import { useEffect } from "react";
import authService, { getToken, logout } from "@services/authService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { RootState } from "@state/store";
import { useSelector } from "react-redux";

const useTokenExpirationCheck = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenExpiration = () => {
      ////console.log("CHECKING");
      const token = getToken();

      ////console.log("TOKEN", token);

      if (token) {
        const decodedToken: any =
          authService.getCurrentUserInfoFromLocalStorage();

        ////console.log("DECODED", decodedToken);

        if (decodedToken && decodedToken.refreshTokenExp * 1000 < Date.now()) {
          // Token has expired, clear token and log out
          logout();
          //console.log("LOGOUT!!!!!!");
          navigate("/login");

          // You may also redirect to a login page or perform other logout actions
          ////console.log("Token expired. Logging out.");
        }
      }
    };

    checkTokenExpiration();

    const tokenCheckInterval = setInterval(checkTokenExpiration, 60000); // Check every hour

    return () => {
      clearInterval(tokenCheckInterval); // Cleanup interval on component unmount
    };
  }, []);
};

export default useTokenExpirationCheck;
