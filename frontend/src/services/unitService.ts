import authService from "./authService";
import Axios from "axios";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
const endpoint = `${process.env.REACT_APP_SERVER_API_URL}Unit/`;

const currentUser: any = authService.getCurrentUserInfoFromLocalStorage();
const retrievedResponsibilities: any = authService.getResponsibilities();
////////////console.log("retrievedResps", retrievedResponsibilities)

export async function checkIfUnitNameIsTaken(unitName: string) {
  ////////console.log("CHECKING")
  return await Axios.post(
    `${endpoint}check-if-unit-name-is-taken/`,
    { unitName },
    // { withCredentials: true }
  );
}

export async function getAllUnitsForSelect() {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  try {
    let units = await Axios.get(`${endpoint}get-all-units`, 
    // {withCredentials: true},
        )

    let modifiedUnits = units?.data?.list.map((unit: any) => {
      return {
        _id: unit._id,
        label: unit.unitName
      }
    })


    

    //////////////console.log  ("THE ROLES", units)
    return modifiedUnits;
  } catch (error) {
    //////////////////console.log  ("ERROR", error)
  }
}

export async function getPaginatedUnits(pageNumber: number) {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let units = null;

    units = await Axios.get(`${endpoint}get-paginated-units/${pageNumber}`, 
    // {withCredentials: true,}
    );

    ////////////console.log  ("THE ROLES", units)
    return units;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}

export async function searchUnits(
  searchData: string,
  dateFrom: string,
  dateTo: string,
  pageNumber: number
) {
  //console.log("IS NULL", dateTo == null);
  const df = dateFrom == null ? "" : dateFrom;
  const dt = dateTo == null ? "" : dateTo;
  //////////////////////////////////////////////////////////////////////////////console.log  ("SEARCH DATA", searchData)
  //////////////////////////////////////////////////////////////////////////////console.log  ("LINK", `${endPoint}search-documents?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`)
  try {
    //console.log("ANG unitss");
    let units = await Axios.get(
      `${endpoint}search-units?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`,
      // { withCredentials: true }
    );

    //console.log("ANG units", units);
    return units;
  } catch (error) {
    //console.log("ERROR", error);
  }
}
export async function searchUnitsForAutoComplete(
  searchData: string,
  dateFrom: string,
  dateTo: string,
  pageNumber: number
) {
  //console.log("IS NULL", dateTo == null);
  const df = dateFrom == null ? "" : dateFrom;
  const dt = dateTo == null ? "" : dateTo;
  //////////////////////////////////////////////////////////////////////////////console.log  ("SEARCH DATA", searchData)
  //////////////////////////////////////////////////////////////////////////////console.log  ("LINK", `${endPoint}search-documents?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`)
  try {
    //console.log("ANG unitss");
    let response: any = await Axios.get(
      `${endpoint}search-units-for-autocomplete?search=${searchData}`,
      // { withCredentials: true }
    );

    //console.log("RESPONSE", response)

    let modifiedUnits = response?.data?.list.map((item: any) => {
      return {
        _id: item._id,
        label: item.unitName
      }
    });

    console.log("ANG units", modifiedUnits);
    return modifiedUnits;
  } catch (error) {
    //console.log("ERROR", error);
  }
}

export async function createNewUnit(data: any) {
  try {

      //////////////////////////////////////////////////////////////////////////////console.log  ("TRULALOO", data)
      return await Axios.post(`${endpoint}create-new-unit/`, data, 
      // {withCredentials: true,}
      );
    
  } catch (error) {
    //////////////////////////////////////////////////////////////////////////////console.log  ("THE ERROR", error)
  }
}

export async function editUnit(id: string, data: any) {
  try {
      //////////////////////////////////////////////////////////////////////////////console.log  ("TRULALOO", data)
      return await Axios.put(`${endpoint}edit-unit/${id}`, data, 
      // {withCredentials: true,}
      );
  } catch (error) {
    //////////////////////////////////////////////////////////////////////////////console.log  ("THE ERROR", error)
  }
}
