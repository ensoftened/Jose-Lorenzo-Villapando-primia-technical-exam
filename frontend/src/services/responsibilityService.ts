import authService from "@services/authService";
import Axios from "axios";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
const endpoint = `${process.env.REACT_APP_SERVER_API_URL}responsibility/`;

const currentUser = authService.getCurrentUserInfoFromLocalStorage();
const retrievedResponsibilities: any = authService.getResponsibilities();

export async function getAllResponsibilities() {
  ////////////////////////////////////////////////////////////////////////console.log  ("currentUser.role", currentUser.role)

  try {
    let responsibilityList = null;
    if (retrievedResponsibilities.includes("GET_ALL_RESPONSIBILITIES")) {
      responsibilityList = await Axios.get(
        `${endpoint}get-all-responsibilities`,
        { withCredentials: true }
      );
    }

    return responsibilityList;
  } catch (error) {
    ////////////////////////////////////////////////////////////////////////console.log  ("ERROR", error)
  }
}
