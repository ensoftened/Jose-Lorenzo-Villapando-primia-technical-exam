import authService from "./authService";
import Axios from "axios";

//const endpoint = `${process.env.LOCATION_API_URL}Region/`
const endpoint = `${process.env.REACT_APP_SERVER_API_URL}Position/`;

const currentUser: any = authService.getCurrentUserInfoFromLocalStorage();
const retrievedResponsibilities: any = authService.getResponsibilities();
////////////console.log("retrievedResps", retrievedResponsibilities)

export async function checkIfIngredientNameIsTaken(ingredientName: string) {
  ////////console.log("CHECKING")
  return await Axios.post(
    `${endpoint}check-if-ingredient-name-is-taken/`,
    { ingredientName }
    // { withCredentials: true }
  );
}

export async function getAllIngredients() {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  try {
    let ingredients = null;
    if (retrievedResponsibilities.includes("GET_ROLES")) {
      ingredients = await Axios.get(
        `${endpoint}get-all-ingredients`
        // {
        //   withCredentials: true,
        // }
      );
    } else if (
      retrievedResponsibilities.includes("GET_SUPER_ADMIN_AND_ADMIN_ROLES")
    ) {
      ingredients = await Axios.get(
        `${endpoint}get-super-admin-and-admin-ingredients`
        // { withCredentials: true }
      );
    }

    //////////////console.log  ("THE ROLES", ingredients)
    return ingredients;
  } catch (error) {
    //////////////////console.log  ("ERROR", error)
  }
}

export async function fetchAllPositions() {
  //////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  ////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let positions = await Axios.get(`${endpoint}`);

    ////////////console.log  ("THE ROLES", ingredients)
    return positions;
  } catch (error) {
    ////////////////////////////////////////////console.log  ("ERROR", error)
  }
}

export async function searchIngredients(
  searchData: string,
  dateFrom: string,
  dateTo: string,
  pageNumber: number
) {
  //////////////////////////////////////////////////////////////////////////////console.log  ("IS NULL", dt==null)
  const df = dateFrom == null ? "" : dateFrom;
  const dt = dateTo == null ? "" : dateTo;
  //////////////////////////////////////////////////////////////////////////////console.log  ("SEARCH DATA", searchData)
  //////////////////////////////////////////////////////////////////////////////console.log  ("LINK", `${endPoint}search-documents?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`)

  try {
    let ingredients = await Axios.get(
      `${endpoint}search-ingredients?search=${searchData}&dateFrom=${df}&dateTo=${dt}&page=${pageNumber}`
      // { withCredentials: true }
    );

    ////////////console.log("ANG ingredients", ingredients)
    return ingredients;
  } catch (error) {
    ////////////////////////////////////////////////////////////////////////////////////////////console.log  ("ERROR", error)
  }
}

export async function getSelectedIngredients(selectedIngredients: any[]) {
  ////////////////////////////////////console.log("RETRIEVED RESPONSIBILITIES", retrievedResponsibilities)

  //////////////////////////////////////////////////////console.log("pageNumber", pageNumber)
  try {
    let ingredients = null;

    ingredients = await Axios.post(`${endpoint}get-selected-ingredients/`, {
      selectedIngredients,
    });

    console.log("THE INGREDIENTS", ingredients);
    return ingredients;
  } catch (error) {
    //////////////////////////////////////////////////////console.log  ("ERROR", error)
  }
}

export async function searchIngredientsForAutoComplete(
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
    //console.log("ANG ingredientss");
    let response: any = await Axios.get(
      `${endpoint}search-ingredients-for-autocomplete?search=${searchData}`
      // { withCredentials: true }
    );

    //console.log("RESPONSE", response)

    let modifiedIngredients = response?.data?.list.map((item: any) => {
      return {
        _id: item._id,
        label: item.ingredientName,
      };
    });

    console.log("ANG ingredients", modifiedIngredients);
    return modifiedIngredients;
  } catch (error) {
    //console.log("ERROR", error);
  }
}

export async function createNewPosition(data: any) {
  try {
    console.log("TRULALOO", data);
    return await Axios.post(`${endpoint}`, data);
  } catch (error) {
    console.log("THE ERROR", error);
  }
}

export async function editIngredient(id: string, data: any) {
  try {
    console.log("TRULALOO", data);
    return await Axios.put(
      `${endpoint}edit-ingredient/${id}`,
      data
      // {withCredentials: true,}
    );
  } catch (error) {
    console.log("THE ERROR", error);
  }
}
