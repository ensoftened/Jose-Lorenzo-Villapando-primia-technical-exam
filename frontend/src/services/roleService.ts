import authService from "./authService";
import Axios from "axios";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
const endpoint = `${process.env.REACT_APP_SERVER_API_URL}Role/`;

const currentUser : any = authService.getCurrentUserInfoFromLocalStorage();
const retrievedResponsibilities : any = authService.getResponsibilities();
////////////console.log("retrievedResps", retrievedResponsibilities)

export async function checkIfRoleNameIsTaken(roleName: string) {
  ////////console.log("CHECKING")
   return await Axios.post(`${endpoint}check-if-role-name-is-taken/`, { roleName }, {withCredentials: true});
}

export async function getAllRoles() {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  try {
    let roles = null;
    if (retrievedResponsibilities.includes("GET_ROLES")) {
      roles = await Axios.get(`${endpoint}get-all-roles`, {withCredentials: true});
    } else if (
      retrievedResponsibilities.includes("GET_SUPER_ADMIN_AND_ADMIN_ROLES")
    ) {
      roles = await Axios.get(`${endpoint}get-super-admin-and-admin-roles`, {withCredentials: true});
    }



    //////////////console.log  ("THE ROLES", roles)
    return roles;
  } catch (error) {
    //////////////////console.log  ("ERROR", error)
  }
}

export async function getPaginatedRoles(pageNumber: number) {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let roles = null;
    if (retrievedResponsibilities.includes("GET_ROLES")) {
      roles = await Axios.get(`${endpoint}get-paginated-roles/${pageNumber}`, {withCredentials: true});
    } else if (retrievedResponsibilities.includes("GET_SUPER_ADMIN_AND_ADMIN_ROLES")) {
      roles = await Axios.get(`${endpoint}get-super-admin-and-admin-roles`, {withCredentials: true});
    }

    ////////////console.log  ("THE ROLES", roles)
    return roles;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}

export async function searchRoles(searchData: string, dateFrom: string, dateTo:string, pageNumber: number) {
    const { responsibilities } = currentUser.role
    //////////////////////////////////////////////////////////////////////////////console.log  ("IS NULL", dt==null)
    const df = dateFrom==null ? "" : dateFrom
    const dt = dateTo==null ? "" : dateTo
    //////////////////////////////////////////////////////////////////////////////console.log  ("SEARCH DATA", searchData)
    //////////////////////////////////////////////////////////////////////////////console.log  ("LINK", `${endPoint}search-documents?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`)
    try {
        let roles = await Axios.get(`${endpoint}search-roles?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`, {withCredentials: true})


        ////////////console.log("ANG roles", roles)
        return roles
    } catch(error) {
        ////////////////////////////////////////////////////////////////////////////////////////////console.log  ("ERROR", error)
    }
}

export async function createNewRole(data: any) {
  try {
    if (retrievedResponsibilities.includes("CREATE_ROLES")) {
      //////////////////////////////////////////////////////////////////////////////console.log  ("TRULALOO", data)
      return await Axios.post(`${endpoint}create-new-role/`, data, {withCredentials: true});
    }
  } catch (error) {
    //////////////////////////////////////////////////////////////////////////////console.log  ("THE ERROR", error)
  }
}

export async function editRole(id: string, data : any) {
  try {
    if (retrievedResponsibilities.includes("EDIT_ROLE")) {
      //////////////////////////////////////////////////////////////////////////////console.log  ("TRULALOO", data)
      return await Axios.put(`${endpoint}edit-role/${id}`, data, {withCredentials: true});
    }
  } catch (error) {
    //////////////////////////////////////////////////////////////////////////////console.log  ("THE ERROR", error)
  }
}
