import Axios from "axios";
import authService from "./authService";
import { showToast } from "@utils/showToast";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
var endpoint: string = `${process.env.REACT_APP_SERVER_API_URL}user/`;
const currentUser: any = authService.getCurrentUserInfoFromLocalStorage();
const retrievedResponsibilities: any = authService.getResponsibilities();

export async function checkIfUsernameIsTaken(username: string) {
  return await Axios.post(
    `${endpoint}check-if-username-is-taken/`,
    {
      username,
    },
    { withCredentials: true }
  );
}

export async function getSingleUser(username: string) {
  try {
    const singleUser = await Axios.get(
      `${endpoint}get-single-user-by-username/${username}/`, 
      // {withCredentials: true}
    );
    return singleUser;
  } catch (error) {
    ////////console.log("ERROR", error);
  }
}
export async function createNewUser(data: any) {
  //////////////console.log  ("DATA ", data)

  try {
    const {
      userPhoto,
      firstName,
      middleName,
      lastName,
      suffix,
      region,
      province,
      municipality,
      barangay,
      district,
      emailAddress,
      username,
      password,
      role,
      accountEnabled,
    } = data;

    let fd: any = new FormData();

    fd.append("firstName", firstName);
    fd.append("middleName", middleName);
    fd.append("lastName", lastName);
    fd.append("suffix", suffix);

    fd.append("region", JSON.stringify(region));
    fd.append("province", JSON.stringify(province));
    fd.append("municipality", JSON.stringify(municipality));
    fd.append("barangay", JSON.stringify(barangay));
    fd.append("district", JSON.stringify(district));

    fd.append("emailAddress", emailAddress);
    fd.append("username", username);
    fd.append("password", password);
    fd.append("role", JSON.stringify(role));
    fd.append("accountEnabled", accountEnabled);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("FORM DATA", fd)

    if (data.userPhoto instanceof File)
      fd.append("userPhoto", userPhoto, userPhoto.name);

    for (let [key, value] of fd.entries()) {
      //////////////console.log  (key, value);
    }

    if (retrievedResponsibilities.includes("CREATE_USERS")) {
      ////////////////////////////////////console.log("AUTHORIZED", fd)

      return await Axios.post(`${endpoint}create-new-user/`, fd,         
      // { withCredentials: true }
      );
    }
  } catch (error: any) {
    //////////console.log("ERROR TAYO RITO", error)
    showToast(error.message, "error");
  }
}

export async function getPaginatedUsers(pageNumber: number) {
  ////////////////////////////////////////////////////////////////////////////////console.log  ("RESP", responsibilities)
  try {
    let users = null;
    if (retrievedResponsibilities.includes("GET_USERS")) {
      users = await Axios.get(`${endpoint}get-paginated-users/${pageNumber}`, 
      // {withCredentials: true,}
      );
    } else if (
      retrievedResponsibilities.includes("GET_USERS_EXCEPT_SYSTEM_ADMIN_USERS")
    ) {
      users = await Axios.get(
        `${endpoint}get-paginated-users-except-system-admin-users/${pageNumber}`,
        // { withCredentials: true }
      );
    }

    let modifiedUserList = users?.data.list.map((user: any) => {
      user["role"] = {
        _id: user.role._id,
        label: user.role.roleName,
      };

      return user;
    });

    

    console.log("ANG MGA USERS", users)

    return users;
  } catch (error) {
    ////////////console.log  ("ERROR", error)
  }
}

export async function editUser(_id: string, data: any) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("DATA ", data)

  const {
    userPhoto,
    firstName,
    middleName,
    lastName,
    suffix,
    region,
    province,
    municipality,
    barangay,
    district,
    streetAddress,
    emailAddress,
    username,
    password,
    role,
    accountEnabled,
  } = data;

  let fd = new FormData();

  fd.append("firstName", firstName);
  fd.append("middleName", middleName);
  fd.append("lastName", lastName);
  fd.append("suffix", suffix);

  fd.append("region", JSON.stringify(region));
  fd.append("province", JSON.stringify(province));
  fd.append("municipality", JSON.stringify(municipality));
  fd.append("barangay", JSON.stringify(barangay));
  fd.append("district", JSON.stringify(district));
  fd.append("streetAddress", streetAddress);

  fd.append("emailAddress", emailAddress);
  fd.append("username", username);
  fd.append("password", password);
  fd.append("role", JSON.stringify(role));
  fd.append("accountEnabled", accountEnabled);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("FORM DATA", fd)

  if (data.userPhoto instanceof File)
    fd.append("userPhoto", userPhoto, userPhoto.name);

  return await Axios.put(`${endpoint}edit-user/${_id}`, fd, 
  // {withCredentials: true,}
  );
  /*   
    } else {
        return await Axios.post(endpoint, data)
    }*/
}

export async function searchUsers(
  searchData: string,
  dateFrom: string,
  dateTo: string,
  pageNumber: number
) {
  const { responsibilities } = currentUser.role;
  ////////////////////////////////////////////////////////////////////////////console.log  ("IS NULL", dt==null)
  const df = dateFrom == null ? "" : dateFrom;
  const dt = dateTo == null ? "" : dateTo;
  ////////////////////////////////////////////////////////////////////////////console.log  ("SEARCH DATA", searchData)
  ////////////////////////////////////////////////////////////////////////////console.log  ("LINK", `${endpoint}search-documents?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`)
  try {
    let users = await Axios.get(
      `${endpoint}search-users?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`,
      // { withCredentials: true }
    );

    let modifiedUserList = users.data.list.map((user: any) => {
      user["role"] = {
        _id: user.role._id,
        label: user.role.roleName,
      };

      return user;
    });

    ////////////console.log("ANG USERS", users)
    return users;
  } catch (error) {
    //////////////////////////////////////////////////////////////////////////////////////////console.log  ("ERROR", error)
  }
}
