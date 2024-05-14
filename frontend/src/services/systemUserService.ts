import authService from "./authService";
import Axios from "axios";

const endpoint = `${process.env.REACT_APP_SERVER_API_URL}System-User/`;


export async function fetchAllSystemUsers() {

  try {
    let systemUsers = await Axios.get(`${endpoint}`);

    return systemUsers;
  } catch (error) {
    console.log  ("ERROR", error)
  }
}
